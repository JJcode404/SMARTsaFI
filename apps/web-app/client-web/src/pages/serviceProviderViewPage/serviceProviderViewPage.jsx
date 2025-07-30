import { useState, useMemo } from "react";
import "./serviceProviderViewPage.css";
import { Star, User, MapPin, Users, Search, ImageOff } from "lucide-react";
import { Bookingheader } from "../booking/header";
import { useNavigate } from "react-router-dom";
import { serviceProviders } from "../../../data/Serviceproviders";
const ServiceProvidersScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

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
      {/* <Bookingheader /> */}
      <div className="container">
        {/* Header */}
        <div className="progressSection">
          <div className="progressContent">
            <div className="progressHeader">
              <h1 className="progressTitle">Browse Service Providers</h1>
              <p className="progressSubtitle">
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
              <span>individuals</span>
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
                        src={provider.profileImage}
                        alt={provider.name}
                        className="providerImage"
                      />
                    </div>
                    <div className="providerInfo">
                      <h3 className="providerName">{provider.name}</h3>
                      <div className={`typeBadge ${provider.type}`}>
                        {provider.type === "individual" ? <User /> : <Users />}
                        {provider.type === "individual"
                          ? "individual"
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
                  <button
                    className="actionButton"
                    onClick={() => navigate(`/service-provider/${provider.id}`)}
                  >
                    View Profile
                  </button>
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
