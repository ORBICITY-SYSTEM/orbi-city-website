import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { MobileMenu } from "@/components/MobileMenu";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Pencil } from "lucide-react";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Blog() {
  const { user } = useAuth();
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    status: "draft" as "draft" | "published",
  });

  const utils = trpc.useUtils();
  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Blog post updated successfully");
      utils.blog.list.invalidate();
      setEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update post: ${error.message}`);
    },
  });

  const handleEditClick = (post: any) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || "",
      featuredImage: post.featuredImage || "",
      status: post.status,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingPost) return;
    updateMutation.mutate({
      id: editingPost.id,
      ...editForm,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-500 mb-6">Check back soon for exciting content!</p>
              {user?.role === "admin" && (
                <p className="text-sm text-gray-400">Go to Admin Panel → Blog Management to create posts</p>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300 relative"
                >
                  {user?.role === "admin" && editMode && (
                    <button
                      onClick={() => handleEditClick(post)}
                      className="absolute top-4 right-4 z-10 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 animate-pulse"
                      title="Edit Post"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImage || "/hero-batumi-aerial.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Draft"}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={editForm.excerpt}
                onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={editForm.featuredImage}
                onChange={(e) => setEditForm({ ...editForm, featuredImage: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value: "draft" | "published") => setEditForm({ ...editForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} disabled={updateMutation.isPending}>
              {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
