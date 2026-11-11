import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export const instant = false;

export default function AccessRestricted404Page() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center space-y-6 p-10 bg-card border border-border">
        <div className="w-14 h-14 mx-auto bg-secondary border border-border flex items-center justify-center text-foreground">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Error 404 — Access Boundary
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Resource Protected or Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The requested route is reserved for authenticated clinical administrators, or the URL does not exist. Please authenticate to continue.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="w-full sm:w-auto h-11 px-8 text-xs font-semibold uppercase tracking-wider gap-2">
            <Link href="/login">
              <LogIn className="w-4 h-4" /> Go to Login
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
