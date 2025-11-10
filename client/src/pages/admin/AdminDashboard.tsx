import { useState } from "react";
import { Link, useRoute } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Building2,
  Image,
  FileText,
  Settings,
  Users,
  Calendar,
  Star,
  Sparkles,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { APP_LOGO } from "@/const";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, params] = useRoute("/admin/:page?");
  const currentPage = params?.page || "dashboard";

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin privileges to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { id: "apartments", label: "Apartments", icon: Building2, href: "/admin/apartments" },
    { id: "bookings", label: "Bookings", icon: Calendar, href: "/admin/bookings" },
    { id: "gallery", label: "Gallery", icon: Image, href: "/admin/gallery" },
    { id: "blog", label: "Blog", icon: FileText, href: "/admin/blog" },
    { id: "testimonials", label: "Testimonials", icon: Star, href: "/admin/testimonials" },
    { id: "amenities", label: "Amenities", icon: Sparkles, href: "/admin/amenities" },
    { id: "users", label: "Users", icon: Users, href: "/admin/users" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-900 w-64`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between mb-5 px-3">
            <div className="flex items-center space-x-2">
              <img src={APP_LOGO} alt="Orbi City" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = 
                (item.id === "dashboard" && currentPage === "dashboard") ||
                (item.id !== "dashboard" && currentPage === item.id);
              
              return (
                <li key={item.id}>
                  <Link href={item.href}>
                    <a
                      className={`flex items-center p-2 rounded-lg group ${
                        isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="ml-3">{item.label}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <div className="absolute bottom-4 left-0 right-0 px-3">
            <button
              onClick={() => logout()}
              className="flex items-center w-full p-2 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "lg:ml-64" : ""} transition-all`}>
        {/* Top Bar */}
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.name || user.email}</span>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

import ApartmentsManagement from "./ApartmentsManagement";
import GalleryManagement from "./GalleryManagement";

export default function AdminDashboard() {
  const [, params] = useRoute("/admin/:page?");
  const currentPage = params?.page || "dashboard";

  // Render different pages based on route
  if (currentPage === "apartments") {
    return <ApartmentsManagement />;
  }

  if (currentPage === "gallery") {
    return <GalleryManagement />;
  }

  // Default dashboard view
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to Orbi City Admin Panel</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Apartments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Uploaded images</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Published posts</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/apartments">
                <Button className="w-full" variant="outline">
                  <Building2 className="w-4 h-4 mr-2" />
                  Manage Apartments
                </Button>
              </Link>
              <Link href="/admin/bookings">
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Bookings
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Site Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
