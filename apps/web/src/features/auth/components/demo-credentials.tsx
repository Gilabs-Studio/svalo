'use client';

import { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DemoCredentials() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Show demo credentials"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 top-6 z-50 w-72 rounded-lg border bg-popover p-4 shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-sm font-semibold">Demo Credentials</h4>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Individual:</span>
                <span className="font-mono text-foreground">user@example.com</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Business:</span>
                <span className="font-mono text-foreground">business@example.com</span>
              </div>
              <div className="text-center pt-1 text-muted-foreground">
                Password: <span className="font-semibold font-mono">password123</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

