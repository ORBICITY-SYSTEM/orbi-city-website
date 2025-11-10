import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { APP_LOGO } from "@/const";

const galleryImages = [
  { id: 1, url: "/suite-sea-view.webp", category: "Apartments", title: "Suite with Sea View" },
  { id: 2, url: "/delux-suite-sea-view.webp", category: "Apartments", title: "Delux Suite" },
  { id: 3, url: "/superior-suite-sea-view.webp", category: "Apartments", title: "Superior Suite" },
  { id: 4, url: "/superior-family-suite.webp", category: "Apartments", title: "Superior Family Suite" },
  { id: 5, url: "/two-bedroom-panoramic.webp", category: "Apartments", title: "Two Bedroom Panoramic" },
  { id: 6, url: "/360-suite-sea-view.jpg", category: "Interior", title: "Luxury Living Room" },
  { id: 7, url: "/360-delux-suite.jpg", category: "Interior", title: "Delux Suite Interior" },
  { id: 8, url: "/360-superior-suite.jpg", category: "Interior", title: "Superior Suite View" },
  { id: 9, url: "/hero-bg.jpg", category: "Exterior", title: "Batumi Aerial View" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const categories = ["All", "Apartments", "Interior", "Exterior"];

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

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
            <Link href="/apartments"><a className="text-gray-600 hover:text-primary transition-colors">Apartments</a></Link>
            <Link href="/amenities"><a className="text-gray-600 hover:text-primary transition-colors">Amenities</a></Link>
            <Link href="/gallery"><a className="text-primary font-semibold">Gallery</a></Link>
            <Link href="/location"><a className="text-gray-600 hover:text-primary transition-colors">Location</a></Link>
            <Link href="/contact"><a className="text-gray-600 hover:text-primary transition-colors">Contact</a></Link>
          </nav>
          <Link href="/#book">
            <Button>Book Now</Button>
          </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                onClick={() => openLightbox(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              src={currentImage.url}
              alt={currentImage.title}
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
          <Link href="/#book">
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
    </div>
  );
}
