"use client";

import Form from "@/components/Form";
import Analysis from "@/components/Analysis";
import { AppStoreProvider } from "@/providers/useAppStore";
import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <AppStoreProvider>
      <main className="w-full bg-gray-200 py-6 sm:py-12 flex flex-col items-center overflow-x-hidden">
        <section className="w-full min-h-screen flex justify-center gap-8 items-center">
          <Form />
          <Analysis />
        </section>
        <section className="pb-12 w-full max-w-7xl flex justify-center">
          <NewsList />
        </section>
      </main>
    </AppStoreProvider>
  );
}
