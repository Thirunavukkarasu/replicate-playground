import { ArrowRightCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { modelsConfig } from "@/config/site";
import Link from "next/link";

export default function page() {
  return (
    <div className="container flex pt-12 flex-row items-center gap-4 text-center">
      {modelsConfig.map((model: any, idx: any) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{model.name}</CardTitle>
            <CardDescription>{model.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{model.content}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href={`/demos/${model.formattedName}`}>
                <ArrowRightCircleIcon className="mr-2 h-4 w-4" /> Explore
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
