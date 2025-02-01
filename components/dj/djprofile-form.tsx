"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  genre: z.string().min(2, 'Genre must be at least 2 characters').optional(),
  location: z.string().min(2, 'Location must be at least 2 characters').optional(),
  equipment: z.string().max(500, 'Equipment details must be less than 500 characters').optional(),
  experience: z.string().max(1000, 'Experience details must be less than 1000 characters').optional(),
  socialLinks: z.object({
    instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
    soundcloud: z.string().url('Invalid SoundCloud URL').optional().or(z.literal('')),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface DJProfileFormProps {
  initialData?: Partial<ProfileFormValues>;
}

export function DJProfileForm({ initialData }: DJProfileFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSaved(false);

      const response = await fetch('/api/dj/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      toast.success("Profile updated successfully");
      router.refresh();
      setIsSaved(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                {...register('username')}
                error={!!errors.username}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                {...register('bio')}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                rows={4}
                disabled={isLoading}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <Input
                  {...register('location')}
                  error={!!errors.location}
                  disabled={isLoading}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="equipment" className="text-sm font-medium text-gray-700">
                Equipment
              </label>
              <textarea
                {...register('equipment')}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                rows={3}
                disabled={isLoading}
              />
              {errors.equipment && (
                <p className="text-sm text-red-500">{errors.equipment.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Experience
              </label>
              <textarea
                {...register('experience')}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                rows={4}
                disabled={isLoading}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                Instagram
              </label>
              <Input
                {...register('socialLinks.instagram')}
                error={!!errors.socialLinks?.instagram}
                disabled={isLoading}
                placeholder="https://instagram.com/yourusername"
              />
              {errors.socialLinks?.instagram && (
                <p className="text-sm text-red-500">{errors.socialLinks.instagram.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="twitter" className="text-sm font-medium text-gray-700">
                Twitter
              </label>
              <Input
                {...register('socialLinks.twitter')}
                error={!!errors.socialLinks?.twitter}
                disabled={isLoading}
                placeholder="https://twitter.com/yourusername"
              />
              {errors.socialLinks?.twitter && (
                <p className="text-sm text-red-500">{errors.socialLinks.twitter.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="soundcloud" className="text-sm font-medium text-gray-700">
                SoundCloud
              </label>
              <Input
                {...register('socialLinks.soundcloud')}
                error={!!errors.socialLinks?.soundcloud}
                disabled={isLoading}
                placeholder="https://soundcloud.com/yourusername"
              />
              {errors.socialLinks?.soundcloud && (
                <p className="text-sm text-red-500">{errors.socialLinks.soundcloud.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            {isSaved && (
              <div className="mb-4 rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-500">Profile updated successfully!</p>
              </div>
            )}
            <Button type="submit" disabled={isLoading} className="ml-auto">
              Save Changes
            </Button>
          </CardFooter>

        </Card>
      </div>
    </form>
  );
}