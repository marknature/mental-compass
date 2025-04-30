import { type ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CalendarIcon, BookMarked } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const router = useRouter();
  const isUser = message.role === "user";

  // Function to navigate to event page
  const navigateToEvent = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  // Function to navigate to article page
  const navigateToArticle = (articleId: string) => {
    router.push(`/resources/articles/${articleId}`);
  };

  // Process message to detect resource recommendations

  const processMessageContent = (content: string) => {
    // Define the regex to capture structured JSON blocks
    const jsonBlockRegex = /```json\s*([\s\S]+?)```/;

    // Search for a JSON block in the message
    const match = content.match(jsonBlockRegex);

    // If no structured JSON block is found, just return the content
    if (!match) {
      return <p className="whitespace-pre-wrap text-sm">{content}</p>;
    }

    // Parse the JSON block
    let resourceData;
    try {
      resourceData = JSON.parse(match[1]);
    } catch (error) {
      console.error("Error parsing JSON block:", error);
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    // Now resourceData should contain the structured information
    const { type, title, reason, id } = resourceData;

    // Elements for the message content
    const elements = [];

    // Add regular message content before the resource
    const textBeforeResource = content.substring(0, match.index);
    elements.push(
      <span key={`text-before-resource text-sm`}>{textBeforeResource}</span>,
    );

    // Add highlighted resource mention
    elements.push(
      <span key={`resource-${id}`} className="font-medium text-primary">
        {title}
      </span>,
    );

    // Add card for the resource (event or article)
    const resourceCard = (
      <div className="flex items-center" key={id}>
        <div className="bg-primary rounded p-2 mr-2">
          {type === "article" ? (
            <BookMarked className="h-4 w-4 text-white" />
          ) : (
            <CalendarIcon className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-foreground text-sm font-medium">{title}</p>
          <button
            className="text-primary text-xs text-left font-medium"
            onClick={() =>
              type === "event" ? navigateToEvent(id) : navigateToArticle(id)
            }
          >
            {type === "article" ? "Read Article" : "View Event Details"}
          </button>
        </div>
      </div>
    );

    // Add the resource card to the list of elements
    const resourceCards = [resourceCard];

    // Add remaining content after the resource
    const textAfterResource = content.substring(match.index + match[0].length);
    elements.push(<span key={`text-after-resource`}>{textAfterResource}</span>);

    return (
      <>
        <p className="whitespace-pre-wrap">{elements}</p>
        {resourceCards.length > 0 && (
          <div className="mt-3 space-y-2">{resourceCards}</div>
        )}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col space-y-2 p-4 rounded-lg max-w-[90%]",
        isUser
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-card",
      )}
    >
      {processMessageContent(message.content)}
    </div>
  );
}
