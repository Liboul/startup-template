import { Separator } from './separator';

interface SeparatorWithContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SeparatorWithContent({
  children,
  className,
}: SeparatorWithContentProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <div className="text-sm text-muted-foreground">{children}</div>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
