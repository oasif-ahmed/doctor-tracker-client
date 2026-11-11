import { HTMLAttributes } from "react";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-[#EBE5DA]/70 dark:bg-[#22201D]/70 ${className}`}
      {...props}
    />
  );
}