'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, X, Music, TrendingUp } from 'lucide-react';

const genres = [
  "House",
  "Techno",
  "Tech House",
  "Deep House",
  "Progressive",
  "Melodic Techno",
  "Minimal",
  "Trance",
  "Drum & Bass",
  "Dubstep",
];

const trendingTags = [
  "#viral",
  "#trending",
  "#newmusic",
  "#remix",
  "#edm",
  "#dj",
  "#producer",
  "#musicproducer"
];

interface UploadMixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess?: () => void;
}

export function UploadMixDialog({ open, onOpenChange, onUploadSuccess }: UploadMixDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
  });

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setAudioFile(file);
      
      // Get audio duration
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(file);
      audio.src = objectUrl;
      
      audio.addEventListener('loadedmetadata', () => {
        const duration = Math.round(audio.duration);
        setAudioDuration(duration); // Store as seconds
        URL.revokeObjectURL(objectUrl);
      });
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.currentTarget;
      const tag = input.value.trim().replace(/^#/, '');
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, `#${tag}`]
        }));
        input.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addTrendingTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile) {
      toast.error('Please select an audio file');
      return;
    }

    if (!formData.title) {
      toast.error('Please enter a title');
      return;
    }

    if (selectedGenres.length === 0) {
      toast.error('Please select at least one genre');
      return;
    }

    setIsSubmitting(true);
    try {
      // Show upload starting toast
      toast.loading('Uploading files...');

      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('audioFile', audioFile);
      if (coverImage) {
        uploadFormData.append('coverImage', coverImage);
      }

      // Upload files
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        throw new Error(error || 'Failed to upload files');
      }

      const { audioUrl, coverImageUrl } = await uploadResponse.json();
      
      // Show files uploaded toast
      toast.success('Files uploaded successfully');
      toast.loading('Creating mix...');

      // Create mix
      const response = await fetch('/api/mixes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          audioUrl,
          coverImage: coverImageUrl,
          genre: selectedGenres,
          tags: formData.tags,
          duration: audioDuration,
          isPublic: true,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to create mix');
      }

      toast.dismiss();
      toast.success('Mix uploaded successfully!');
      onOpenChange(false);
      
      // Reset form
      setFormData({ title: '', description: '', tags: [] });
      setCoverImage(null);
      setAudioFile(null);
      setSelectedGenres([]);
      
      // Call the success callback to refresh data
      onUploadSuccess?.();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to upload mix');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
          <DialogTitle>Upload New Mix</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pb-6">
          {/* Cover Image Upload */}
          <div>
            <Label>Cover Image</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative">
              {coverImage ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setCoverImage(null)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="cover-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary/80"
                    >
                      <span>Upload a cover image</span>
                      <input
                        id="cover-upload"
                        name="cover-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Summer Vibes Mix 2024"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Tell us about your mix..."
              rows={3}
            />
          </div>

          {/* Genre Tags */}
          <div>
            <Label>Genre Tags</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  type="button"
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  onClick={() => toggleGenre(genre)}
                  className="h-8"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Tags */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="tags">Custom Tags</Label>
              <div className="space-y-2">
                <Input
                  id="tags"
                  placeholder="Type a tag and press Enter or comma (e.g., summer)"
                  onKeyDown={handleTagInput}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trending Hashtags */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Trending Hashtags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTrendingTag(tag)}
                    className={`h-7 ${formData.tags.includes(tag) ? 'bg-gray-100' : ''}`}
                    disabled={formData.tags.includes(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Audio File Upload */}
          <div>
            <Label>Audio File</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {audioFile ? (
                <div className="text-center">
                  <Music className="mx-auto h-12 w-12 text-primary" />
                  <p className="mt-2 text-sm font-medium">{audioFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setAudioFile(null)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="audio-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary/80"
                    >
                      <span>Upload an audio file</span>
                      <input
                        id="audio-upload"
                        name="audio-upload"
                        type="file"
                        className="sr-only"
                        accept="audio/*"
                        onChange={handleAudioFileChange}
                        required
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">MP3, WAV up to 500MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Uploading...</span>
                  <Upload className="h-4 w-4 animate-bounce" />
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Mix
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 