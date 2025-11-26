import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { APP_LOGO } from "@/const";
import { MobileMenu } from "@/components/MobileMenu";
import { trpc } from "@/lib/trpc";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Gallery() {
  const { user } = useAuth();
  const { data: galleryImages = [], isLoading } = trpc.gallery.list.useQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const utils = trpc.useUtils();
  const updateMutation = trpc.gallery.update.useMutation({
    onSuccess: () => {
      toast.success("Image updated successfully");
      utils.gallery.list.invalidate();
      setEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update image: ${error.message}`);
    },
  });

  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully");
      utils.gallery.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to delete image: ${error.message}`);
    },
  });

  const handleEditClick = (image: any) => {
    setEditingImage(image);
    setEditForm({
      title: image.title,
      description: image.description || "",
      category: image.category,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingImage) return;
    updateMutation.mutate({
      id: editingImage.id,
      ...editForm,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteMutation.mutate({ id });
    }
  };

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  const openLightbox = (id: number) => {
    setLightboxImage(id);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (lightboxImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex].id);
  };

  const prevImage = () => {
    if (lightboxImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex].id);
  };

  const currentImage = galleryImages.find(img => img.id === lightboxImage);

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
            <Link href="/apartments"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Apartments</span></Link>
            <Link href="/amenities"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Amenities</span></Link>
            <Link href="/gallery"><span className="text-gold-400 font-medium cursor-pointer">Gallery</span></Link>
            <Link href="/location"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Location</span></Link>
            <Link href="/contact"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Contact</span></Link>
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
              <Button>CHECK RATES</Button>
            </Link>
            <MobileMenu currentPath="/gallery" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Explore our stunning collection of luxury apartments and breathtaking sea views
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Images Yet</h3>
              <p className="text-gray-500 mb-6">Gallery images will appear here once uploaded</p>
              {user?.role === "admin" && (
                <p className="text-sm text-gray-400">Go to Admin Panel → Gallery Management to upload images</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg border-2 border-gold-200/30 hover:border-gold-400/50 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 cursor-pointer aspect-[4/3]"
                onClick={() => openLightbox(image.id)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title || "Gallery image"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {user?.role === "admin" && editMode && (
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(image);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      title="Edit Image"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.category}</p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage !== null && currentImage && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
          <div className="max-w-6xl max-h-[90vh] p-4">
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title || "Gallery image"}
              className="max-w-full max-h-full object-contain"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-2xl font-bold">{currentImage.title}</h3>
              <p className="text-gray-300">{currentImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience It Yourself</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your stay at Orbi City Batumi and enjoy these stunning views in person
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
                <Link href="/"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</span></Link>
                <Link href="/apartments"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Apartments</span></Link>
                <Link href="/amenities"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Amenities</span></Link>
                <Link href="/contact"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</span></Link>
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

      {/* Edit Image Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Gallery Image</DialogTitle>
            <DialogDescription>
              Update the image details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rooms">Rooms</SelectItem>
                  <SelectItem value="Views">Views</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="Exterior">Exterior</SelectItem>
                  <SelectItem value="Amenities">Amenities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
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
