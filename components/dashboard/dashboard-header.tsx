'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadMixDialog } from "@/components/mix/upload-mix-dialog";
import { Upload } from "lucide-react";
import { useDashboard } from "./dashboard-provider";

export function DashboardHeader() {
  const { session, refreshData } = useDashboard();
  const [open, setOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}
        </p>
      </div>
      <Button onClick={() => setOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Mix
      </Button>
      <UploadMixDialog
        open={open}
        onOpenChange={setOpen}
        onUploadSuccess={refreshData}
      />
    </div>
  );
}