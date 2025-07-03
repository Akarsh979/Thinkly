import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

function LoadingButton({
  isLoading,
  children,
  loadingText,
  onClick,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className="cursor-pointer flex gap-1 items-center"
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
