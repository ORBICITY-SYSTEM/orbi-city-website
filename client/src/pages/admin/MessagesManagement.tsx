import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Trash2, Eye, CheckCircle2, Reply } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export function MessagesManagement() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

  const { data: messages, isLoading, refetch } = trpc.contactMessages.list.useQuery();

  const updateStatus = trpc.contactMessages.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Message status updated");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  const deleteMessage = trpc.contactMessages.delete.useMutation({
    onSuccess: () => {
      toast.success("Message deleted successfully");
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete message: ${error.message}`);
    },
  });

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    if (message.status === "new") {
      updateStatus.mutate({ id: message.id, status: "read" });
    }
  };

  const handleMarkAsReplied = (id: number) => {
    updateStatus.mutate({ id, status: "replied" });
    setSelectedMessage(null);
  };

  const handleDelete = (id: number) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessage.mutate({ id: messageToDelete });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>;
      case "read":
        return <Badge className="bg-yellow-500">Read</Badge>;
      case "replied":
        return <Badge className="bg-green-500">Replied</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const newMessages = messages?.filter((m) => m.status === "new").length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            Manage contact form submissions ({newMessages} new)
          </p>
        </div>
      </div>

      {!messages || messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">
              Contact form submissions will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                message.status === "new" ? "border-l-4 border-l-blue-500" : ""
              }`}
              onClick={() => handleViewMessage(message)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {message.name}
                      </h3>
                      {getStatusBadge(message.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {message.email} {message.phone && `• ${message.phone}`}
                    </p>
                    {message.subject && (
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Subject: {message.subject}
                      </p>
                    )}
                    <p className="text-gray-700 line-clamp-2">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(new Date(message.createdAt), "PPpp")}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              From {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  {getStatusBadge(selectedMessage.status)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                {selectedMessage.subject && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-700">Subject</p>
                    <p className="text-gray-900">{selectedMessage.subject}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-700">Date</p>
                  <p className="text-gray-900">
                    {format(new Date(selectedMessage.createdAt), "PPpp")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Message</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </Button>
            {selectedMessage?.status !== "replied" && (
              <Button
                onClick={() => handleMarkAsReplied(selectedMessage.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Replied
              </Button>
            )}
            <Button
              onClick={() => {
                window.location.href = `mailto:${selectedMessage?.email}`;
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Reply className="mr-2 h-4 w-4" />
              Reply via Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMessage.isPending}
            >
              {deleteMessage.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
