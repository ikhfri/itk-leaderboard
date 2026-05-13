import BoothPage from "@/components/booth/booth-page";

export default function Page() {
  return (
    <BoothPage
      booth="NETWORK"
      title="NETWORK BOOTH"
      description="Crimping Cable Race"
      variant="network"
      scoreLabel="Jumlah Pin Berhasil"
      scoreField="connectedPins"
    />
  );
}
