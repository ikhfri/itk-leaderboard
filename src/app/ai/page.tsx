import BoothPage from "@/components/booth/booth-page";

export default function Page() {
  return (
    <BoothPage
      booth="AI"
      title="AI BOOTH"
      description="Tebak gambar AI generated"
      variant="ai"
      scoreLabel="Score Benar"
      scoreField="score"
    />
  );
}
