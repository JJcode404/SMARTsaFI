import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Bell,
  CreditCard,
  AlertTriangle,
  Camera,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import styles from "./profile.module.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+254 712 345 678",
    address: "123 Westlands Avenue",
    city: "Nairobi",
    preferredTimes: ["morning", "evening"],
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    currentPlan: "Premium Monthly",
    paymentMethod: "**** **** **** 4532",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeToggle = (time) => {
    setFormData((prev) => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter((t) => t !== time)
        : [...prev.preferredTimes, time],
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (section) => {
    // Simulate save action
    console.log(`Saving ${section} changes:`, formData);
    // Here you would typically make an API call
  };

  return (
    <div className={styles.container}>
      {/* Personal Information */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <User className={`${styles.icon} ${styles.iconBlue}`} />
          <h2 className={styles.sectionTitle}>Personal Information</h2>
        </div>

        <div className={styles.grid}>
          <div>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`${styles.input} ${styles.inputBlue}`}
            />
          </div>

          <div>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`${styles.input} ${styles.inputBlue}`}
            />
          </div>

          <div>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`${styles.input} ${styles.inputBlue}`}
            />
          </div>

          <div>
            <label className={styles.label}>Profile Picture</label>
            <div className={styles.profilePicture}>
              <div className={styles.avatar}>
                <User className={styles.avatarIcon} />
              </div>
              <button className={`${styles.button} ${styles.buttonBlue}`}>
                <Camera className={styles.buttonIcon} />
                Upload Photo
              </button>
            </div>
          </div>
        </div>

        <div className={styles.sectionFooter}>
          <button
            onClick={() => handleSave("personal")}
            className={`${styles.button} ${styles.buttonBlue}`}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Location Details */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <MapPin className={`${styles.icon} ${styles.iconGreen}`} />
          <h2 className={styles.sectionTitle}>Location Details</h2>
        </div>

        <div className={styles.grid}>
          <div>
            <label className={styles.label}>Home Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`${styles.input} ${styles.inputGreen}`}
            />
          </div>

          <div>
            <label className={styles.label}>City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={`${styles.input} ${styles.inputGreen}`}
            />
          </div>
        </div>

        <div className={styles.preferredTimes}>
          <label className={styles.label}>Preferred Cleaning Times</label>
          <div className={styles.timeButtons}>
            {["morning", "afternoon", "evening"].map((time) => (
              <button
                key={time}
                onClick={() => handleTimeToggle(time)}
                className={`${styles.timeButton} ${
                  formData.preferredTimes.includes(time)
                    ? styles.timeButtonActive
                    : ""
                }`}
              >
                <Clock className={styles.timeButtonIcon} />
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sectionFooter}>
          <button
            onClick={() => handleSave("location")}
            className={`${styles.button} ${styles.buttonGreen}`}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Security */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Shield className={`${styles.icon} ${styles.iconRed}`} />
          <h2 className={styles.sectionTitle}>Security</h2>
        </div>

        <div className={styles.securityContent}>
          <div>
            <h3 className={styles.subTitle}>Change Password</h3>
            <div className={styles.passwordGrid}>
              <div className={styles.passwordFullWidth}>
                <label className={styles.label}>Current Password</label>
                <div className={styles.passwordInput}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      handlePasswordChange("current", e.target.value)
                    }
                    className={`${styles.input} ${styles.inputRed} ${styles.inputWithIcon}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? (
                      <EyeOff className={styles.passwordToggleIcon} />
                    ) : (
                      <Eye className={styles.passwordToggleIcon} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className={styles.label}>New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange("new", e.target.value)}
                  className={`${styles.input} ${styles.inputRed}`}
                />
              </div>

              <div>
                <label className={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    handlePasswordChange("confirm", e.target.value)
                  }
                  className={`${styles.input} ${styles.inputRed}`}
                />
              </div>
            </div>
          </div>

          <div className={styles.twoFactorAuth}>
            <div className={styles.twoFactorContent}>
              <div>
                <h3 className={styles.subTitle}>Two-Factor Authentication</h3>
                <p className={styles.description}>
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() =>
                  handleInputChange("twoFactorAuth", !formData.twoFactorAuth)
                }
                className={`${styles.toggle} ${
                  formData.twoFactorAuth ? styles.toggleActive : ""
                }`}
              >
                <span
                  className={`${styles.toggleSlider} ${
                    formData.twoFactorAuth ? styles.toggleSliderActive : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.sectionFooter}>
          <button
            onClick={() => handleSave("security")}
            className={`${styles.button} ${styles.buttonRed}`}
          >
            Update Security Settings
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Bell className={`${styles.icon} ${styles.iconPurple}`} />
          <h2 className={styles.sectionTitle}>Notifications</h2>
        </div>

        <div className={styles.notificationsContent}>
          <div className={styles.notificationItem}>
            <div>
              <h3 className={styles.subTitle}>Email Notifications</h3>
              <p className={styles.description}>
                Receive booking confirmations and updates via email
              </p>
            </div>
            <button
              onClick={() =>
                handleInputChange(
                  "emailNotifications",
                  !formData.emailNotifications
                )
              }
              className={`${styles.toggle} ${
                formData.emailNotifications ? styles.toggleActivePurple : ""
              }`}
            >
              <span
                className={`${styles.toggleSlider} ${
                  formData.emailNotifications ? styles.toggleSliderActive : ""
                }`}
              />
            </button>
          </div>

          <div className={styles.notificationItem}>
            <div>
              <h3 className={styles.subTitle}>SMS Notifications</h3>
              <p className={styles.description}>
                Receive booking reminders and alerts via SMS
              </p>
            </div>
            <button
              onClick={() =>
                handleInputChange(
                  "smsNotifications",
                  !formData.smsNotifications
                )
              }
              className={`${styles.toggle} ${
                formData.smsNotifications ? styles.toggleActivePurple : ""
              }`}
            >
              <span
                className={`${styles.toggleSlider} ${
                  formData.smsNotifications ? styles.toggleSliderActive : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className={styles.sectionFooter}>
          <button
            onClick={() => handleSave("notifications")}
            className={`${styles.button} ${styles.buttonPurple}`}
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Subscription & Payments */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <CreditCard className={`${styles.icon} ${styles.iconYellow}`} />
          <h2 className={styles.sectionTitle}>Subscription & Payments</h2>
        </div>

        <div className={styles.subscriptionContent}>
          <div className={styles.grid}>
            <div>
              <label className={styles.label}>Current Plan</label>
              <div className={styles.planCard}>
                <div className={styles.planCardContent}>
                  <span className={styles.planName}>
                    {formData.currentPlan}
                  </span>
                  <span className={styles.planPrice}>KES 2,500/month</span>
                </div>
              </div>
            </div>

            <div>
              <label className={styles.label}>Payment Method</label>
              <div className={styles.paymentCard}>
                <div className={styles.paymentCardContent}>
                  <span className={styles.paymentMethod}>
                    {formData.paymentMethod}
                  </span>
                  <button className={styles.changePaymentButton}>Change</button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.billingHistory}>
            <h3 className={styles.subTitle}>Billing History</h3>
            <div className={styles.billingList}>
              {[
                { date: "July 2025", amount: "KES 2,500", status: "Paid" },
                { date: "June 2025", amount: "KES 2,500", status: "Paid" },
                { date: "May 2025", amount: "KES 2,500", status: "Paid" },
              ].map((bill, index) => (
                <div key={index} className={styles.billingItem}>
                  <div className={styles.billingLeft}>
                    <div className={styles.billingDot}></div>
                    <span className={styles.billingDate}>{bill.date}</span>
                  </div>
                  <div className={styles.billingRight}>
                    <span className={styles.billingAmount}>{bill.amount}</span>
                    <span className={styles.billingStatus}>{bill.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sectionFooter}>
          <button className={`${styles.button} ${styles.buttonYellow}`}>
            Change Plan
          </button>
          <button className={`${styles.button} ${styles.buttonOutline}`}>
            View All Bills
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <AlertTriangle className={`${styles.icon} ${styles.iconOrange}`} />
          <h2 className={styles.sectionTitle}>Account Actions</h2>
        </div>

        <div className={styles.accountActions}>
          <div className={styles.actionCard}>
            <h3 className={styles.actionTitle}>Deactivate Account</h3>
            <p className={styles.actionDescription}>
              Temporarily disable your account. You can reactivate it anytime by
              logging in.
            </p>
            <button className={`${styles.button} ${styles.buttonOrange}`}>
              Deactivate Account
            </button>
          </div>

          <div className={`${styles.actionCard} ${styles.actionCardDanger}`}>
            <h3 className={styles.actionTitleDanger}>Delete Account</h3>
            <p className={styles.actionDescriptionDanger}>
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className={`${styles.button} ${styles.buttonRed}`}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <AlertTriangle className={`${styles.icon} ${styles.iconRed}`} />
              <h3 className={styles.modalTitle}>Confirm Account Deletion</h3>
            </div>
            <p className={styles.modalDescription}>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className={`${styles.button} ${styles.buttonOutline}`}
              >
                <X className={styles.buttonIcon} />
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Account deleted");
                  setShowDeleteDialog(false);
                }}
                className={`${styles.button} ${styles.buttonRed}`}
              >
                <Check className={styles.buttonIcon} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Profile };
