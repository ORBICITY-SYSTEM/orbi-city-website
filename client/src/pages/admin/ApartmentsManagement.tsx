import { useState } from "react";
import { AdminLayout } from "./AdminDashboard";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, Upload } from "lucide-react";
import { toast } from "sonner";
import { storagePut } from "../../../../server/storage";

export default function ApartmentsManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: apartments, isLoading, refetch } = trpc.apartments.list.useQuery();
  
  const createMutation = trpc.apartments.create.useMutation({
    onSuccess: () => {
      toast.success("Apartment created successfully");
      setIsCreateDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create apartment: ${error.message}`);
    },
  });

  const updateMutation = trpc.apartments.update.useMutation({
    onSuccess: () => {
      toast.success("Apartment updated successfully");
      setIsEditDialogOpen(false);
      setSelectedApartment(null);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update apartment: ${error.message}`);
    },
  });

  const deleteMutation = trpc.apartments.delete.useMutation({
    onSuccess: () => {
      toast.success("Apartment deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete apartment: ${error.message}`);
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload to server
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      const { url } = await response.json();
      
      if (selectedApartment) {
        setSelectedApartment({ ...selectedApartment, [field]: url });
      }
      
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this apartment?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Apartments Management</h1>
            <p className="text-gray-600 mt-2">Manage your apartment listings</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Apartment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Apartments</CardTitle>
            <CardDescription>View and manage all apartment listings</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : apartments && apartments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price/Night</TableHead>
                    <TableHead>Max Guests</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apartments.map((apt) => (
                    <TableRow key={apt.id}>
                      <TableCell>
                        <img
                          src={apt.imageUrl}
                          alt={apt.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{apt.name}</TableCell>
                      <TableCell>{apt.type}</TableCell>
                      <TableCell>${apt.pricePerNight}</TableCell>
                      <TableCell>{apt.maxGuests}</TableCell>
                      <TableCell>{apt.area} m²</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApartment(apt);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(apt.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No apartments found. Create your first apartment!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedApartment(null);
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditDialogOpen ? "Edit Apartment" : "Create New Apartment"}
              </DialogTitle>
              <DialogDescription>
                {isEditDialogOpen
                  ? "Update apartment details"
                  : "Add a new apartment to your listings"}
              </DialogDescription>
            </DialogHeader>
            <ApartmentForm
              apartment={selectedApartment}
              onSubmit={(data) => {
                if (isEditDialogOpen && selectedApartment) {
                  updateMutation.mutate({ id: selectedApartment.id, ...data });
                } else {
                  createMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsCreateDialogOpen(false);
                setIsEditDialogOpen(false);
                setSelectedApartment(null);
              }}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

function ApartmentForm({
  apartment,
  onSubmit,
  onCancel,
  isLoading,
}: {
  apartment?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    name: apartment?.name || "",
    type: apartment?.type || "",
    description: apartment?.description || "",
    shortDescription: apartment?.shortDescription || "",
    pricePerNight: apartment?.pricePerNight || 0,
    maxGuests: apartment?.maxGuests || 2,
    bedrooms: apartment?.bedrooms || 1,
    bathrooms: apartment?.bathrooms || 1,
    area: apartment?.area || 0,
    imageUrl: apartment?.imageUrl || "",
    features: apartment?.features || "[]",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Apartment Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Full Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pricePerNight">Price per Night ($) *</Label>
          <Input
            id="pricePerNight"
            type="number"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area (m²)</Label>
          <Input
            id="area"
            type="number"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maxGuests">Max Guests *</Label>
          <Input
            id="maxGuests"
            type="number"
            value={formData.maxGuests}
            onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Main Image URL *</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="/apt-suite-sea-view-real.jpg"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (JSON array)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder='["Sea View", "Balcony", "Kitchen"]'
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : apartment ? "Update" : "Create"}
        </Button>
      </DialogFooter>
    </form>
  );
}
