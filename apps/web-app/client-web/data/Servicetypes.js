// import {
//   Building2,
//   Home,
//   Sparkles,
//   Wrench,
//   Sofa,
//   Shirt,
//   Bug,
//   SprayCan,
//   Hammer,
// } from "lucide-react";
// const services = {
//   commercial: {
//     icon: Building2,
//     title: "Commercial",
//     description: "Office buildings, retail spaces, and commercial properties",
//     features: [
//       {
//         id: "office-cleaning",
//         title: "Office Cleaning",
//         description: "Routine and deep cleaning of office spaces",
//         icon: Wrench,
//       },
//       {
//         id: "post-construction",
//         title: "Post Construction",
//         description: "Cleanup after construction or renovations",
//         icon: Hammer,
//       },
//       {
//         id: "institution-cleaning",
//         title: "Institution Cleaning",
//         description:
//           "Cleaning services for schools, hospitals, and institutions",
//         icon: Sparkles,
//       },
//     ],
//   },
//   residential: {
//     icon: Home,
//     title: "Residential",
//     description: "Homes, apartments, and residential properties",
//     features: [
//       {
//         id: "deep-cleaning",
//         title: "Deep Cleaning",
//         description: "Comprehensive cleaning for every corner of your home",
//         icon: Sparkles,
//       },
//       {
//         id: "move-in-out",
//         title: "Move-in/Move-out",
//         description: "Perfect clean for moving transitions",
//         icon: Home,
//       },
//       {
//         id: "regular-maintenance",
//         title: "Regular Maintenance / General Cleaning",
//         description: "Weekly or bi-weekly home upkeep cleaning",
//         icon: Wrench,
//       },
//       {
//         id: "specific-room-cleaning",
//         title: "Specific Room / Area Cleaning",
//         description: "Targeted cleaning for kitchens, bathrooms, etc.",
//         icon: Home,
//       },
//       {
//         id: "regular-cleaning",
//         title: "Regular Cleaning",
//         description: "Scheduled general house cleaning",
//         icon: Wrench,
//       },
//     ],
//   },
//   upholstery: {
//     icon: Sofa,
//     title: "Upholstery & Carpet Cleaning",
//     description: "Fabric, carpet, and furniture cleaning services",
//     features: [
//       {
//         id: "standard-sofa-cleaning",
//         title: "Standard Sofa-set Cleaning",
//         description: "General cleaning for fabric sofa sets",
//         icon: Sofa,
//       },
//       {
//         id: "leather-sofa-cleaning",
//         title: "Leather Sofa-set Cleaning",
//         description: "Gentle cleaning for leather sofas",
//         icon: Sofa,
//       },
//       {
//         id: "carpet-cleaning",
//         title: "Carpet Cleaning",
//         description: "Deep and steam carpet cleaning",
//         icon: Sparkles,
//       },
//       {
//         id: "steam-cleaning",
//         title: "Steam Cleaning",
//         description: "Hot steam treatment for fabrics and carpets",
//         icon: SprayCan,
//       },
//       {
//         id: "stain-removal",
//         title: "Stain Removal",
//         description: "Removing tough stains from upholstery and rugs",
//         icon: Wrench,
//       },
//       {
//         id: "deodorizing",
//         title: "Deodorizing",
//         description: "Freshens fabric and eliminates odors",
//         icon: Sparkles,
//       },
//     ],
//   },
//   laundry: {
//     icon: Shirt,
//     title: "Laundry Service",
//     description: "Professional laundry and folding services",
//     features: [
//       {
//         id: "washing",
//         title: "Washing",
//         description: "Standard washing of clothes and linens",
//         icon: Shirt,
//       },
//       {
//         id: "wash-and-fold",
//         title: "Wash & Fold",
//         description: "Washed, dried, and neatly folded laundry",
//         icon: Shirt,
//       },
//       {
//         id: "ironing",
//         title: "Ironing",
//         description: "Professional pressing of clothes",
//         icon: Wrench,
//       },
//       {
//         id: "leather-cleaning",
//         title: "Leather Cleaning",
//         description: "Special treatment for leather garments",
//         icon: SprayCan,
//       },
//     ],
//   },
//   pestControl: {
//     icon: Bug,
//     title: "Pest Control",
//     description: "Safe and effective pest removal services",
//     features: [
//       {
//         id: "termites",
//         title: "Termites",
//         description: "Extermination of termites in homes and wood structures",
//         icon: Bug,
//       },
//       {
//         id: "rodents",
//         title: "Rodents",
//         description: "Safe removal of rats and mice",
//         icon: Bug,
//       },
//       {
//         id: "insects",
//         title: "Insects",
//         description: "Elimination of crawling and flying insects",
//         icon: SprayCan,
//       },
//       {
//         id: "fumigation",
//         title: "Fumigation",
//         description: "Comprehensive space fumigation to eliminate pests",
//         icon: SprayCan,
//       },
//     ],
//   },
//   sanitation: {
//     icon: Sparkles,
//     title: "Sanitation & Hygiene Services",
//     description: "Deep sanitation for homes and businesses",
//     features: [
//       {
//         id: "disinfection",
//         title: "Disinfection",
//         description: "Eliminating bacteria and viruses from surfaces",
//         icon: Sparkles,
//       },
//       {
//         id: "hygiene-audits",
//         title: "Hygiene Audits",
//         description: "Professional assessment of hygiene levels",
//         icon: Wrench,
//       },
//       {
//         id: "decontamination",
//         title: "Decontamination",
//         description: "Sanitizing spaces after biological or chemical exposure",
//         icon: SprayCan,
//       },
//     ],
//   },
// };

// export { services };

// serviceTypes.js
import {
  Home,
  Wrench,
  Sparkles,
  Shirt,
  Sofa,
  SprayCan,
  Hammer,
  Building2,
} from "lucide-react";

// Map icon names from API to lucide-react icons
const iconMap = {
  home: Home,
  wrench: Wrench,
  sparkles: Sparkles,
  shirt: Shirt,
  sofa: Sofa,
  spraycan: SprayCan,
  hammer: Hammer,
  "pest-control": SprayCan,
  laundry: Sparkles,
  sanitation: Home,
  commercial: Building2,
};

// Transform API data into frontend-friendly format
export function transformServices(apiData) {
  const transformed = apiData.map((service) => {
    const IconComponent = iconMap[service.icon_name?.toLowerCase()] || null;

    // Transform features
    const features = service.features.map((feature) => {
      const FeatureIcon = iconMap[feature.icon_name?.toLowerCase()] || null;
      return {
        ...feature,
        icon: FeatureIcon,
      };
    });

    return {
      ...service,
      icon: IconComponent,
      features,
    };
  });

  // Debug log without stringifying functions
  console.log("✅ Transformed Services:");
  transformed.forEach((s) => {
    console.log(
      `Service: ${s.title} → Icon: ${
        s.icon?.displayName || s.icon?.name || "❌"
      }`,
      "\nFeatures:",
      s.features.map(
        (f) => `${f.title} → ${f.icon?.displayName || f.icon?.name || "❌"}`
      )
    );
  });

  return transformed;
}
