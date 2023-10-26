import type { ReactNode } from "react";

interface StatProps {
  children: ReactNode;
  className?: "!bg-season";
}

export default function Stat({ children, className }: StatProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 rounded-full border border-black bg-stat px-3 py-1 text-sm text-white  ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
