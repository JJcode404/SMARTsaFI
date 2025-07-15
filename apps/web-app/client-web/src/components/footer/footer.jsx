import React from "react";

// CSS Module styles
const styles = {
  footer: {
    padding: "60px 20px 40px 20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    textAlign: "center",
  },

  topLink: {
    color: "#6c757d",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "400",
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexDirection: "column",
    marginBottom: "40px",
    flexWrap: "wrap",
    transition: "color 0.3s ease",
  },
  topLinkHover: {
    color: "#495057",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  socialIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  socialIconHover: {
    transform: "translateY(-2px)",
  },
  facebookIcon: {
    backgroundColor: "#1877f2",
  },
  instagramIcon: {
    background:
      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  },
  twitterIcon: {
    backgroundColor: "#000000",
  },
  companyName: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1086f4",
    marginBottom: "15px",
    letterSpacing: "-0.5px",
  },
  location: {
    fontSize: "18px",
    color: "#6c757d",
    marginBottom: "10px",
    fontWeight: "400",
  },
  phone: {
    fontSize: "18px",
    color: "#6c757d",
    marginBottom: "40px",
    fontWeight: "400",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid #e9ecef",
    flexWrap: "wrap",
    gap: "20px",
  },
  copyright: {
    fontSize: "14px",
    color: "#6c757d",
    fontWeight: "400",
  },
  poweredBy: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#6c757d",
  },
  goDaddyLogo: {
    height: "20px",
    width: "auto",
  },
  // Mobile responsiveness
  "@media (max-width: 768px)": {
    footer: {
      padding: "40px 0",
    },
    topLinks: {
      flexDirection: "column",
      gap: "20px",
    },

    companyName: {
      fontSize: "24px",
    },
    location: {
      fontSize: "22px",
    },
    phone: {
      fontSize: "16px",
    },
    bottomSection: {
      flexDirection: "column",
      textAlign: "center",
      gap: "15px",
    },
  },
};

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GoDaddyLogo = () => (
  <svg width="80" height="20" viewBox="0 0 200 50" fill="currentColor">
    <text x="0" y="35" fontSize="16" fontWeight="bold" fill="#6c757d">
      GoDaddy
    </text>
    <text x="70" y="35" fontSize="14" fontWeight="normal" fill="#6c757d">
      Airo
    </text>
  </svg>
);

const Footer = () => {
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [hoveredSocial, setHoveredSocial] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLinkClick = (linkType) => {
    console.log(`${linkType} clicked`);
  };

  const handleSocialClick = (platform) => {
    console.log(`${platform} clicked`);
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:844-637-3692";
  };

  return (
    <footer style={styles.footer}>
      {/* Top Links */}
      <div
        style={{
          ...styles.topLinks,
          ...(isMobile ? { gap: "20px" } : {}),
        }}
      >
        <a
          href="#"
          style={{
            ...styles.topLink,
            ...(hoveredLink === "privacy" ? styles.topLinkHover : {}),
          }}
          onMouseEnter={() => setHoveredLink("privacy")}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={() => handleLinkClick("Privacy Policy")}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          style={{
            ...styles.topLink,
            ...(hoveredLink === "terms" ? styles.topLinkHover : {}),
          }}
          onMouseEnter={() => setHoveredLink("terms")}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={() => handleLinkClick("Terms and Conditions")}
        >
          Terms and Conditions
        </a>
      </div>

      {/* Social Icons */}
      <div style={styles.socialIcons}>
        <div
          style={{
            ...styles.socialIcon,
            ...styles.facebookIcon,
            ...(hoveredSocial === "facebook" ? styles.socialIconHover : {}),
          }}
          onMouseEnter={() => setHoveredSocial("facebook")}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => handleSocialClick("Facebook")}
        >
          <FacebookIcon />
        </div>
        <div
          style={{
            ...styles.socialIcon,
            ...styles.instagramIcon,
            ...(hoveredSocial === "instagram" ? styles.socialIconHover : {}),
          }}
          onMouseEnter={() => setHoveredSocial("instagram")}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => handleSocialClick("Instagram")}
        >
          <InstagramIcon />
        </div>
        <div
          style={{
            ...styles.socialIcon,
            ...styles.twitterIcon,
            ...(hoveredSocial === "twitter" ? styles.socialIconHover : {}),
          }}
          onMouseEnter={() => setHoveredSocial("twitter")}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => handleSocialClick("Twitter")}
        >
          <TwitterIcon />
        </div>
      </div>

      {/* Company Info */}
      <h2
        style={{
          ...styles.companyName,
          ...(isMobile ? { fontSize: "24px" } : {}),
        }}
      >
        SMARTsaFI Cleaning Services TX
      </h2>

      <p
        style={{
          ...styles.location,
          ...(isMobile ? { fontSize: "16px" } : {}),
        }}
      >
        Nairobi, Kenya
      </p>

      <p
        style={{
          ...styles.phone,
          ...(isMobile ? { fontSize: "16px" } : {}),
          cursor: "pointer",
        }}
        onClick={handlePhoneClick}
      >
        844-637-3692
      </p>

      {/* Bottom Section */}
      <div
        style={{
          ...styles.bottomSection,
          ...(isMobile
            ? {
                flexDirection: "column",
                textAlign: "center",
                gap: "15px",
              }
            : {}),
        }}
      >
        <p style={styles.copyright}>
          Copyright © 2022 SMARTsaFI Cleaning Services TX - All Rights Reserved.
        </p>

        <div style={styles.poweredBy}>
          <span>Powered by</span>
          <GoDaddyLogo />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
