import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

interface documentProps {
  title: string;
  _id: Id<"documents">,
  description?: string,
}

function DocumentCard({ document }: { document: documentProps }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div>{!document.description ? (
          <div className="flex justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          document.description
        )}</div>
      </CardContent>
      <CardFooter>
        <Button
          className="cursor-pointer flex items-center justify-center gap-2"
          variant="outline"
          asChild
        >
          <Link href={`/documents/${document._id}`}>
          <Eye className="w-4 h-4" />
          <span className="leading-none align-middle">View</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DocumentCard;
