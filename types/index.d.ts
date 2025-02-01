import { User, Profile, Mix } from "@prisma/client";
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

export interface ExtendedProfile extends Profile {
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

export interface ExtendedUser extends User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: "USER" | "DJ";
  createdAt: Date;
  updatedAt: Date;
  mixes: Mix[];
}

export interface ExtendedMix extends Mix {
  id: number;
  title: string;
  description: string;
  coverImage: string | null;
  audioUrl: string;
  duration: string;
  plays: string;
  likes: number;
  comments: number;
  dj: {
    id: string;
    name: string;
    image: string | null;
    verified: boolean;
  };
  tags: string[];
}


export { Mix };
