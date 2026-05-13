import Link from "next/link";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-6xl font-black">DEVOPS</h1>

            <p className="text-slate-500 mt-3">Pilih challenge DevOps</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <div className="flex flex-col gap-5">
                <h2 className="text-3xl font-black">🐳 Dockerfile</h2>

                <p className="text-slate-500">Challenge membuat Dockerfile</p>

                <Link href="/devops/dockerfile">
                  <Button variant="devops" className="w-full">
                    Masuk Challenge
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex flex-col gap-5">
                <h2 className="text-3xl font-black">😂 Tebak Emoji</h2>

                <p className="text-slate-500">Tebak tools DevOps dari emoji</p>

                <Link href="/devops/emoji">
                  <Button variant="devops" className="w-full">
                    Masuk Challenge
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
