import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Loader2, X, User, Mail } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { ChatSession, ChatMessage } from "../../../../drizzle/schema";

export default function ChatManagement() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const { data: sessions, refetch: refetchSessions } = trpc.chat.listSessions.useQuery(undefined, {
    refetchInterval: 5000, // Poll every 5 seconds
  });

  const { data: messages, refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
    { sessionId: selectedSession || 0 },
    { enabled: !!selectedSession, refetchInterval: 3000 }
  );

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      refetchMessages();
      refetchSessions();
    },
    onError: (error: any) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  const closeSessionMutation = trpc.chat.closeSession.useMutation({
    onSuccess: () => {
      toast.success("Chat session closed");
      setSelectedSession(null);
      refetchSessions();
    },
    onError: (error: any) => {
      toast.error(`Failed to close session: ${error.message}`);
    },
  });

  const markAsReadMutation = trpc.chat.markAsRead.useMutation({
    onSuccess: () => {
      refetchMessages();
      refetchSessions();
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedSession) return;

    sendMessageMutation.mutate({
      sessionId: selectedSession,
      message: message.trim(),
      senderType: "admin",
      senderName: "Support Team",
    });
  };

  const handleSelectSession = (sessionId: number) => {
    setSelectedSession(sessionId);
    markAsReadMutation.mutate({ sessionId });
  };

  const getUnreadCount = (sessionId: number) => {
    if (!messages || selectedSession !== sessionId) return 0;
    return messages.filter((m: ChatMessage) => m.senderType === "guest" && m.isRead === 0).length;
  };

  const activeSessions = sessions?.filter((s: ChatSession) => s.status === "active") || [];
  const closedSessions = sessions?.filter((s: ChatSession) => s.status === "closed") || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-light text-navy-900">Live Chat Management</h1>
        <p className="text-gray-600 mt-1">Manage customer conversations in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Chat Sessions</CardTitle>
            <CardDescription>
              {activeSessions.length} active conversation(s)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {/* Active Sessions */}
              {activeSessions.length > 0 && (
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Active</h3>
                  {activeSessions.map((session: ChatSession) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedSession === session.id
                          ? "bg-gold-50 border-2 border-gold-500"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <p className="font-medium text-gray-900 truncate">
                              {session.guestName}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500 truncate">{session.guestEmail}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {format(new Date(session.updatedAt), "MMM dd, HH:mm")}
                          </p>
                        </div>
                        {getUnreadCount(session.id) > 0 && (
                          <Badge className="bg-red-500 text-white">
                            {getUnreadCount(session.id)}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Closed Sessions */}
              {closedSessions.length > 0 && (
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Closed</h3>
                  {closedSessions.slice(0, 5).map((session: ChatSession) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSession(session.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors opacity-60 ${
                        selectedSession === session.id
                          ? "bg-gold-50 border-2 border-gold-500"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <p className="font-medium text-gray-900 truncate">{session.guestName}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(session.updatedAt), "MMM dd, HH:mm")}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {activeSessions.length === 0 && closedSessions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No chat sessions yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          {selectedSession ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {sessions?.find((s: ChatSession) => s.id === selectedSession)?.guestName}
                    </CardTitle>
                    <CardDescription>
                      {sessions?.find((s: ChatSession) => s.id === selectedSession)?.guestEmail}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        sessions?.find((s: ChatSession) => s.id === selectedSession)?.status ===
                        "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {sessions?.find((s: ChatSession) => s.id === selectedSession)?.status}
                    </Badge>
                    {sessions?.find((s: ChatSession) => s.id === selectedSession)?.status ===
                      "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => closeSessionMutation.mutate({ sessionId: selectedSession })}
                        disabled={closeSessionMutation.isPending}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Close Chat
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages Area */}
                <div className="h-[500px] overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages && messages.length > 0 ? (
                    messages.map((msg: ChatMessage) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderType === "admin" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderType === "admin"
                              ? "bg-gradient-to-r from-navy-800 to-navy-900 text-white"
                              : "bg-white border border-gray-200 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.senderType === "admin" ? "text-white/70" : "text-gray-500"
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
                    </div>
                  )}
                </div>

                {/* Message Input */}
                {sessions?.find((s: ChatSession) => s.id === selectedSession)?.status ===
                  "active" && (
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your reply..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 border-gold-200 focus:border-gold-400"
                        disabled={sendMessageMutation.isPending}
                      />
                      <Button
                        type="submit"
                        disabled={!message.trim() || sendMessageMutation.isPending}
                        className="bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-900 hover:to-navy-950 text-white"
                      >
                        {sendMessageMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[600px]">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select a chat to view messages</p>
                <p className="text-sm mt-1">Choose a session from the list to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
