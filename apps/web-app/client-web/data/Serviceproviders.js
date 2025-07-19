const serviceProviders = [
  {
    id: 1,
    name: "Nkatha Ivy",
    type: "individual",
    location: "Rongai, Kajiado",
    rating: 4.9,
    reviewCount: 89,
    description:
      "Freelance housekeeper known for top-tier deep cleaning and organizing skills.",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop",
    gallery: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop",
    ],
    services: [
      { name: "Deep Cleaning", price: "KSH 3,000", duration: "3 hours" },
      { name: "Laundry & Folding", price: "KSH 1,200", duration: "2 hours" },
    ],
    contact: {
      phone: "+254 710 987 654",
      email: "martha.cleaning@gmail.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    },
    badges: ["Verified", "Reliable"],
    experience: "3 years",
    completedJobs: 270,
    responseTime: "< 1 hour",
    reviews: [
      {
        id: 1,
        name: "Daniel Otieno",
        rating: 5,
        date: "3 days ago",
        comment: "Martha is meticulous and fast. I recommend her highly!",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 2,
    name: "SparklePro Cleaners",
    type: "organization",
    location: "Ngong Road, Nairobi",
    rating: 4.7,
    reviewCount: 150,
    description:
      "Affordable and efficient cleaning services for homes and businesses.",
    profileImage:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&h=300&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
    ],
    services: [
      { name: "Office Cleaning", price: "KSH 6,000", duration: "5 hours" },
      { name: "Window Washing", price: "KSH 2,500", duration: "3 hours" },
    ],
    contact: {
      phone: "+254 728 123 321",
      email: "support@sparklepro.co.ke",
      hours: "Mon-Sat: 8:00 AM - 7:00 PM",
    },
    badges: ["Licensed", "Insured", "Top Rated"],
    experience: "6 years",
    completedJobs: 900,
    responseTime: "< 3 hours",
    reviews: [
      {
        id: 1,
        name: "Linda Kamau",
        rating: 5,
        date: "1 week ago",
        comment: "Great communication and spotless results!",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b8e5?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 3,
    name: "Simon James",
    type: "individual",
    location: "Mirema Road, Nairobi",
    rating: 4.6,
    reviewCount: 45,
    description:
      "Hardworking cleaner specialized in carpet and upholstery services.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    gallery: [
      "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    ],
    services: [
      { name: "Carpet Cleaning", price: "KSH 2,000", duration: "2 hours" },
      { name: "Sofa Shampooing", price: "KSH 3,000", duration: "2-3 hours" },
    ],
    contact: {
      phone: "+254 701 222 222",
      email: "mungai.kevin@yahoo.com",
      hours: "Flexible hours",
    },
    badges: ["Reliable"],
    experience: "2 years",
    completedJobs: 130,
    responseTime: "< 4 hours",
    reviews: [
      {
        id: 1,
        name: "Brenda Achieng",
        rating: 4,
        date: "2 weeks ago",
        comment:
          "Carpets were spotless. Slight delay but good results overall.",
        avatar:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 4,
    name: "Elite Clean Group",
    type: "organization",
    location: "Runda, Nairobi",
    rating: 4.9,
    reviewCount: 202,
    description:
      "Premium cleaning solutions for luxury apartments and offices.",
    profileImage:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&h=300&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop",
    ],
    services: [
      {
        name: "Luxury Apartment Cleaning",
        price: "KSH 10,000",
        duration: "6 hours",
      },
      {
        name: "Post-Construction Cleanup",
        price: "KSH 15,000",
        duration: "Full Day",
      },
    ],
    contact: {
      phone: "+254 733 111 444",
      email: "elite@cleangroup.co.ke",
      hours: "Mon-Fri: 7:00 AM - 6:00 PM",
    },
    badges: ["Verified", "Premium", "Licensed", "Insured"],
    experience: "8 years",
    completedJobs: 1100,
    responseTime: "< 1 hour",
    reviews: [
      {
        id: 1,
        name: "Mark Njuguna",
        rating: 5,
        date: "5 days ago",
        comment: "Flawless work. Worth every shilling!",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
];

export { serviceProviders };
