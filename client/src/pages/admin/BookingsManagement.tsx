import { useState } from "react";
import { trpc } from "@/lib/trpc";
import type { Booking } from "../../../../drizzle/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Phone, Mail, MessageCircle, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function BookingsManagement() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: bookings, isLoading } = trpc.bookings.list.useQuery();
  const utils = trpc.useUtils();

  const updateStatusMutation = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Booking status updated successfully");
      utils.bookings.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  const cancelBookingMutation = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      utils.bookings.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to cancel booking: ${error.message}`);
    },
  });

  const handleStatusChange = (bookingId: number, newStatus: "pending" | "confirmed" | "completed" | "cancelled") => {
    updateStatusMutation.mutate({ id: bookingId, status: newStatus });
  };

  const handleCancelBooking = (bookingId: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate({ id: bookingId, status: "cancelled" });
    }
  };

  const filteredBookings = bookings?.filter((booking) => {
    if (statusFilter === "all") return true;
    return booking.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "confirmed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case "whatsapp":
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case "telegram":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "email":
        return <Mail className="w-4 h-4 text-gray-600" />;
      case "phone":
        return <Phone className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-light text-navy-900">Bookings Management</h1>
          <p className="text-gray-600 mt-1">Manage all apartment reservations</p>
        </div>
        <div className="flex gap-4 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
          <CardDescription>
            {filteredBookings?.length || 0} booking(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBookings && filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Apartment</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking: Booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">#{booking.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{booking.guestName}</span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.guestEmail}
                          </span>
                          {booking.guestPhone && (
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {booking.guestPhone}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gold-500" />
                          Apartment #{booking.apartmentId}
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(booking.checkIn), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{format(new Date(booking.checkOut), "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {booking.guests}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-gold-600">${booking.totalPrice}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getContactMethodIcon(booking.contactMethod)}
                          <span className="text-sm capitalize">{booking.contactMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Select
                            value={booking.status}
                            onValueChange={(value) => handleStatusChange(booking.id, value as any)}
                            disabled={booking.status === "cancelled"}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          {booking.status !== "cancelled" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancelBookingMutation.isPending}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {statusFilter === "all"
                  ? "No reservations have been made yet."
                  : `No ${statusFilter} bookings found.`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Special Requests Section */}
      {filteredBookings && filteredBookings.some((b) => b.specialRequests) && (
        <Card>
          <CardHeader>
            <CardTitle>Special Requests</CardTitle>
            <CardDescription>Guest requests and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings
                .filter((b: Booking) => b.specialRequests)
                .map((booking: Booking) => (
                  <div key={booking.id} className="border-l-4 border-gold-500 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">
                        Booking #{booking.id} - {booking.guestName}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-gray-700">{booking.specialRequests}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
