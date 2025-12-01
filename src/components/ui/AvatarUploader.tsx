"use client";
import { useRef, useState } from 'react';
import { Upload, User, X } from 'lucide-react';
import { Label } from '@/src/components/ui/label';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

interface AvatarUploaderProps {
  value?: string | File | null;
  onChange: (file: File | null) => void;
  previewUrl?: string;
}

export function AvatarUploader({ value, onChange, previewUrl }: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-foreground font-medium">Profile Avatar</Label>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'w-24 h-24 rounded-full border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden transition-all',
            preview && 'border-solid border-primary/50 accent-glow'
          )}
        >
          {preview ? (
            <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-upload"
          />
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="border-border/50 hover:border-primary/50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Image
          </Button>

          {preview && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive/90"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Upload a profile picture (max 5MB). JPG, PNG, or GIF.
      </p>
    </div>
  );
}
