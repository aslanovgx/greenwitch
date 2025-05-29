"use client";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";

export default function SearchInput() {
    const { searchTerm, setSearchTerm } = useSearch();

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
                className="border rounded px-2 py-1 text-sm focus:outline-none"
                value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
