"use client";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelOn?: string;
  labelOff?: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  labelOn = "ON",
  labelOff = "OFF",
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <label
      className={`flex items-center gap-3 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue/20 ${
          checked ? "bg-green-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium font-bn transition-colors duration-200 ${
          checked ? "text-green-600" : "text-slate-500"
        }`}
      >
        {checked ? labelOn : labelOff}
      </span>
    </label>
  );
}
