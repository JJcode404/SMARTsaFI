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
    badges: ["Verified", "Reliable", "Punctual"],
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
  {
    id: 5,
    name: "Grace Wanjiku",
    type: "individual",
    location: "Karen, Nairobi",
    rating: 4.8,
    reviewCount: 67,
    description:
      "Experienced domestic worker specializing in elderly and childcare-friendly cleaning.",
    profileImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    ],
    services: [
      {
        name: "Elderly Care Cleaning",
        price: "KSH 2,800",
        duration: "3 hours",
      },
      { name: "Baby-Safe Cleaning", price: "KSH 3,200", duration: "3 hours" },
      { name: "Weekly Maintenance", price: "KSH 2,000", duration: "2 hours" },
    ],
    contact: {
      phone: "+254 722 555 888",
      email: "grace.wanjiku@gmail.com",
      hours: "Mon-Sat: 7:00 AM - 4:00 PM",
    },
    badges: ["Verified", "Child-Safe", "Trusted"],
    experience: "5 years",
    completedJobs: 320,
    responseTime: "< 2 hours",
    reviews: [
      {
        id: 1,
        name: "Sarah Mitchell",
        rating: 5,
        date: "1 week ago",
        comment: "Grace is wonderful with kids and keeps our home spotless!",
        avatar:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 6,
    name: "CleanMate Services",
    type: "organization",
    location: "Westlands, Nairobi",
    rating: 4.5,
    reviewCount: 89,
    description:
      "Tech-enabled cleaning service with app booking and real-time tracking.",
    profileImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=300&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    ],
    services: [
      { name: "Smart Home Cleaning", price: "KSH 4,500", duration: "4 hours" },
      { name: "Move-in/Move-out", price: "KSH 8,000", duration: "6 hours" },
      { name: "One-time Deep Clean", price: "KSH 5,500", duration: "5 hours" },
    ],
    contact: {
      phone: "+254 700 333 777",
      email: "hello@cleanmate.co.ke",
      hours: "24/7 App Support",
    },
    badges: ["Tech-Enabled", "Insured", "Same-Day"],
    experience: "3 years",
    completedJobs: 650,
    responseTime: "< 30 minutes",
    reviews: [
      {
        id: 1,
        name: "Michael Ochieng",
        rating: 4,
        date: "4 days ago",
        comment: "Love the app tracking feature. Very convenient service.",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 7,
    name: "Peter Kimani",
    type: "individual",
    location: "Kasarani, Nairobi",
    rating: 4.7,
    reviewCount: 34,
    description: "Window cleaning specialist and exterior maintenance expert.",
    profileImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop",
      "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg",
    ],
    services: [
      { name: "Window Cleaning", price: "KSH 1,800", duration: "2 hours" },
      { name: "Exterior Washing", price: "KSH 3,500", duration: "4 hours" },
      { name: "Gutter Cleaning", price: "KSH 2,200", duration: "3 hours" },
    ],
    contact: {
      phone: "+254 715 444 222",
      email: "peter.windows@yahoo.com",
      hours: "Mon-Sat: 6:00 AM - 6:00 PM",
    },
    badges: ["Window Expert", "Reliable"],
    experience: "4 years",
    completedJobs: 180,
    responseTime: "< 3 hours",
    reviews: [
      {
        id: 1,
        name: "Jennifer Mwangi",
        rating: 5,
        date: "5 days ago",
        comment: "Windows are crystal clear! Peter is very professional.",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 8,
    name: "EcoClean Kenya",
    type: "organization",
    location: "Lavington, Nairobi",
    rating: 4.8,
    reviewCount: 156,
    description:
      "Environmentally conscious cleaning using eco-friendly products and methods.",
    profileImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1558618047-d1cd3c4a4f0f?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
    ],
    services: [
      { name: "Eco Deep Clean", price: "KSH 4,200", duration: "4 hours" },
      { name: "Green Office Clean", price: "KSH 7,500", duration: "5 hours" },
      {
        name: "Chemical-Free Sanitization",
        price: "KSH 3,800",
        duration: "3 hours",
      },
    ],
    contact: {
      phone: "+254 738 999 111",
      email: "info@ecoclean.co.ke",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
    },
    badges: ["Eco-Friendly", "Licensed", "Health-Safe", "Premium"],
    experience: "7 years",
    completedJobs: 1250,
    responseTime: "< 2 hours",
    reviews: [
      {
        id: 1,
        name: "Dr. Anne Mutua",
        rating: 5,
        date: "1 day ago",
        comment:
          "Love that they use non-toxic products. Great for my family's health!",
        avatar:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 9,
    name: "Mary Akinyi",
    type: "individual",
    location: "Embakasi, Nairobi",
    rating: 4.4,
    reviewCount: 28,
    description:
      "Budget-friendly cleaner perfect for students and small apartments.",
    profileImage:
      "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=300&h=300&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    ],
    services: [
      { name: "Basic Cleaning", price: "KSH 1,500", duration: "2 hours" },
      { name: "Student Special", price: "KSH 1,000", duration: "1.5 hours" },
      { name: "Kitchen Deep Clean", price: "KSH 2,000", duration: "2.5 hours" },
    ],
    contact: {
      phone: "+254 712 777 333",
      email: "mary.akinyi@gmail.com",
      hours: "Flexible - Call ahead",
    },
    badges: ["Budget-Friendly", "Student Rates"],
    experience: "1.5 years",
    completedJobs: 85,
    responseTime: "< 6 hours",
    reviews: [
      {
        id: 1,
        name: "John Ouma",
        rating: 4,
        date: "1 week ago",
        comment: "Great value for money. Mary is hardworking and honest.",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: 10,
    name: "Prestige Cleaning Co.",
    type: "organization",
    location: "Upper Hill, Nairobi",
    rating: 4.9,
    reviewCount: 287,
    description:
      "Corporate cleaning specialists serving Fortune 500 companies and luxury residences.",
    profileImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop",
    ],
    services: [
      {
        name: "Corporate Office Cleaning",
        price: "KSH 12,000",
        duration: "8 hours",
      },
      {
        name: "Executive Residence",
        price: "KSH 18,000",
        duration: "Full Day",
      },
      {
        name: "Event Venue Cleaning",
        price: "KSH 25,000",
        duration: "10 hours",
      },
    ],
    contact: {
      phone: "+254 720 100 200",
      email: "corporate@prestigeclean.co.ke",
      hours: "24/7 Corporate Support",
    },
    badges: ["Premium", "Corporate", "Licensed", "Insured", "ISO Certified"],
    experience: "12 years",
    completedJobs: 2100,
    responseTime: "< 30 minutes",
    reviews: [
      {
        id: 1,
        name: "Robert Kiprotich",
        rating: 5,
        date: "2 days ago",
        comment:
          "Exceptional service for our corporate offices. Highly professional team.",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
];

export { serviceProviders };
