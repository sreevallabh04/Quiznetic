import { useEffect, useRef } from 'react';

interface MapData {
  center: [number, number];
  zoom: number;
  marker: [number, number];
  highlightState?: string;
  highlightStates?: string[];
  highlightFeature?: 'river' | 'delta' | 'lake' | 'sea' | 'mountain' | 'peak' | 'city' | 'pass' | 'district' | 'reservoir' | 'forest' | 'country' | 'continent' | 'ocean' | 'capital' | 'desert' | 'historical';
  markerType?: string;
  showBorders?: boolean;
  highlightArea?: string;
  riverName?: string;
  lakeName?: string;
  seaName?: string;
  mountainName?: string;
  peakName?: string;
  cityName?: string;
  stateName?: string;
  passName?: string;
  districtName?: string;
  reservoirName?: string;
  forestName?: string;
  countryName?: string;
  continentName?: string;
  oceanName?: string;
  capitalName?: string;
  desertName?: string;
  neighboringState?: string;
  empireType?: string;
  periodName?: string;
  regionType?: string;
  regionName?: string;
  periodType?: string;
  showModernBoundaries?: boolean;
  stateType?: string;
  territoryType?: string;
  territoryName?: string;
}

interface MapDisplayProps {
  mapData: MapData;
}

export default function MapDisplay({ mapData }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      // @ts-ignore - L is from the global Leaflet script
      mapInstanceRef.current = L.map(mapRef.current).setView(mapData.center, mapData.zoom);

      // Add OpenStreetMap as base layer
      // @ts-ignore - L is from the global Leaflet script
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    } else {
      // Update existing map view
      mapInstanceRef.current.setView(mapData.center, mapData.zoom);
      // Clear existing layers
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer.options && layer.options.pane === 'overlayPane') {
          mapInstanceRef.current.removeLayer(layer);
        }
      });
    }

    // Add marker
    // @ts-ignore - L is from the global Leaflet script
    const marker = L.marker(mapData.marker);

    // Customize marker based on type
    if (mapData.markerType === 'capital') {
      // @ts-ignore - L is from the global Leaflet script
      marker.setIcon(L.divIcon({
        html: '⭐',
        className: 'star-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      }));
    }

    marker.addTo(mapInstanceRef.current);

    // Handle different highlighting based on feature type
    if (mapData.highlightState) {
      // For demonstration, we'll just add a circle around the marker for highlighted states
      // In a full implementation, you would use GeoJSON data for proper state boundaries
      // @ts-ignore - L is from the global Leaflet script
      L.circle(mapData.center, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 100000 // 100km radius
      }).addTo(mapInstanceRef.current);
    }

    if (mapData.highlightFeature) {
      // Similar placeholder for other feature types
      // @ts-ignore - L is from the global Leaflet script
      const circle = L.circle(mapData.marker, {
        color: getFeatureColor(mapData.highlightFeature),
        fillColor: getFeatureColor(mapData.highlightFeature),
        fillOpacity: 0.3,
        radius: getFeatureRadius(mapData.highlightFeature)
      });
      
      // Add a label if appropriate
      const label = getFeatureLabel(mapData);
      if (label) {
        circle.bindTooltip(label, { permanent: true, direction: 'center', className: 'feature-label' });
      }
      
      circle.addTo(mapInstanceRef.current);
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current && !document.body.contains(mapRef.current)) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapData]); // Re-initialize when mapData changes

  return <div ref={mapRef} className="map-container" />;
}

// Helper functions for map features
function getFeatureColor(featureType: string): string {
  const colors: Record<string, string> = {
    river: '#0073e6',
    delta: '#00a651',
    lake: '#29b6f6',
    sea: '#0288d1',
    mountain: '#8b4513',
    peak: '#6a1b9a',
    city: '#f44336',
    pass: '#ff9800',
    district: '#4caf50',
    reservoir: '#00bcd4',
    forest: '#33691e',
    country: '#9c27b0',
    continent: '#3f51b5',
    ocean: '#01579b',
    capital: '#d32f2f',
    desert: '#ffc107',
    historical: '#795548'
  };
  
  return colors[featureType] || '#673ab7'; // Default purple
}

function getFeatureRadius(featureType: string): number {
  const radiusMap: Record<string, number> = {
    river: 50000,
    delta: 75000,
    lake: 40000,
    sea: 300000,
    mountain: 100000,
    peak: 30000,
    city: 25000,
    pass: 15000,
    district: 80000,
    reservoir: 35000,
    forest: 70000,
    country: 500000,
    continent: 1000000,
    ocean: 1000000,
    capital: 50000,
    desert: 400000,
    historical: 200000
  };
  
  return radiusMap[featureType] || 100000; // Default 100km
}

function getFeatureLabel(mapData: MapData): string {
  if (mapData.highlightFeature === 'river' && mapData.riverName) {
    return capitalizeFirstLetter(mapData.riverName.replace('_', ' ')) + ' River';
  }
  
  if (mapData.highlightFeature === 'lake' && mapData.lakeName) {
    return capitalizeFirstLetter(mapData.lakeName.replace('_', ' ')) + ' Lake';
  }
  
  if (mapData.highlightFeature === 'city' && mapData.cityName) {
    return capitalizeFirstLetter(mapData.cityName.replace('_', ' '));
  }
  
  if (mapData.highlightFeature === 'historical' && mapData.empireType) {
    return capitalizeFirstLetter(mapData.empireType.replace('_', ' ')) + ' Empire';
  }
  
  return '';
}

function capitalizeFirstLetter(string: string): string {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}