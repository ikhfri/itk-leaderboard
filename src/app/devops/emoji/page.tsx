import BoothPage from "@/components/booth/booth-page";

export default function Page() {
  return (
    <BoothPage
      booth="DEVOPS"
      challenge="EMOJI"
      title="DEVOPS EMOJI"
      description="Tebak tools DevOps dari emoji"
      variant="devops"
      scoreLabel="Jumlah Benar"
      scoreField="score"
    />
  );
}
