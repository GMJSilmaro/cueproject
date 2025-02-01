import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Radio, Users } from 'lucide-react';

interface DJCardProps {
  dj: {
    id: string;
    name: string;
    image: string | null;
    role: 'DJ' | 'USER';
    profile?: {
      followers: string[];
      genre: string[];
    };
  };
}

export function DJCard({ dj }: DJCardProps) {
  return (
    <Link href={`/dj/${dj.id}`}>
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
        <div className="flex flex-col items-center text-center">
          {/* DJ Avatar */}
          <div className="relative w-20 h-20 mb-4">
            {dj.image ? (
              <Image
                src={dj.image}
                alt={dj.name}
                fill
                className="rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/avatars/default-avatar.jpg';
                }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                <Radio className="w-8 h-8 text-gray-400" />
              </div>
            )}
            {dj.role === 'DJ' && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                <Radio className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* DJ Info */}
          <h3 className="font-semibold text-gray-900 mb-1">{dj.name}</h3>
          
          {/* Followers Count */}
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <Users className="w-4 h-4" />
            <span>{dj.profile?.followers?.length || 0} followers</span>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {dj.profile?.genre?.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
              >
                {genre}
              </span>
            ))}
            {(dj.profile?.genre?.length || 0) > 2 && (
              <span className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600">
                +{(dj.profile?.genre?.length || 0) - 2}
              </span>
            )}
          </div>

          {/* View Profile Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600"
          >
            View Profile
          </Button>
        </div>
      </div>
    </Link>
  );
} 