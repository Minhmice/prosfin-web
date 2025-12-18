import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4 max-w-md">
        <Alert>
          <FileQuestion className="h-4 w-4" />
          <AlertTitle>404 - Page Not Found</AlertTitle>
          <AlertDescription>
            The page you are looking for does not exist.
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}

