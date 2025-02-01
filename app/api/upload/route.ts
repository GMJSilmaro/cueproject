import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Session } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const coverImage = formData.get('coverImage') as File | null;
    const audioFile = formData.get('audioFile') as File;

    if (!audioFile) {
      return new NextResponse('Audio file is required', { status: 400 });
    }

    // Create unique filenames with sanitized names
    const timestamp = Date.now();
    const sanitizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const audioFileName = `${session.user.id}-${timestamp}-${sanitizeFileName(audioFile.name)}`;
    let coverImageFileName = null;

    if (coverImage) {
      coverImageFileName = `${session.user.id}-${timestamp}-${sanitizeFileName(coverImage.name)}`;
    }

    // Ensure upload directories exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const coverDir = join(uploadDir, 'covers');
    const audioDir = join(uploadDir, 'audio');
    
    try {
      await mkdir(uploadDir, { recursive: true });
      await mkdir(coverDir, { recursive: true });
      await mkdir(audioDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directories:', error);
      return new NextResponse('Failed to create upload directories', { status: 500 });
    }

    // Save audio file
    try {
      await writeFile(join(audioDir, audioFileName), Buffer.from(await audioFile.arrayBuffer()));
    } catch (error) {
      console.error('Failed to save audio file:', error);
      return new NextResponse('Failed to save audio file', { status: 500 });
    }

    let coverImagePath = null;
    if (coverImage && coverImageFileName) {
      try {
        await writeFile(join(coverDir, coverImageFileName), Buffer.from(await coverImage.arrayBuffer()));
        coverImagePath = `/uploads/covers/${coverImageFileName}`;
      } catch (error) {
        console.error('Failed to save cover image:', error);
        // Don't fail the whole upload if just the cover fails
        coverImagePath = '/covers/default-mix.jpg';
      }
    }

    return NextResponse.json({
      success: true,
      audioUrl: `/uploads/audio/${audioFileName}`,
      coverImage: coverImagePath || '/covers/default-mix.jpg'
    });
  } catch (error) {
    console.error('Upload failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 