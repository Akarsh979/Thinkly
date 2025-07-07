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
import { Calendar, Eye, FileText, Loader2 } from "lucide-react";
import Link from "next/link";

interface documentProps {
  title: string;
  _id: Id<"documents">,
  description?: string,
  _creationTime: number,
}

function DocumentCard({ document }: { document: documentProps }) {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-400/30 transition-all hover:shadow-md">
      <CardHeader className="">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-800 dark:text-gray-200">
              {document.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(document._creationTime).toLocaleDateString()}</span>
            </CardDescription>
          </div>
          <div className="h-8 w-8 rounded-lg bg-purple-400/10 flex items-center justify-center text-purple-400 flex-shrink-0">
            <FileText className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-16">
          {!document.description ? (
            <div className="flex justify-center items-center py-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {document.description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="cursor-pointer flex items-center justify-center gap-2 w-full hover:bg-purple-400/10 hover:text-purple-500 dark:hover:text-purple-300"
          variant="outline"
          asChild
        >
          <Link href={`/dashboard/documents/${document._id}`} className="w-full">
            <Eye className="w-4 h-4" />
            <span className="leading-none align-middle">View Document</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DocumentCard;
