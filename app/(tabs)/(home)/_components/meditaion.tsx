import { guidedMeditations } from "@/lib/data/meditation-data";
import { Meditations } from "./meditations";
import PageSection from "@/app/_components/page-section";

export default function Meditation() {
  return (
    <PageSection
      title="Guided Meditations"
      description="Start your day right with some meditations"
    >
      <Meditations meditations={guidedMeditations} />
    </PageSection>
  );
}
