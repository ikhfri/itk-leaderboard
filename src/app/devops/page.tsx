import BoothPage from "@/components/booth/booth-page";

export default function Page() {
  return (
    <BoothPage
      booth="DEVOPS"
      title="DEVOPS BOOTH"
      description="Dockerfile Challenge"
      variant="devops"
      scoreLabel="Score Dockerfile"
      scoreField="score"
    />
  );
}
