import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContentNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <h2 className="text-2xl font-bold">Post not found</h2>
      <p className="text-muted-foreground">
        The post you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/content">Back to Content</Link>
      </Button>
    </div>
  )
}
