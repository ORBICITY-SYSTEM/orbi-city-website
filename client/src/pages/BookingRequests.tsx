import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Building2, Mail, Phone, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function BookingRequests() {
  const { user, isAuthenticated } = useAuth();
  const [dateFilter, setDateFilter] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Redirect if not admin
  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: bookings, isLoading } = trpc.bookings.list.useQuery();
  const { data: apartments } = trpc.apartments.list.useQuery();
  const updateStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Booking status updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  // Filter bookings
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings.filter((booking) => {
      // Date filter
      if (dateFilter) {
        const bookingDate = format(new Date(booking.checkIn), "yyyy-MM-dd");
        if (!bookingDate.includes(dateFilter)) return false;
      }

      // Room type filter
      if (roomTypeFilter !== "all") {
        const apartment = apartments?.find((apt) => apt.id === booking.apartmentId);
        if (!apartment || apartment.type !== roomTypeFilter) return false;
      }

      // Status filter
      if (statusFilter !== "all" && booking.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [bookings, dateFilter, roomTypeFilter, statusFilter, apartments]);

  const clearFilters = () => {
    setDateFilter("");
    setRoomTypeFilter("all");
    setStatusFilter("all");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const uniqueRoomTypes = useMemo(() => {
    if (!apartments) return [];
    return Array.from(new Set(apartments.map((apt) => apt.type)));
  }, [apartments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-light text-navy-900 mb-2">
            Booking Requests
          </h1>
          <p className="text-gray-600 font-light">
            Manage all booking requests from guests
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-2 border-gold-200/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-serif font-light">
              <Filter className="h-5 w-5 text-gold-600" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Check-in Date
                </label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border-gold-200 focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Room Type
                </label>
                <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                  <SelectTrigger className="border-gold-200 focus:border-gold-400">
                    <SelectValue placeholder="All room types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All room types</SelectItem>
                    {uniqueRoomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gold-200 focus:border-gold-400">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full border-gold-300 text-gold-700 hover:bg-gold-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading booking requests...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card className="border-2 border-gold-200/30">
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 font-light">
                No booking requests found matching your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => {
              const apartment = apartments?.find((apt) => apt.id === booking.apartmentId);
              
              return (
                <Card key={booking.id} className="border-2 border-gold-200/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-serif font-light text-navy-900 mb-2">
                          {booking.guestName}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{apartment?.name || "Unknown apartment"}</span>
                          <span className="text-gray-400">•</span>
                          <span>{apartment?.type || "Unknown type"}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} border`}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gold-600" />
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p className="font-medium">
                              {format(new Date(booking.checkIn), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gold-600" />
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p className="font-medium">
                              {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-gold-600" />
                          <div>
                            <p className="text-sm text-gray-500">Guests</p>
                            <p className="font-medium">{booking.guests} guests</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gold-600" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{booking.guestEmail}</p>
                          </div>
                        </div>
                        {booking.guestPhone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-gold-600" />
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{booking.guestPhone}</p>
                            </div>
                          </div>
                        )}
                        {booking.specialRequests && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                            <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {booking.status === "pending" && (
                      <div className="flex gap-3 pt-4 border-t border-gold-200/30">
                        <Button
                          onClick={() =>
                            updateStatus.mutate({ id: booking.id, status: "confirmed" })
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Confirm
                        </Button>
                        <Button
                          onClick={() =>
                            updateStatus.mutate({ id: booking.id, status: "cancelled" })
                          }
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
