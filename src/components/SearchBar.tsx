interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search influencers...",
  className = "",
}: SearchBarProps) {
  return (
    <input
      type="text"
      className={`border px-3 py-2 rounded focus:outline-none ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search"
    />
  );
}
