import { WeddingExperiences } from "./components/wedding-experiences";

const validSlugs = [
  "private-villa-weddings",
  "intimate-weddings",
  "elopement-weddings",
  "luxury-weddings",
] as const;

export function generateStaticParams() {
  return validSlugs.map((experience_id) => ({ experience_id }));
}

export default async function WeddingExperiencePage({
  params,
}: {
  params: Promise<{ experience_id: string }>;
}) {
  const { experience_id } = await params;
  return <WeddingExperiences experience_id={experience_id} />;
}
