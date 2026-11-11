
import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center space-y-6 p-10 bg-card border border-border">
        <div className="w-14 h-14 mx-auto bg-secondary border border-border flex items-center justify-center text-foreground">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Error 404
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Page Not Found
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you are looking for does not exist or has been relocated within the clinical portal.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="w-full sm:w-auto h-11 px-8 text-xs font-semibold uppercase tracking-wider gap-2">
            <Link href="/login">
              <LogIn className="w-4 h-4" /> Sign In
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto h-11 px-8 text-xs font-semibold uppercase tracking-wider gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
