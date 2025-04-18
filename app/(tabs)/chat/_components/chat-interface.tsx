"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Compass } from "lucide-react";
import { ChatBubble } from "./chat-bubble";
import { ChatSuggestion } from "./chat-suggestion";
import type { ChatMessage } from "@/types/chat";
import { getInitialMessage } from "@/lib/chatbot-service";
import { v4 as uuidv4 } from "uuid";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial message
  useEffect(() => {
    const loadInitialMessage = async () => {
      const initialMessage = await getInitialMessage();
      setMessages([initialMessage]);
      setSuggestions([
        "I'm feeling anxious about exams",
        "How can I improve my sleep?",
        "I need help with stress",
      ]);
    };

    loadInitialMessage();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText: string = inputValue) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: messageText,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setSuggestions([]);

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Add assistant message
      setMessages((prev) => [...prev, data.message]);

      // Set new suggestions
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto py-2 space-y-4">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-bounce h-2 w-2 bg-primary rounded-full"></div>
            <div
              className="animate-bounce h-2 w-2 bg-primary rounded-full"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="animate-bounce h-2 w-2 bg-primary rounded-full"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {suggestions.map((suggestion, index) => (
            <ChatSuggestion
              key={index}
              text={suggestion}
              onClick={handleSendMessage}
            />
          ))}
        </div>
      )}

      {/* Input area */}

      <div className="border-t fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-40 bg-background">
        <div className="flex items-center space-x-2 p-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
