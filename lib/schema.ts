export type Database = {
  public: {
    Tables: {
      species: {
        Row: {
          id: string;
          scientific_name: string;
          common_name: string | null;
          kingdom: string | null;
          total_population: number | null;
          image: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          scientific_name: string;
          common_name?: string | null;
          kingdom?: string | null;
          total_population?: number | null;
          image?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          scientific_name?: string;
          common_name?: string | null;
          kingdom?: string | null;
          total_population?: number | null;
          image?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
