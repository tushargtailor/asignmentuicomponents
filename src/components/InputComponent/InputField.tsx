import React from "react";

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const InputField = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
}: InputFieldProps) => {
  const sizeClasses: Record<string, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses: Record<string, string> = {
    filled: "bg-gray-100 border border-transparent focus:border-neutral-600",
    outlined:
      "bg-white border border-gray-300 focus:border-neutral-200 focus:ring-1 focus:ring-neutral-400",
    ghost:
      "bg-transparent border-b border-gray-300 focus:border-gray-500 focus:ring-0",
  };

  const stateClasses = `
    ${invalid ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <div className="flex flex-col w-full max-w-md">
      {label && (
        <label className="mb-1 text-md font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-md outline-none transition
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${stateClasses}
            pr-10
          `}
        />

        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {invalid && errorMessage ? (
        <p className="mt-1 ml-2 text-sm text-red-600">{errorMessage}</p>
      ) : helperText ? (
        <p className="mt-1 ml-2 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default InputField;
