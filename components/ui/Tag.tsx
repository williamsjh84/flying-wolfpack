import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block border border-earth/30 px-3 py-1 text-xs font-sans tracking-widest text-earth uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
