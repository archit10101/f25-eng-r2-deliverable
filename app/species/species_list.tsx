import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

interface Props {
  search?: string;
}

interface Species {
  id: string;
  scientific_name: string;
  common_name: string | null;
  kingdom: string;
  total_population: number | null;
  image: string | null;
  description: string | null;
  author: string;
}

export default async function SpeciesList({ search }: Props) {
  const supabase = createServerSupabaseClient();
  const {data: { session }, } = await supabase.auth.getSession();

  if (!session) redirect("/");

  const sessionId = session.user.id;

  // Fetch species with optional search filtering
  let query = supabase.from("species").select("*").order("id", { ascending: false });

  if (search && search.trim() !== "") {
  const term = `%${search.trim()}%`;
  query = query.or(`scientific_name.ilike.${term},common_name.ilike.${term}`);
}


  const { data: species } = await query;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionId} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.map((s) => (
          <SpeciesCard key={s.id as any} species={s as any} sessionId={sessionId} />
        ))}
      </div>
    </>
  );
}
