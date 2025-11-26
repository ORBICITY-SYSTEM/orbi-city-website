import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
      {/* Header - Four Seasons Luxury */}
      <header className="bg-navy-950 border-b-2 border-gold-500/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-serif font-light text-gold-400">
              <img src={APP_LOGO} alt="OC" className="w-10 h-10" />
              ORBI CITY
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Home</span></Link>
            <Link href="/apartments"><span className="text-gold-400 font-medium cursor-pointer">Apartments</span></Link>
            <Link href="/amenities"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Amenities</span></Link>
            <Link href="/gallery"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Gallery</span></Link>
            <Link href="/location"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Location</span></Link>
            <Link href="/contact"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Contact</span></Link>
          </nav>
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded font-serif font-light transition-all duration-300 ${
                  editMode
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/50"
                    : "border-2 border-gold-400/40 text-gold-400 hover:bg-gold-50/10"
                }`}
              >
                {editMode ? "✓ Edit Mode" : "Edit Mode"}
              </button>
            )}
            <Link href="/apartments">
              <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg hover:shadow-gold-500/50 transition-all duration-300 hover:scale-105">Book Now / Pay Later</Button>
            </Link>
            <MobileMenu currentPath="/apartments" />
          </div>
        </div>
      </header>

      {/* Hero Section - Four Seasons Luxury */}
      <section className="relative py-32 bg-navy-900 text-white">        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/95" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-sm text-gold-400 tracking-[0.3em] uppercase mb-4 font-light">LUXURY LIVING</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6">Our Apartments</h1>
          <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
            Discover your perfect sanctuary by the Black Sea
          </p>
        </div>
      </section>

      {/* Filter Section - Four Seasons Luxury */}
      <section className="py-12 bg-white border-b-2 border-gold-200/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg" : "border-gold-400/40 text-gold-600 hover:bg-gold-50 hover:border-gold-500"}
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

      {/* Apartments Grid - Four Seasons Luxury */}
      <section className="py-20 bg-gradient-to-b from-white via-cream-50/30 to-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-4 pt-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments?.map((apartment) => (
              <Card key={apartment.id} className="overflow-hidden border-2 border-gold-200/30 hover:border-gold-400/50 bg-white shadow-xl hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 group">
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
                  <div className="absolute top-4 right-4 bg-gold-500 text-white px-4 py-2 rounded-md font-serif font-light">
                    ${apartment.pricePerNight}/night
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-3xl font-serif font-light text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">{apartment.name}</h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6 line-clamp-2">{apartment.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-5 h-5 text-gold-500" />
                      <span>{apartment.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bed className="w-5 h-5 text-gold-500" />
                      <span>{apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bath className="w-5 h-5 text-gold-500" />
                      <span>{apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Maximize className="w-5 h-5 text-gold-500" />
                      <span>{apartment.area} m²</span>
                    </div>
                  </div>

                  <Link href={`/apartment/${apartment.id}`}>
                    <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gold-500/50 font-serif font-light">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA Section - Four Seasons Luxury */}
      <section className="py-20 bg-gradient-to-r from-navy-900 to-navy-800 text-white border-t-2 border-gold-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-light mb-6">Ready to Book Your Stay?</h2>
          <p className="text-xl text-gray-300 font-light mb-8 max-w-2xl mx-auto">
            Experience luxury living at Orbi City Batumi. Book now and enjoy exclusive rates!
          </p>
          <Link href="/apartments">
            <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-12 py-6 text-lg shadow-2xl hover:shadow-gold-500/50 transition-all duration-300 hover:scale-105 font-serif font-light">
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Four Seasons Luxury */}
      <footer className="bg-navy-950 text-white py-20 border-t-2 border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-serif font-light mb-4 text-gold-400 tracking-wide">ORBI CITY Batumi</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking Black Sea views and five-star comfort.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-light mb-6 text-gold-400 tracking-wide">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Home</span></Link>
                <Link href="/apartments"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Apartments</span></Link>
                <Link href="/amenities"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Amenities</span></Link>
                <Link href="/contact"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Contact</span></Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-serif font-light mb-6 text-gold-400 tracking-wide">Contact</h3>
              <p className="text-gray-300 font-light mb-2">Orbi City, Block C, Khimshiashvili St, Batumi</p>
              <p className="text-gray-300 font-light mb-2">Email: info@orbicitybatumi.com</p>
              <a href="tel:+995555199090" className="text-gold-400 hover:text-gold-500 transition-colors font-light">Phone: +995 555 19 90 90</a>
            </div>
          </div>
          <div className="border-t border-gold-500/20 mt-12 pt-8 text-center text-gray-400 font-light">
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
