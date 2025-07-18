import { useState, useMemo } from "react";
import "./serviceProviderViewPage.css";
import { Star, User, MapPin, Users, Search } from "lucide-react";
import { Bookingheader } from "../booking/header";
const ServiceProvidersScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample data for service providers
  const serviceProviders = [
    {
      id: 1,
      name: "CleanPro Solutions",
      type: "organization",
      location: "Westlands, Nairobi",
      rating: 4.8,
      reviewCount: 127,
      description:
        "Professional commercial and residential cleaning services with eco-friendly products",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Nkatha Ivy",
      type: "individual",
      location: "Kilimani, Nairobi",
      rating: 4.9,
      reviewCount: 89,
      description:
        "Experienced house cleaner specializing in deep cleaning and organization",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    },
    {
      id: 3,
      name: "Sparkle & Shine Ltd",
      type: "organization",
      location: "Karen, Nairobi",
      rating: 4.7,
      reviewCount: 203,
      description: "Premium cleaning services for luxury homes and offices",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Simon James",
      type: "individual",
      location: "Lavington, Nairobi",
      rating: 4.6,
      reviewCount: 56,
      description: "Reliable and thorough cleaning with attention to detail",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    },
    {
      id: 5,
      name: "EcoClean Kenya",
      type: "organization",
      location: "Parklands, Nairobi",
      rating: 4.9,
      reviewCount: 156,
      description:
        "100% eco-friendly cleaning solutions for environmentally conscious clients",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 6,
      name: "Grace Nyokabi",
      type: "individual",
      location: "Runda, Nairobi",
      rating: 4.8,
      reviewCount: 74,
      description:
        "Professional house cleaning with flexible scheduling options",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    },
    {
      id: 7,
      name: "QuickClean Services",
      type: "organization",
      location: "Upperhill, Nairobi",
      rating: 4.5,
      reviewCount: 92,
      description:
        "Fast and efficient cleaning services for busy professionals",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 8,
      name: "Peter Kimani",
      type: "individual",
      location: "Eastleigh, Nairobi",
      rating: 4.7,
      reviewCount: 41,
      description: "Affordable and quality cleaning services for all budgets",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    },
  ];

  // Filter and search logic
  const filteredProviders = useMemo(() => {
    let filtered = serviceProviders;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((provider) => provider.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          provider.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, filterType]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <>
      <Bookingheader />
      <div className="container">
        {/* Header */}
        <div className="progressSection">
          <div className="progressContent">
            <div className="progressHeader">
              <h1 className="styles.progressTitle">Browse Service Providers</h1>
              <p className="styles.progressSubtitle">
                Find trusted cleaning professionals in your area
              </p>
            </div>
          </div>
        </div>

        <div className="mainContent">
          {/* Search Bar */}
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Search providers by name, location, or service..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <div className="filterContainer">
            <button
              onClick={() => setFilterType("all")}
              className={`filterButton ${filterType === "all" ? "active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("individual")}
              className={`filterButton ${
                filterType === "individual" ? "active" : ""
              }`}
            >
              <User />
              <span>Individuals</span>
            </button>
            <button
              onClick={() => setFilterType("organization")}
              className={`filterButton ${
                filterType === "organization" ? "active" : ""
              }`}
            >
              <Users />
              <span>Organizations</span>
            </button>
          </div>

          {/* Results count */}
          <div className="resultsCount">
            <p>
              Showing {filteredProviders.length}{" "}
              {filteredProviders.length === 1 ? "provider" : "providers"}
            </p>
          </div>

          {/* Service Provider Cards */}
          <div className="grid">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="card">
                <div className="cardContent">
                  {/* Provider Header */}
                  <div className="providerHeader">
                    <div>
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="providerImage"
                      />
                    </div>
                    <div className="providerInfo">
                      <h3 className="providerName">{provider.name}</h3>
                      <div className={`typeBadge ${provider.type}`}>
                        {provider.type === "individual" ? <User /> : <Users />}
                        {provider.type === "individual"
                          ? "Individual"
                          : "Organization"}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="location">
                    <MapPin />
                    <span className="locationText">{provider.location}</span>
                  </div>

                  {/* Rating */}
                  <div className="rating">
                    <div className="stars">{renderStars(provider.rating)}</div>
                    <span className="ratingText">
                      {provider.rating} ({provider.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="description">{provider.description}</p>

                  {/* Action Button */}
                  <button className="actionButton">View Profile</button>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredProviders.length === 0 && (
            <div className="noResults">
              <div>
                <Search className="noResultsIcon" />
              </div>
              <h3 className="noResultsTitle">No providers found</h3>
              <p className="noResultsText">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { ServiceProvidersScreen };
