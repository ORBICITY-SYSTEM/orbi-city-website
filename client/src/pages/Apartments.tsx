import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Users, Bed, Bath, Maximize, Star, Pencil } from "lucide-react";
import { APP_LOGO } from "@/const";
import { MobileMenu } from "@/components/MobileMenu";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Apartments() {
  const { user } = useAuth();
  const { data: apartments, isLoading } = trpc.apartments.list.useQuery();
  const [filter, setFilter] = useState<string>("all");
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    pricePerNight: 0,
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
  });

  const utils = trpc.useUtils();
  const updateMutation = trpc.apartments.update.useMutation({
    onSuccess: () => {
      toast.success("Apartment updated successfully");
      utils.apartments.list.invalidate();
      setEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update apartment: ${error.message}`);
    },
  });

  const handleEditClick = (apt: any) => {
    setEditingApartment(apt);
    setEditForm({
      name: apt.name,
      description: apt.description,
      pricePerNight: apt.pricePerNight,
      maxGuests: apt.maxGuests,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      area: apt.area,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingApartment) return;
    updateMutation.mutate({
      id: editingApartment.id,
      ...editForm,
    });
  };

  const filteredApartments = apartments?.filter((apt) => {
    if (filter === "all") return true;
    return apt.type.toLowerCase().includes(filter.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary">
              <img src={APP_LOGO} alt="OC" className="w-10 h-10" />
              ORBI CITY
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><a className="text-gray-600 hover:text-primary transition-colors">Home</a></Link>
            <Link href="/apartments"><a className="text-primary font-semibold">Apartments</a></Link>
            <Link href="/amenities"><a className="text-gray-600 hover:text-primary transition-colors">Amenities</a></Link>
            <Link href="/gallery"><a className="text-gray-600 hover:text-primary transition-colors">Gallery</a></Link>
            <Link href="/location"><a className="text-gray-600 hover:text-primary transition-colors">Location</a></Link>
            <Link href="/contact"><a className="text-gray-600 hover:text-primary transition-colors">Contact</a></Link>
          </nav>
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  editMode
                    ? "bg-yellow-500 text-slate-900 hover:bg-yellow-600"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {editMode ? "✓ Edit Mode" : "Edit Mode"}
              </button>
            )}
            <Link href="/apartments">
              <Button>Book Now</Button>
            </Link>
            <MobileMenu currentPath="/apartments" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Apartments</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Choose from our selection of luxury apartments, each designed to provide the perfect blend of comfort and elegance
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Apartments
            </Button>
            <Button
              variant={filter === "suite" ? "default" : "outline"}
              onClick={() => setFilter("suite")}
            >
              Suites
            </Button>
            <Button
              variant={filter === "deluxe" ? "default" : "outline"}
              onClick={() => setFilter("deluxe")}
            >
              Deluxe
            </Button>
            <Button
              variant={filter === "family" ? "default" : "outline"}
              onClick={() => setFilter("family")}
            >
              Family
            </Button>
            <Button
              variant={filter === "panoramic" ? "default" : "outline"}
              onClick={() => setFilter("panoramic")}
            >
              Panoramic
            </Button>
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments?.map((apartment) => (
              <Card key={apartment.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={apartment.imageUrl}
                    alt={apartment.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {user?.role === "admin" && editMode && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditClick(apartment);
                      }}
                      className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 animate-pulse z-10"
                      title="Edit Apartment"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{apartment.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{apartment.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{apartment.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bed className="w-5 h-5 text-primary" />
                      <span>{apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bath className="w-5 h-5 text-primary" />
                      <span>{apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Maximize className="w-5 h-5 text-primary" />
                      <span>{apartment.area} m²</span>
                    </div>
                  </div>

                  <Link href={`/apartment/${apartment.id}`}>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Stay?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience luxury living at Orbi City Batumi. Book now and enjoy exclusive rates!
          </p>
          <Link href="/apartments">
            <Button size="lg" variant="secondary" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ORBI CITY Batumi</h3>
              <p className="text-gray-400">
                Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking Black Sea views and five-star comfort.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/"><a className="text-gray-400 hover:text-white transition-colors">Home</a></Link>
                <Link href="/apartments"><a className="text-gray-400 hover:text-white transition-colors">Apartments</a></Link>
                <Link href="/amenities"><a className="text-gray-400 hover:text-white transition-colors">Amenities</a></Link>
                <Link href="/contact"><a className="text-gray-400 hover:text-white transition-colors">Contact</a></Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Orbi City, Block C, Khimshiashvili St, Batumi</p>
              <p className="text-gray-400 mb-2">Email: info@orbicitybatumi.com</p>
              <p className="text-gray-400">Phone: +995 555 19 90 90</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Edit Apartment Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Apartment</DialogTitle>
            <DialogDescription>
              Update the apartment details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price per Night ($)</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  value={editForm.pricePerNight}
                  onChange={(e) => setEditForm({ ...editForm, pricePerNight: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxGuests">Max Guests</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  value={editForm.maxGuests}
                  onChange={(e) => setEditForm({ ...editForm, maxGuests: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={editForm.bedrooms}
                  onChange={(e) => setEditForm({ ...editForm, bedrooms: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={editForm.bathrooms}
                  onChange={(e) => setEditForm({ ...editForm, bathrooms: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  value={editForm.area}
                  onChange={(e) => setEditForm({ ...editForm, area: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
