import type { Vendor } from '../Types/vendor';

export const MOCK_VENDORS: Vendor[] = [
    // Floral
    {
        id: 'v1',
        name: 'Floral Dreams',
        description: 'Elegant floral arrangements and luxury décor to set the perfect mood for your celebration.',
        services: ['Exotic Flowers', 'Stage Backdrop', 'Car Decoration'],
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=100&w=1920',
        rating: 4.9,
        reviewCount: 450,
        priceRange: '₹50,000+',
        location: 'Mumbai, India',
        sectorId: 'floral'
    },
    {
        id: 'v7',
        name: 'Bloom & Wild',
        description: 'Bespoke European-style floral design focusing on sustainable and seasonal blooms.',
        services: ['Sustainable Florals', 'Bridal Bouquets', 'Table Runners'],
        image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=100&w=1920',
        rating: 4.7,
        reviewCount: 180,
        priceRange: '₹40,000+',
        location: 'Bangalore, India',
        sectorId: 'floral'
    },
    {
        id: 'v8',
        name: 'The Petal Pushers',
        description: 'Avant-garde floral installations and massive flower walls for high-end celebrity weddings.',
        services: ['Flower Walls', 'Ceiling Hangings', 'Theme Styling'],
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=100&w=1920',
        rating: 5.0,
        reviewCount: 210,
        priceRange: '₹2,00,000+',
        location: 'Mumbai, India',
        sectorId: 'floral'
    },
    // Coordination
    {
        id: 'v2',
        name: 'Royal Coordination',
        description: 'Stress-free wedding planning with end-to-end management and vendor handling.',
        services: ['On-day Coordination', 'Budget Management', 'Vendor Sourcing'],
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=100&w=1920',
        rating: 4.8,
        reviewCount: 120,
        priceRange: '₹1,50,000+',
        location: 'Delhi, India',
        sectorId: 'coordination'
    },
    {
        id: 'v9',
        name: 'Elite Events',
        description: 'Specializing in destination weddings with a focus on logistics and legal compliance.',
        services: ['Destination Planning', 'Concierge', 'Guest Management'],
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=100&w=1920',
        rating: 4.9,
        reviewCount: 95,
        priceRange: '₹3,00,000+',
        location: 'Goa, India',
        sectorId: 'coordination'
    },
    {
        id: 'v10',
        name: 'Plan-It Perfect',
        description: 'Modern, tech-driven coordination services for the contemporary, hands-on couple.',
        services: ['Digital Planning', 'RSVP Tracking', 'Virtual Tours'],
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=100&w=1920',
        rating: 4.6,
        reviewCount: 155,
        priceRange: '₹80,000+',
        location: 'Pune, India',
        sectorId: 'coordination'
    },
    // Photography
    {
        id: 'v3',
        name: 'Cinematic Visuals',
        description: 'Professional wedding films and photography that capture every raw emotion of your special day.',
        services: ['4K Video', 'Candid Photography', 'Drone Coverage'],
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=100&w=1920',
        rating: 5.0,
        reviewCount: 310,
        priceRange: '₹3,00,000+',
        location: 'Mumbai, India',
        sectorId: 'photography'
    },
    {
        id: 'v11',
        name: 'Golden Hour Films',
        description: 'Fine-art wedding photography focusing on natural light and timeless aesthetic.',
        services: ['Natural Light', 'Film Photography', 'Album Design'],
        image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=100&w=1920',
        rating: 4.9,
        reviewCount: 220,
        priceRange: '₹1,80,000+',
        location: 'Jaipur, India',
        sectorId: 'photography'
    },
    {
        id: 'v12',
        name: 'Studio 99',
        description: 'Fast-turnaround event coverage for modern, social-media savvy couples.',
        services: ['Same-day Edit', 'Social Content', 'Photo Booths'],
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=100&w=1920',
        rating: 4.7,
        reviewCount: 140,
        priceRange: '₹1,20,000+',
        location: 'Bangalore, India',
        sectorId: 'photography'
    },
    // Makeup
    {
        id: 'v4',
        name: 'Graceful Glam',
        description: 'Expert makeup artistry specializing in premium bridal looks and traditional ethnic styles.',
        services: ['Bridal Makeup', 'Hairstyling', 'Guest Makeup'],
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=100&w=1920',
        rating: 4.9,
        reviewCount: 185,
        priceRange: '₹25,000+',
        location: 'Bangalore, India',
        sectorId: 'makeup'
    },
    {
        id: 'v13',
        name: 'Midas Touch',
        description: 'International celebrity makeup artist specialized in high-definition airbrush techniques.',
        services: ['Airbrush', 'Contouring', 'Skin Prep'],
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=100&w=1920',
        rating: 5.0,
        reviewCount: 75,
        priceRange: '₹60,000+',
        location: 'Dubai / Mumbai',
        sectorId: 'makeup'
    },
    // Invitations
    {
        id: 'v5',
        name: 'Classic Invites',
        description: 'Exquisite, hand-crafted wedding invitations and personalized wedding stationery sets.',
        services: ['Digital Invites', 'Box Stationery', 'Hand-calligraphy'],
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=100&w=1920',
        rating: 4.7,
        reviewCount: 95,
        priceRange: '₹200/Card',
        location: 'Pune, India',
        sectorId: 'invitations'
    },
    {
        id: 'v14',
        name: 'The Invite Co',
        description: 'Architecting traditional luxury into modern digital invitation experiences.',
        services: ['Video Invites', 'Custom Logos', 'Website RSVP'],
        image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=100&w=1920',
        rating: 4.8,
        reviewCount: 220,
        priceRange: '₹15,000 (Flat)',
        location: 'Online',
        sectorId: 'invitations'
    },
    // Catering
    {
        id: 'v6',
        name: 'Gourmet Feast',
        description: 'A luxurious culinary experience with diverse international and local menu options.',
        services: ['Multi-cuisine', 'Signature Cocktails', 'Dessert Bars'],
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=100&w=1920',
        rating: 4.8,
        reviewCount: 420,
        priceRange: '₹1,500/Plate',
        location: 'Mumbai, India',
        sectorId: 'catering'
    },
    {
        id: 'v15',
        name: 'Savor & Spice',
        description: 'Authentic regional cuisines focusing on traditional flavors and immersive live cooking setups.',
        services: ['Regional Cuisine', 'Live Kitchen', 'Trained Stewards'],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=100&w=1920',
        rating: 4.9,
        reviewCount: 280,
        priceRange: '₹1,200/Plate',
        location: 'Ahmedabad, India',
        sectorId: 'catering'
    },
    {
        id: 'v16',
        name: 'Grand Banquet',
        description: 'Specializing in massive events with high-volume catering, maintaining consistent gourmet quality.',
        services: ['Bulk Catering', 'High Volume', 'Elite Service'],
        image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=100&w=1920',
        rating: 4.5,
        reviewCount: 650,
        priceRange: '₹2,000/Plate',
        location: 'Delhi, India',
        sectorId: 'catering'
    }
];
