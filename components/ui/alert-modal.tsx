'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const icons = {
  success: (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="rounded-full bg-green-100 dark:bg-green-900/20 p-2"
    >
      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
    </motion.div>
  ),
  error: (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="rounded-full bg-red-100 dark:bg-red-900/20 p-2"
    >
      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
    </motion.div>
  ),
  info: (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2"
    >
      <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </motion.div>
  ),
};

const modalVariants = {
  success: {
    overlay: 'bg-green-900/10 dark:bg-green-100/10',
    button: 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white',
    ring: 'ring-green-500/20',
  },
  error: {
    overlay: 'bg-red-900/10 dark:bg-red-100/10',
    button: 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white',
    ring: 'ring-red-500/20',
  },
  info: {
    overlay: 'bg-blue-900/10 dark:bg-blue-100/10',
    button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white',
    ring: 'ring-blue-500/20',
  },
};

export function AlertModal({
  isOpen,
  onClose,
  title,
  description,
  type = 'info',
  primaryActionLabel = 'OK',
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: AlertModalProps) {
  const handlePrimaryAction = () => {
    onPrimaryAction?.();
    onClose();
  };

  const handleSecondaryAction = () => {
    onSecondaryAction?.();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className={cn(
        "bg-background/95 dark:bg-background/95 backdrop-blur-sm",
        "border border-border/50",
        "shadow-lg dark:shadow-2xl",
        "ring-1",
        modalVariants[type].ring,
        "p-6",
        "max-w-md mx-auto"
      )}>
        <AlertDialogHeader>
          <div className="flex items-center gap-4">
            {icons[type]}
            <div className="space-y-1">
              <AlertDialogTitle className="text-xl font-semibold tracking-tight">
                {title}
              </AlertDialogTitle>
              {description && (
                <AlertDialogDescription className="text-base text-muted-foreground">
                  {description}
                </AlertDialogDescription>
              )}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          {secondaryActionLabel && (
            <AlertDialogCancel
              onClick={handleSecondaryAction}
              className="bg-background hover:bg-muted text-foreground border-border/50"
            >
              {secondaryActionLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handlePrimaryAction}
            className={cn(
              modalVariants[type].button,
              "transition-all duration-200"
            )}
          >
            {primaryActionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 