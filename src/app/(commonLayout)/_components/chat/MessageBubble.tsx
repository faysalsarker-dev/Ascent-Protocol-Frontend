import { Message } from "./ChatLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ content, role, isStreaming }: Message) => {
  const isUser = role === "user";

  return (
    <div
      className={`
        w-full py-6 px-4
       
      `}
    >
      <div
        className={`
          max-w-3xl mx-auto flex gap-4
          ${isUser ? "flex-row-reverse" : ""}
        `}
      >
        {/* Avatar */}
        <div
          className={`
            w-8 h-8 rounded-md flex items-center justify-center shrink-0
            ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}
          `}
        >
          {isUser ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        {/* Message Bubble */}
        <div className={`flex-1 flex flex-col ${isUser ? "items-end" : "items-start"}`}>
          <div
            className={`
              text-sm max-w-full rounded-xl px-4 py-3
              ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}
            `}
          >
            {/* Wrap markdown in a styled div */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: (props) => <p className="mb-3 leading-relaxed" {...props} />,
                  ul: (props) => <ul className="list-disc ml-6 mb-3" {...props} />,
                  ol: (props) => <ol className="list-decimal ml-6 mb-3" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  strong: (props) => <strong className="font-semibold" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-foreground/80 ml-1 animate-pulse" />
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {isUser ? "You" : "Assistant"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
