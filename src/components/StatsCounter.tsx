"use client";

import { useEffect, useRef, useState } from "react";
import FadeInUp from "./animations/FadeInUp";

interface Stat {
  label: string;
  value: number;
  unit: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats: Stat[];
  duration?: number;
  size?: "large" | "medium" | "small";
  color?: "white" | "dark";
}

function AnimatedNumber({
  value,
  duration = 1500,
  isInView,
}: {
  value: number;
  duration?: number;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplayValue(Math.floor(value * eased));

      if (now < endTime) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(tick);
  }, [value, duration, isInView]);

  return <>{displayValue.toLocaleString()}</>;
}

export default function StatsCounter({
  stats,
  duration = 1500,
  size = "large",
  color = "white",
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    large: {
      number: "text-5xl md:text-7xl",
      label: "text-base md:text-lg",
      unit: "text-lg md:text-2xl",
      gap: "gap-8 md:gap-16",
    },
    medium: {
      number: "text-4xl md:text-5xl",
      label: "text-sm md:text-base",
      unit: "text-base md:text-lg",
      gap: "gap-6 md:gap-12",
    },
    small: {
      number: "text-2xl md:text-4xl",
      label: "text-xs md:text-sm",
      unit: "text-sm md:text-base",
      gap: "gap-4 md:gap-8",
    },
  };

  const colorClasses = {
    white: {
      number: "text-white",
      label: "text-white/80",
      unit: "text-white/90",
    },
    dark: {
      number: "text-primary",
      label: "text-text-muted",
      unit: "text-primary",
    },
  };

  const classes = sizeClasses[size];
  const colors = colorClasses[color];

  return (
    <div
      ref={ref}
      className={`flex flex-wrap justify-center items-start ${classes.gap}`}
    >
      {stats.map((stat, index) => (
        <FadeInUp key={index} delay={index * 100}>
          <div className="text-center">
            <p className={`${classes.label} ${colors.label} mb-2`}>{stat.label}</p>
            <div className="flex items-baseline justify-center">
              {stat.prefix && (
                <span className={`${classes.unit} ${colors.unit} mr-1`}>
                  {stat.prefix}
                </span>
              )}
              <span className={`${classes.number} ${colors.number} font-black`}>
                <AnimatedNumber
                  value={stat.value}
                  duration={duration}
                  isInView={isInView}
                />
              </span>
              <span className={`${classes.unit} ${colors.unit} ml-1 font-medium`}>
                {stat.unit}
              </span>
            </div>
          </div>
        </FadeInUp>
      ))}
    </div>
  );
}
