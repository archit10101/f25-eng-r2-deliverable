"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SpeciesSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim() !== "") params.set("search", search.trim());
    router.push(`/species?${params.toString()}`);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <input
        type="text"
        placeholder="Search species..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full rounded border border-border px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
      />
      <button
        onClick={handleSearch}
        className="rounded bg-primary px-4 py-2 text-background transition hover:opacity-90"
      >
        Search
      </button>
    </div>
  );
}
