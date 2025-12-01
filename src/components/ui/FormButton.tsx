import { Button } from '@/src/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
}

export function FormButton({ 
  loading, 
  children, 
  className,
  variant = 'default',
  ...props 
}: FormButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      variant={variant}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        variant === 'default' && 'bg-foreground text-background hover:bg-primary/90 accent-glow',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        className
      )}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}
