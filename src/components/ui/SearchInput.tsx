"use client";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";
import { useCallback } from "react";

type Props = {
  onFocusOpenModal?: () => void;
};

export default function SearchInput({ onFocusOpenModal }: Props) {
  const { searchTerm, setSearchTerm } = useSearch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  return (
    <div className="row-2-search flex items-center">
      <Image
        src={"/assets/icons/search.svg"}
        alt="search-icon"
        width={30}
        height={30}
        className="object-contain"
      />
      <input
        type="text"
        placeholder="Axtar..."
        className="border-0 rounded px-2 py-1 text-sm focus:outline-none"
        value={searchTerm}
        onChange={onChange}
        onFocus={onFocusOpenModal}
        onKeyDown={(e) => {
          if (e.key === "Escape") (e.target as HTMLInputElement).blur();
        }}
      />
    </div>
  );
}
