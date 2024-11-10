'use client';

import { useMounted } from "@/hooks/mounted/useMounted";

export default function Home() {
  const mounted = useMounted();

  if (!mounted) return null;


  return (
    <main>
      sfsfdf
    </main>
  );
}
