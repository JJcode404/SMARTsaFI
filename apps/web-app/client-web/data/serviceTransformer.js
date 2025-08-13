// // servicesTransformer.js
// import { iconMap } from "./iconMap";
// import { Home, Wrench } from "lucide-react"; // ✅ Add missing imports

// const transformServices = (apiData) => {
//   return apiData.map((service) => ({
//     ...service,
//     icon: iconMap[service.icon_name] || Home, // fallback if not found
//     features: service.features.map((feature) => ({
//       ...feature,
//       icon: iconMap[feature.icon_name] || Wrench, // fallback if not found
//       options: feature.options || [],
//     })),
//   }));
// };

// export { transformServices };

// servicesTransformer.js

import { iconMap } from "./iconMap";
import { Home, Wrench } from "lucide-react";

const transformServices = (apiData) => {
  return apiData.map((service) => {
    const iconKey = service.icon_name?.toLowerCase() || "";

    if (!iconMap[iconKey]) {
      console.warn(`Missing service icon for key: "${iconKey}"`);
    }

    const transformedService = {
      ...service,
      icon: iconMap[iconKey] || Home,
      features: service.features.map((feature) => {
        const featureIconKey = feature.icon_name?.toLowerCase() || "";

        if (!iconMap[featureIconKey]) {
          console.warn(`Missing feature icon for key: "${featureIconKey}"`);
        }

        return {
          ...feature,
          icon: iconMap[featureIconKey] || Wrench,
          options: feature.options || [],
        };
      }),
    };

    console.log(`Transformed service:`, {
      title: transformedService.title,
      icon:
        transformedService.icon?.displayName || transformedService.icon?.name,
      features: transformedService.features.map((f) => ({
        title: f.title,
        icon: f.icon?.displayName || f.icon?.name,
      })),
    });

    return transformedService;
  });
};

const transformFeatures = (apiResponse) => {
  // Handle different possible response structures
  let featuresData;

  if (Array.isArray(apiResponse)) {
    featuresData = apiResponse;
  } else if (apiResponse && Array.isArray(apiResponse.features)) {
    featuresData = apiResponse.features;
  } else if (apiResponse && Array.isArray(apiResponse.data)) {
    featuresData = apiResponse.data;
  } else {
    console.error("Invalid features data structure:", apiResponse);
    return []; // Return empty array to prevent crash
  }

  return featuresData.map((feature) => {
    const iconKey = feature.icon_name?.toLowerCase().trim() || "";
    return {
      ...feature,
      icon: iconMap[iconKey] || Wrench,
      options: feature.options || [],
    };
  });
};

export { transformServices, transformFeatures };
