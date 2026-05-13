import Link from "next/link";
import { Brain, Container, Network } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <Image
              src="/itk.png"
              alt="ITK Games"
              width={600}
              height= {600}
            />

         
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full">
            <Card className="p-6">
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full bg-cyan-100 p-5">
                  <Brain className="text-cyan-500" size={50} />
                </div>

                <div className="text-center">
                  <h2 className="text-3xl font-bold">AI</h2>

                  <p className="text-slate-500 mt-2">
                    Tebak gambar AI generated
                  </p>
                </div>

                <Link href="/ai" className="w-full">
                  <Button variant="ai" className="w-full">
                    Masuk Booth
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full bg-orange-100 p-5">
                  <Container className="text-orange-500" size={50} />
                </div>

                <div className="text-center">
                  <h2 className="text-3xl font-bold">DEVOPS</h2>

                  <p className="text-slate-500 mt-2">Dockerfile Challenge</p>
                </div>

                <Link href="/devops" className="w-full">
                  <Button variant="devops" className="w-full">
                    Masuk Booth
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full bg-blue-100 p-5">
                  <Network className="text-blue-500" size={50} />
                </div>

                <div className="text-center">
                  <h2 className="text-3xl font-bold">NETWORK</h2>

                  <p className="text-slate-500 mt-2">Crimping Cable Race</p>
                </div>

                <Link href="/network" className="w-full">
                  <Button variant="network" className="w-full">
                    Masuk Booth
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
