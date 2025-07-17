import { UserIcon, Building2Icon } from "lucide-react";
import styles from "./clientType.module.css";
import { useState } from "react";
import { useClientRegistration } from "../../../utilites/clientRegistrationContext";

const ClientType = () => {
  const { setField, nextStep, state } = useClientRegistration();
  const selected = state.formData.client_type;

  const options = [
    {
      type: "Individual",
      description: "Personal registration",
      icon: <UserIcon className={styles.icon} />,
    },
    {
      type: "Organization",
      description: "Business registration",
      icon: <Building2Icon className={styles.icon} />,
    },
  ];

  const handleSelect = (type) => {
    setField("client_type", type);
    nextStep();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <UserIcon className={styles.headerIcon} />
            <div className={styles.intro}>
              <h1 className={styles.title}>Client Type</h1>
              <p className={styles.subtitle}>Choose your registration type</p>
            </div>
          </div>
          <p className={styles.startText}>Let's get started!</p>
        </div>
        <div className={styles.optionsGrid}>
          {options.map((option) => (
            <div
              key={option.type}
              onClick={() => handleSelect(option.type)}
              className={`${styles.card} ${
                selected === option.type
                  ? styles.cardSelected
                  : styles.cardUnselected
              }`}
            >
              <div className={styles.iconWrapper}>{option.icon}</div>
              <div>
                <h2 className={styles.optionTitle}>{option.type}</h2>
                <p className={styles.optionDescription}>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ClientType };
