"use client";

import { Button } from "@/components/ui/button";

interface ChatSuggestionProps {
  text: string;
  onClick: (text: string) => void;
}

export function ChatSuggestion({ text, onClick }: ChatSuggestionProps) {
  return (
    <Button
      onClick={() => onClick(text)}
      className="text-xs whitespace-nowrap px-3 py-1.5  bg-primary text-white transition-colors"
    >
      {text}
    </Button>
  );
}
