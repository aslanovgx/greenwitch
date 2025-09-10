
"use client";
import { useSearch } from "@/context/SearchContext";
import { useCallback } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

type Props = {
  onFocusOpenModal?: () => void;
  onUserType?: () => void; // ✅ əlavə olundu
};

export default function SearchInput({ onFocusOpenModal, onUserType }: Props) {
  const { searchTerm, setSearchTerm } = useSearch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      onUserType?.(); // ✅ user typing siqnalı
    },
    [setSearchTerm, onUserType]
  );

  return (
    <div className="row-2-search flex items-center">
      <PiMagnifyingGlass />
      <input
        type="text"
        placeholder="Axtar..."
        className="border-0 rounded px-2 py-1 text-sm focus:outline-none"
        value={searchTerm}
        onChange={onChange}
        onFocus={() => onFocusOpenModal?.()} // ✅ optional call
        onKeyDown={(e) => {
          if (e.key === "Escape") (e.target as HTMLInputElement).blur();
        }}
      />
    </div>
  );
}
