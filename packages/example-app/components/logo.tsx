import { CommandIcon } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority";

const logoVariants = cva(
  "flex items-center justify-center rounded-lg bg-black shrink-0",
  {
    variants: {
      size: {
        md: "h-13 w-13",
        sm: "h-8 w-8",
        xs: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const iconVariants = cva(
  "shrink-0 text-white",
  {
    variants: {
      size: {
        md: "h-4 w-4",
        sm: "h-3 w-3",
        xs: "h-2 w-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

export function Logo({ size, className }: LogoProps) {
  return (
    <div className={logoVariants({ size, className })}>
      <CommandIcon className={iconVariants({ size })} />
    </div>
  );
}
