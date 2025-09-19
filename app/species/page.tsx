import SpeciesList from "./species_list";
import SpeciesSearch from "./species_search";

export default function SpeciesPage({ searchParams }: { searchParams?: { search?: string } }) {
  const search = searchParams?.search ?? "";

  return (
    <div className="mx-auto max-w-7xl">
      <SpeciesSearch />
      <SpeciesList search={search} />
    </div>
  );
}
