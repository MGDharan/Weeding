export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  photo?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  iconName: 'Sparkles' | 'Sun' | 'Heart' | 'Crown' | 'GlassWater' | 'Music';
  googleMapsUrl: string;
  dressCode?: string;
  highlight?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'all' | 'couple' | 'traditional' | 'candid';
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface WeddingConfig {
  music: {
    title: string;
    subtitle: string;
    audioUrl: string;
    audioUrlFallback: string;
  };
  couple: {
    brideName: string;
    brideFullName: string;
    brideTitle: string;
    groomName: string;
    groomFullName: string;
    groomTitle: string;
    invitationSubtitle: string;
    tagline: string;
    bioParagraph: string;
    quote: string;
    initials: string;
  };
  weddingDate: string; // ISO string for countdown calculation
  displayDate: string;
  displayTime: string;
  venue: {
    name: string;
    address: string;
    cityState: string;
    googleMapsUrl: string;
    mapEmbedUrl: string;
  };
  mainCeremony: {
    title: string;
    subtitle: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    googleMapsUrl: string;
    photo: string;
  };
  families: {
    bride: {
      title: string;
      parents: string;
      grandparents?: string;
    };
    groom: {
      title: string;
      parents: string;
      grandparents?: string;
    };
  };
  story: Milestone[];
  events: WeddingEvent[];
  gallery: GalleryPhoto[];
  rsvp: {
    deadline: string;
    dietaryOptions: string[];
    contactPhone?: string;
    contactEmail?: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    brideName: "Praveena",
    brideFullName: "N. Praveena, B.Pharm.",
    brideTitle: "Pharmacist (B.Pharm)",
    groomName: "Muralidharan",
    groomFullName: "Dr. M. Muralidharan",
    groomTitle: "Doctor (MBBS)",
    invitationSubtitle: "Together with their families",
    tagline: "We invite you to celebrate our wedding",
    bioParagraph: "Some stories are written in books. Some are written in the stars. Ours was written by our families — a Doctor and a Pharmacist, two hearts brought together by tradition, love, and the prayers of our elders. And now, our forever begins.",
    quote: "And so, our forever begins...",
    initials: "M & P",
  },
  weddingDate: "2026-08-23T09:00:00",
  displayDate: "Sunday, 23rd August 2026",
  displayTime: "9:00 AM – 10:30 AM",
  venue: {
    name: "A1 Mahal",
    address: "Near Vaani Bus Stop",
    cityState: "Ramanathapuram, Tamil Nadu",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=A1+Mahal+Near+Vaani+Bus+Stop+Ramanathapuram+Tamil+Nadu",
    mapEmbedUrl: "https://maps.google.com/maps?q=A1+Mahal+Ramanathapuram+Tamil+Nadu&z=15&output=embed",
  },
  mainCeremony: {
    title: "Join Us As We Begin Forever",
    subtitle: "Wedding Ceremony & Muhurtham",
    date: "Sunday, 23rd August 2026",
    time: "9:00 AM – 10:30 AM",
    venue: "A1 Mahal, Near Vaani Bus Stop",
    address: "Ramanathapuram, Tamil Nadu",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=A1+Mahal+Near+Vaani+Bus+Stop+Ramanathapuram+Tamil+Nadu",
    photo: "/photos/photo-3.jpg",
  },
  families: {
    bride: {
      title: "Bride's Family",
      parents: "Mr. T. Nathan & Mrs. Jothi",
      grandparents: "With the blessings of our beloved elders",
    },
    groom: {
      title: "Groom's Family",
      parents: "Mr. S. Mohandoss & Mrs. Jeyanthimalar",
      grandparents: "With the blessings of our beloved elders",
    },
  },
  story: [
    {
      id: "1",
      date: "Summer 2026",
      title: "When Our Families Met",
      description: "It began with a simple yet heartfelt conversation between our families. With trust, tradition, and the blessings of our parents, our paths were gently brought together in search of a lifelong companion.",
      photo: "/photos/photo-1.jpg"
    },
    {
      id: "2",
      date: "August 2026",
      title: "Two Hearts, One Path",
      description: "Through respectful conversations and shared values, we discovered the warmth, kindness, and dreams that would unite us. Guided by our families' love, every moment together felt beautifully right.",
      photo: "/photos/photo-2.jpg"
    },
    {
      id: "3",
      date: "August 23, 2026",
      title: "The Sacred Wedding",
      description: "On this auspicious day, under the blessings of the divine and our families, we tie the Thirumangalyam and take the sacred steps of marriage — beginning our journey as husband and wife.",
      photo: "/photos/photo-6.jpg"
    }
  ],
  events: [
    {
      id: "wedding",
      name: "Wedding Ceremony (Muhurtham)",
      subtitle: "Kanyadaanam & Mangalya Dharanam",
      date: "Sunday, 23rd August 2026",
      time: "9:00 AM – 10:30 AM",
      venue: "A1 Mahal, Near Vaani Bus Stop",
      address: "Ramanathapuram, Tamil Nadu",
      description: "Witness the sacred Kanyadaanam and the tying of the Thirumangalyam, as Praveena and Muralidharan take their vows under the auspicious Muhurtham, blessed by family and friends.",
      iconName: "Crown",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=A1+Mahal+Near+Vaani+Bus+Stop+Ramanathapuram+Tamil+Nadu",
      dressCode: "Traditional South Indian Attire",
      highlight: true
    },
    {
      id: "reception",
      name: "Grand Wedding Reception",
      subtitle: "Celebrations, Dinner & Blessings",
      date: "Sunday, 23rd August 2026",
      time: "6:00 PM Onwards",
      venue: "Raj Mahal, Panthappa Nagar",
      address: "Ramanathapuram, Tamil Nadu",
      description: "Join us in the evening as we celebrate the newlyweds with dinner, joyful conversations, and the warm blessings of all our loved ones.",
      iconName: "GlassWater",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Raj+Mahal+Panthappa+Nagar+Ramanathapuram+Tamil+Nadu",
      dressCode: "Formal / Semi-Formal Attire"
    }
  ],
  gallery: [
    {
      id: "photo-1",
      url: "/photos/photo-1.jpg",
      title: "Romantic Portrait",
      category: "couple",
      aspectRatio: "tall"
    },
    {
      id: "photo-2",
      url: "/photos/photo-2.jpg",
      title: "Golden Hour Moments",
      category: "couple",
      aspectRatio: "square"
    },
    {
      id: "photo-3",
      url: "/photos/photo-3.jpg",
      title: "Traditional Splendor",
      category: "traditional",
      aspectRatio: "tall"
    },
    {
      id: "photo-4",
      url: "/photos/photo-4.jpg",
      title: "Cherished Embrace",
      category: "couple",
      aspectRatio: "wide"
    },
    {
      id: "photo-5",
      url: "/photos/photo-5.jpg",
      title: "Engagement Celebration",
      category: "candid",
      aspectRatio: "square"
    },
    {
      id: "photo-6",
      url: "/photos/photo-6.jpg",
      title: "Forever Begins",
      category: "traditional",
      aspectRatio: "tall"
    },
    {
      id: "photo-7",
      url: "/photos/photo-7.jpg",
      title: "Laughter & Joy",
      category: "candid",
      aspectRatio: "wide"
    },
    {
      id: "photo-8",
      url: "/photos/photo-8.jpg",
      title: "Royal Portrait",
      category: "couple",
      aspectRatio: "tall"
    }
  ],
  music: {
    title: "Sacred Union Melody",
    subtitle: "Traditional Nadaswaram & Thavil Harmony",
    audioUrl: "/audio/wedding-theme.mp3",
    audioUrlFallback: "/audio/wedding-theme.m4a"
  },
  rsvp: {
    deadline: "August 20, 2026",
    dietaryOptions: [
      "Pure Vegetarian (South Indian)",
      "Non-Vegetarian (South Indian)",
      "No Specific Preferences"
    ],
    contactPhone: "+91 96776 67687",
    contactEmail: "luciferxen404@gmail.com"
  }
};