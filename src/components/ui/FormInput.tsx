import { forwardRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

interface FormInputProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, control, type = 'text', placeholder, required, className }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
    });

    return (
      <div className="space-y-3">
        <Label htmlFor={name} className="text-foreground font-medium">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </Label>
        <Input
          {...field}
          ref={ref}
          id={name}
          type={type}
          placeholder={placeholder}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={!!error}
          className={cn(
            'bg-input/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all',
            error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
            className
          )}
        />
        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive flex items-center gap-1">
            <span className="text-destructive">⚠</span>
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
