import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";

interface documentProps{
   title: string,
}

function DocumentCard({document}:{document:documentProps}){
  return (
    <Card>
  <CardHeader>
    <CardTitle>{document.title}</CardTitle>
    <CardDescription></CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button className="cursor-pointer" variant="outline">View</Button>
  </CardFooter>
</Card>
  )
}

export default DocumentCard;
