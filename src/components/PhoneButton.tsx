"use client";

import { Phone } from "lucide-react";

interface PhoneButtonProps {
  phoneNumber: string;
  phoneTel: string;
  variant?: "large" | "medium" | "small" | "floating";
  showIcon?: boolean;
  showHours?: boolean;
  hours?: string;
}

export default function PhoneButton({
  phoneNumber,
  phoneTel,
  variant = "medium",
  showIcon = true,
  showHours = false,
  hours,
}: PhoneButtonProps) {
  const variantStyles = {
    large: {
      container: "flex items-center gap-3",
      icon: "w-7 h-7",
      number: "text-4xl md:text-5xl font-bold",
      hours: "text-sm",
      padding: "py-4 px-8",
    },
    medium: {
      container: "flex items-center gap-2",
      icon: "w-5 h-5",
      number: "text-2xl md:text-3xl font-bold",
      hours: "text-xs",
      padding: "py-3 px-6",
    },
    small: {
      container: "flex items-center gap-2",
      icon: "w-4 h-4",
      number: "text-xl md:text-2xl font-bold",
      hours: "text-[11px]",
      padding: "py-2 px-4",
    },
    floating: {
      container: "flex items-center gap-2",
      icon: "w-5 h-5",
      number: "text-lg font-bold",
      hours: "text-[10px]",
      padding: "py-3 px-5",
    },
  };

  const styles = variantStyles[variant];

  if (variant === "floating") {
    return (
      <a
        href={phoneTel}
        className="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2 bg-accent text-white rounded-full shadow-floating px-5 py-3 transition-transform hover:scale-105"
        aria-label="電話をかける"
      >
        <Phone className={styles.icon} />
        <span className={styles.number}>{phoneNumber}</span>
      </a>
    );
  }

  return (
    <a href={phoneTel} className={styles.container} aria-label={`電話でお問い合わせ ${phoneNumber}`}>
      {showIcon && <Phone className={`${styles.icon} text-accent`} />}
      <div className="flex flex-col">
        <span className={`${styles.number} text-accent tracking-wide`}>
          {phoneNumber}
        </span>
        {showHours && hours && (
          <span className={`${styles.hours} text-text-muted`}>{hours}</span>
        )}
      </div>
    </a>
  );
}
