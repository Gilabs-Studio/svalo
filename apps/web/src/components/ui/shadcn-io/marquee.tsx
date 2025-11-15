"use client";

import { cn } from "@/lib/utils";
import React, { type ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: Readonly<MarqueeProps>) {
  // Separate fade components from content
  const childrenArray = React.Children.toArray(children);
  const fadeComponents = childrenArray.filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type as { displayName?: string })?.displayName === "MarqueeFade",
  );
  const contentChildren = childrenArray.filter(
    (child) =>
      !(
        React.isValidElement(child) &&
        (child.type as { displayName?: string })?.displayName === "MarqueeFade"
      ),
  );

  return (
    <div
      {...props}
      className={cn(
        "group relative flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {fadeComponents}
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {contentChildren}
          </div>
        ))}
    </div>
  );
}

interface MarqueeContentProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function MarqueeContent({
  className,
  children,
  ...props
}: Readonly<MarqueeContentProps>) {
  return (
    <div className={cn("flex shrink-0 [gap:var(--gap)]", className)} {...props}>
      {children}
    </div>
  );
}

interface MarqueeItemProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function MarqueeItem({
  className,
  children,
  ...props
}: Readonly<MarqueeItemProps>) {
  return (
    <div className={cn("shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

interface MarqueeFadeProps extends ComponentPropsWithoutRef<"div"> {
  side?: "left" | "right";
  className?: string;
}

export function MarqueeFade({
  side = "left",
  className,
  ...props
}: Readonly<MarqueeFadeProps>) {
  return (
    <div
      {...props}
      className={cn(
        "pointer-events-none absolute inset-y-0 z-10 w-1/4 bg-gradient-to-r from-background",
        {
          "left-0": side === "left",
          "right-0 bg-gradient-to-l": side === "right",
        },
        className,
      )}
    />
  );
}

MarqueeFade.displayName = "MarqueeFade";
