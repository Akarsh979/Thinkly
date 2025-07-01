import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

function LoadingButton({
  isLoading,
  children,
  loadingText,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
}) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className="cursor-pointer flex gap-1 items-center"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}

export default LoadingButton;
