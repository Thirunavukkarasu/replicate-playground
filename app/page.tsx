import { MainNav } from "@/components/main-nav";
import Form from "./form";

export default function Home() {
  return (
    <>
      <MainNav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Form />
      </main>
    </>
  );
}
