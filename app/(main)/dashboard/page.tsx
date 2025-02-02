import { Metadata } from "next";
import { DashboardFeed } from "@/components/dashboard/feed";

export const metadata: Metadata = {
  title: "Feed | CueProject",
  description: "Your personalized feed of mixes, events, and DJ community updates.",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Your Feed</h1>
      <DashboardFeed />
    </div>
  );
}