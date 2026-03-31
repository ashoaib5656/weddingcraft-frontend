export interface Vendor {
    id: string;
    name: string;
    description: string;
    services: string[];
    image: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    location: string;
    sectorId: string;
}

export interface VendorSector {
    id: string;
    name: string;
    icon: string;
    description: string;
}
