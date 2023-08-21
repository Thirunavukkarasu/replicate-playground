import { modelsConfig } from "@/config/site";
import Link from "next/link";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex gap-20">
      <div className="px-4">
        {modelsConfig.map((model: any, idx: any) => (
          <div key={idx} className=" text-lg font-medium py-2">
            <Link href={`/demo/${model.formattedName}`}> {model.name}</Link>
          </div>
        ))}
      </div>
      <div>{children}</div>
    </section>
  );
}
