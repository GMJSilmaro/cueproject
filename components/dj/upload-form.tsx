'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const uploadSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  genre: z.string().min(2, 'Genre is required'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  isPublic: z.boolean().default(true),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

export function UploadForm() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  });

  const onAudioDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setError(null);
    } else {
      setError('Please upload a valid audio file');
    }
  }, []);

  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
      setError(null);
    } else {
      setError('Please upload a valid image file');
    }
  }, []);

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      'audio/*': ['.mp3', '.wav']
    },
    maxFiles: 1,
  });

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
  });

  const onSubmit = async (data: UploadFormValues) => {
    try {
      if (!audioFile) {
        setError('Please upload an audio file');
        return;
      }

      setIsLoading(true);
      setError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('audio', audioFile);
      if (coverImage) formData.append('cover', coverImage);
      formData.append('data', JSON.stringify(data));

      const response = await fetch('/api/mixes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload mix');
      }

      // Reset form and state
      setAudioFile(null);
      setCoverImage(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload mix');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Mix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio Upload */}
          <div
            {...getAudioRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-red-500 transition-colors"
          >
            <input {...getAudioInputProps()} />
            <div className="flex flex-col items-center space-y-2">
              {audioFile ? (
                <div className="flex items-center space-x-2">
                  <Music className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">{audioFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAudioFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Drag and drop your audio file here or click to browse
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div
            {...getImageRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-red-500 transition-colors"
          >
            <input {...getImageInputProps()} />
            <div className="flex flex-col items-center space-y-2">
              {coverImage ? (
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">{coverImage.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCoverImage(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Add a cover image (optional)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Mix Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                {...register('title')}
                error={!!errors.title}
                disabled={isLoading}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="text-sm font-medium text-gray-700">
                Genre
              </label>
              <Input
                {...register('genre')}
                error={!!errors.genre}
                disabled={isLoading}
              />
              {errors.genre && (
                <p className="text-sm text-red-500">{errors.genre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                rows={4}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="ml-auto">
            Upload Mix
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
} 