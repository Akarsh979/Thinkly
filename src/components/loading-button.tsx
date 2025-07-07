import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function LoadingButton({
  isLoading,
  children,
  loadingText,
  onClick,
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className={cn("cursor-pointer flex gap-1 items-center", className)}
      onClick={(e)=>{
         onClick?.(e);
      }}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}

export default LoadingButton;
