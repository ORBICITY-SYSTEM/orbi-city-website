import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { MobileMenu } from "@/components/MobileMenu";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Things to Do in Batumi",
      excerpt: "Discover the best attractions, restaurants, and hidden gems in Georgia's coastal gem.",
      author: "Orbi City Team",
      date: "March 15, 2024",
      category: "Travel Guide",
      image: "/hero-batumi-aerial.jpg"
    },
    {
      id: 2,
      title: "Why Choose an Aparthotel Over a Traditional Hotel",
      excerpt: "Learn about the benefits of aparthotel living and why it's perfect for both short and long stays.",
      author: "Orbi City Team",
      date: "March 10, 2024",
      category: "Accommodation Tips",
      image: "/suite-sea-view.jpg"
    },
    {
      id: 3,
      title: "Batumi's Best Beaches: A Complete Guide",
      excerpt: "From family-friendly shores to secluded spots, explore Batumi's stunning Black Sea coastline.",
      author: "Orbi City Team",
      date: "March 5, 2024",
      category: "Travel Guide",
      image: "/balcony-view.jpg"
    },
    {
      id: 4,
      title: "Georgian Cuisine: Must-Try Dishes in Batumi",
      excerpt: "A culinary journey through Georgia's rich food culture and the best restaurants in Batumi.",
      author: "Orbi City Team",
      date: "February 28, 2024",
      category: "Food & Dining",
      image: "/amenity-restaurant.jpg"
    },
    {
      id: 5,
      title: "Planning Your Perfect Batumi Getaway",
      excerpt: "Essential tips for planning an unforgettable vacation in Batumi, from weather to activities.",
      author: "Orbi City Team",
      date: "February 20, 2024",
      category: "Travel Tips",
      image: "/delux-suite-sea-view.jpg"
    },
    {
      id: 6,
      title: "Orbi City's Sustainability Initiatives",
      excerpt: "Learn how we're committed to environmental responsibility and sustainable tourism.",
      author: "Orbi City Team",
      date: "February 15, 2024",
      category: "Sustainability",
      image: "/superior-suite-sea-view.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
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
            <Link href="/gallery"><a className="text-gray-600 hover:text-primary transition-colors">Gallery</a></Link>
            <Link href="/location"><a className="text-gray-600 hover:text-primary transition-colors">Location</a></Link>
            <Link href="/contact"><a className="text-gray-600 hover:text-primary transition-colors">Contact</a></Link>
            <Link href="/blog"><a className="text-primary font-semibold">Blog</a></Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/apartments">
              <Button>Book Now</Button>
            </Link>
            <MobileMenu currentPath="/blog" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Travel tips, local insights, and the latest news from Orbi City Batumi
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Orbi City Batumi</h3>
              <p className="text-slate-300 mb-4">
                Your premier choice for luxury aparthotel living in the heart of Batumi.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/"><a className="text-slate-300 hover:text-yellow-500 transition-colors">Home</a></Link>
                <Link href="/apartments"><a className="text-slate-300 hover:text-yellow-500 transition-colors">Apartments</a></Link>
                <Link href="/amenities"><a className="text-slate-300 hover:text-yellow-500 transition-colors">Amenities</a></Link>
                <Link href="/gallery"><a className="text-slate-300 hover:text-yellow-500 transition-colors">Gallery</a></Link>
                <Link href="/contact"><a className="text-slate-300 hover:text-yellow-500 transition-colors">Contact</a></Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-slate-300 mb-2">Orbi City, Block C, Khimshiashvili St, Batumi</p>
              <p className="text-slate-300 mb-2">Email: info@orbicitybatumi.com</p>
              <p className="text-slate-300">Phone: +995 555 19 90 90</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
