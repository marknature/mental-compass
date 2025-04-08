"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  RotateCcw,
  Send,
  Bug,
  CheckCircle,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  statusCode?: number;
}

export default function ErrorPage({
  error,
  reset,
  statusCode,
}: ErrorPageProps) {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportData, setReportData] = useState({
    description: "",
    email: "",
  });

  const errorMessage = error?.message || "Something went wrong";
  const errorCode = statusCode || "Unknown";

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would send this data to your error reporting service
    console.log("Error report:", {
      errorMessage,
      errorCode: error?.digest || errorCode,
      userDescription: reportData.description,
      userEmail: reportData.email,
      timestamp: new Date().toISOString(),
    });

    // Show success state
    setIsSubmitted(true);

    // Close dialog after a delay
    setTimeout(() => {
      setIsReportDialogOpen(false);
      setIsSubmitted(false);
      setReportData({ description: "", email: "" });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-5 w-5 " />
          </div>
          <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-1">
            We encountered an unexpected error
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          <Button
            variant="default"
            className="w-full bg-primary h-14 "
            size={"lg"}
            onClick={() => setIsReportDialogOpen(true)}
          >
            Report This Issue
          </Button>

          {reset && (
            <Button
              variant="secondary"
              className="rounded-md flex items-center justify-center h-14"
              size={"lg"}
              onClick={reset}
            >
              Try Again
            </Button>
          )}
        </div>
      </motion.div>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-sm rounded-md">
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              Help us improve by reporting what went wrong.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-medium mb-1">Thank You!</h3>
              <p className="text-center text-muted-foreground">
                Your report has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What happened?</label>
                  <Textarea
                    placeholder="Please describe what you were doing when the error occurred..."
                    value={reportData.description}
                    onChange={(e) =>
                      setReportData({
                        ...reportData,
                        description: e.target.value,
                      })
                    }
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Your email (optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email if you'd like us to follow up"
                    value={reportData.email}
                    onChange={(e) =>
                      setReportData({ ...reportData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <DialogFooter className="grid grid-cols-2  gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReportDialogOpen(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
