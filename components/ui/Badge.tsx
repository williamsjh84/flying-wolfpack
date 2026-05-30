import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "ocean" | "earth";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-widest uppercase",
        {
          "bg-mist text-ink": variant === "default",
          "bg-gold/20 text-gold": variant === "gold",
          "bg-ocean/20 text-ocean": variant === "ocean",
          "bg-earth/20 text-earth": variant === "earth",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
