"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export default function StarRating({
  value,
  onChange,
  size = "md",
  disabled = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;
  const starSize = sizes[size];

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => !disabled && setHoverValue(null)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= displayValue;

        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange(starIndex)}
            onMouseEnter={() => !disabled && setHoverValue(starIndex)}
            className={`p-0.5 transition-transform ${
              disabled
                ? "cursor-not-allowed"
                : "cursor-pointer hover:scale-110"
            }`}
            aria-label={`${starIndex} star${starIndex > 1 ? "s" : ""}`}
          >
            <Star
              className={`${starSize} transition-colors duration-150 ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-200 hover:text-yellow-200"
              }`}
            />
          </button>
        );
      })}
      {size !== "sm" && (
        <span className="ml-2 text-sm text-slate-500 font-bn">
          {value}/5
        </span>
      )}
    </div>
  );
}
