import { GoBackButton } from "@/components/GoBackButton";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <main className="flex-1 overflow-auto bg-[#1a1a1a] p-4">
      <div className="flex items-center justify-center h-full">
        <div className="bg-[#222222] p-8 rounded-lg text-center">
          <div className="text-4xl font-bold mb-4">404</div>
          <div className="text-lg mb-4">Página no encontrada</div>
          <Suspense fallback={<Loading />}>
            <GoBackButton className="mx-auto mt-4" />
          </Suspense>
        </div>
      </div>
    </main>
  )
}