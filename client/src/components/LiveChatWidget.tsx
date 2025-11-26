import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { format } from "date-fns";
import type { ChatMessage } from "../../../drizzle/schema";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get or create chat session
  const { data: session } = trpc.chat.getOrCreateSession.useQuery(
    { guestName, guestEmail },
    { enabled: hasStartedChat && !!guestName && !!guestEmail }
  );

  // Get messages for current session
  const { data: messages, refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
    { sessionId: sessionId || 0 },
    { enabled: !!sessionId, refetchInterval: 3000 } // Poll every 3 seconds
  );

  // Send message mutation
  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      refetchMessages();
      scrollToBottom();
    },
    onError: (error: any) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  useEffect(() => {
    if (session?.id) {
      setSessionId(session.id);
    }
  }, [session]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      toast.error("Please enter your name and email");
      return;
    }
    setHasStartedChat(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !sessionId) return;

    sendMessageMutation.mutate({
      sessionId,
      message: message.trim(),
      senderType: "guest",
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white rounded-full p-4 shadow-2xl hover:shadow-gold-500/50 transition-all duration-300 hover:scale-110 flex items-center gap-2"
        aria-label="Open live chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium pr-2">Chat with us</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80" : "w-96"
      }`}
    >
      <Card className="shadow-2xl border-2 border-gold-200">
        <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gold-400" />
              <CardTitle className="text-lg font-serif">Live Chat</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            We typically reply within minutes
          </p>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            {!hasStartedChat ? (
              // Start Chat Form
              <form onSubmit={handleStartChat} className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Welcome! Please enter your details to start chatting with us.
                  </p>
                </div>
                <div>
                  <Input
                    placeholder="Your Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="border-gold-200 focus:border-gold-400"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    className="border-gold-200 focus:border-gold-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
                >
                  Start Chat
                </Button>
              </form>
            ) : (
              // Chat Interface
              <>
                {/* Messages Area */}
                <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages && messages.length > 0 ? (
                    messages.map((msg: ChatMessage) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderType === "guest" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.senderType === "guest"
                              ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white"
                              : "bg-white border border-gray-200 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.senderType === "guest"
                                ? "text-white/70"
                                : "text-gray-500"
                            }`}
                          >
                            {format(new Date(msg.createdAt), "HH:mm")}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No messages yet</p>
                      <p className="text-xs mt-1">Send a message to start the conversation</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 border-gold-200 focus:border-gold-400"
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button
                      type="submit"
                      disabled={!message.trim() || sendMessageMutation.isPending}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
