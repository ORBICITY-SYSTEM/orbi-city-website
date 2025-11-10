import { Calendar, User } from "lucide-react";

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
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Travel tips, local insights, and the latest news from Orbi City Batumi
          </p>
        </div>
      </header>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container">
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

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter for travel tips, special offers, and Batumi insights
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="px-6 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
