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

export default function page() {
  return (
    <div className="flex flex-row gap-4">
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
            <Button className="w-full">
              <ArrowRightCircleIcon className="mr-2 h-4 w-4" /> Explore
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
