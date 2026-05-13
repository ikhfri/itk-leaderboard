import BoothPage from "@/components/booth/booth-page";

export default function Page() {
  return (
    <BoothPage
      booth="DEVOPS"
      challenge="DOCKERFILE"
      title="DOCKERFILE CHALLENGE"
      description="Lomba membuat Dockerfile"
      variant="devops"
      scoreLabel="Score Dockerfile"
      scoreField="score"
    />
  );
}
