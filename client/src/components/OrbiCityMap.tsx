import { useRef, useState } from "react";
import { MapView } from "./Map";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Navigation, Phone } from "lucide-react";

// Orbi City Batumi coordinates (Exact location)
const ORBI_CITY_LOCATION = {
  lat: 41.6415,
  lng: 41.6415,
};

const NEARBY_ATTRACTIONS = [
  { name: "Batumi Beach", lat: 41.6415, lng: 41.6368, type: "beach" },
  { name: "Batumi Boulevard", lat: 41.6438, lng: 41.6368, type: "attraction" },
  { name: "Alphabet Tower", lat: 41.6461, lng: 41.6368, type: "landmark" },
  { name: "Batumi Airport", lat: 41.6103, lng: 41.5997, type: "airport" },
];

export function OrbiCityMap() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;

    // Add Orbi City marker
    const orbiMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: ORBI_CITY_LOCATION,
      title: "Orbi City Batumi",
    });

    // Add info window for Orbi City
    const orbiInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; font-family: 'Cormorant Garamond', serif;">
          <h3 style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Orbi City Batumi</h3>
          <p style="color: #64748b; margin-bottom: 8px;">5 Star Luxury Aparthotel</p>
          <p style="color: #64748b; font-size: 14px;">Khimshiashvili St, Batumi</p>
          <a href="tel:+995555199090" style="color: #d4af37; text-decoration: none; font-weight: 500;">+995 555 19 90 90</a>
        </div>
      `,
    });

    orbiMarker.addListener("click", () => {
      orbiInfoWindow.open(map, orbiMarker);
    });

    // Only show Orbi City marker (no nearby attractions)
  };

  const showDirections = (destination: { lat: number; lng: number }, name: string) => {
    if (!mapRef.current) return;

    setSelectedAttraction(name);

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: mapRef.current,
      suppressMarkers: false,
    });

    directionsService.route(
      {
        origin: ORBI_CITY_LOCATION,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result);
        }
      }
    );
  };

  return (
    <div className="space-y-8">
      {/* Map Container with Luxury Styling */}
      <Card className="overflow-hidden border-2 border-gold-200/40 shadow-2xl hover:shadow-gold-500/20 transition-all duration-500">
        <MapView
          className="w-full h-[600px]"
          initialCenter={ORBI_CITY_LOCATION}
          initialZoom={14}
          onMapReady={handleMapReady}
        />
      </Card>

      {/* Nearby Attractions - Luxury Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NEARBY_ATTRACTIONS.map((attraction) => (
          <Card
            key={attraction.name}
            className={`p-6 border-2 transition-all duration-300 cursor-pointer ${
              selectedAttraction === attraction.name
                ? "border-gold-500 bg-gold-50/30 shadow-lg shadow-gold-500/20"
                : "border-gold-200/30 hover:border-gold-400/50 hover:shadow-xl"
            }`}
            onClick={() => showDirections({ lat: attraction.lat, lng: attraction.lng }, attraction.name)}
          >
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg text-navy-900 font-light mb-1">
                  {attraction.name}
                </h3>
                <p className="text-sm text-gray-600 font-light capitalize">
                  {attraction.type}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full border-gold-400/40 text-gold-600 hover:bg-gold-50 hover:border-gold-500 transition-all duration-300"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </Card>
        ))}
      </div>

      {/* Contact Information - Luxury Card */}
      <Card className="p-8 border-2 border-gold-200/40 bg-gradient-to-br from-white to-cream-50/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-gold-500 mx-auto mb-3" />
            <h4 className="font-serif text-lg text-navy-900 mb-2 font-light">Address</h4>
            <p className="text-gray-600 font-light">
              Orbi City, Block C<br />
              Khimshiashvili St, Batumi<br />
              Georgia
            </p>
          </div>
          <div className="text-center">
            <Phone className="h-8 w-8 text-gold-500 mx-auto mb-3" />
            <h4 className="font-serif text-lg text-navy-900 mb-2 font-light">Phone</h4>
            <a
              href="tel:+995555199090"
              className="text-gold-600 hover:text-gold-700 transition-colors font-light"
            >
              +995 555 19 90 90
            </a>
          </div>
          <div className="text-center">
            <Navigation className="h-8 w-8 text-gold-500 mx-auto mb-3" />
            <h4 className="font-serif text-lg text-navy-900 mb-2 font-light">Distance from Airport</h4>
            <p className="text-gray-600 font-light">
              Batumi Airport<br />
              ~5 km (10 min drive)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
