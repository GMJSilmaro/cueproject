import { User, Profile, Mix, Like, Comment } from "@prisma/client";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

export interface ExtendedProfile {
  user: ExtendedUser;
  followers: string[];
  following: string[];
  username: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  genre: string[];
  location?: string;
  equipment?: string;
  experience?: string;
  socialLinks?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  mixes: Mix[];
}

export enum Role {
  ADMIN = 'ADMIN',
  DJ = 'DJ',
  USER = 'USER'
}

export interface ExtendedUser extends User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  mixes: Mix[];
  verified: boolean;
  coverImage: string | null;
  followers: string[];
  following: string[];
  bio: string | null;
  genre: string[];
  location: string | null;
  equipment: string | null;
  experience: string | null;
  socialLinks: Record<string, string> | null;
  mixes: Mix[];
  role: Role;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
  replies?: Comment[];
  likes?: string[];
  parentId?: string;
}

export interface ExtendedMix extends Mix {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  audioUrl: string;
  duration: number;
  plays: number;
  likes: Like[];
  comments: Comment[];
  user: ExtendedUser;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  formattedDuration: string;
  _count: {
    likes: number;
    comments: number;
  };
}

export interface FormattedMix {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  coverUrl: string | null;
  genre: string[];
  duration: number;
  plays: number;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  comments: Comment[];
  dj: {
    id: string;
    name: string;
    image: string | null;
    verified: boolean;
    coverImage: string | null;
  };
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  formattedDuration: string;
}

export { Mix };
