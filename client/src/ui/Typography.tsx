import React from "react";
import { twMerge } from "tailwind-merge";


export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body1" | "body2" | "body3";

export interface BaseTypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * H1 — Jost Bold | 24px / 35px line / -0.33 tracking
 */
export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...rest }, ref) => (
  <h1
    ref={ref}
    className={twMerge("text-2xl leading-8.75 font-bold tracking-[-0.33px] text-slate-600", className)}
    {...rest}
  >
    {children}
  </h1>
));
H1.displayName = "H1";

/**
 * H2 — Jost Bold | 20px / 29px line / -0.25 tracking
 */
export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...rest }, ref) => (
  <h2
    ref={ref}
    className={twMerge("text-xl leading-7.25 font-bold tracking-[-0.25px] text-slate-600", className)}
    {...rest}
  >
    {children}
  </h2>
));
H2.displayName = "H2";

/**
 * H3 — Jost Bold | 18px / 26px line / -0.25 tracking
 */
export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...rest }, ref) => (
  <h3
    ref={ref}
    className={twMerge("text-lg leading-6.5 font-bold tracking-[-0.25px] text-slate-600", className)}
    {...rest}
  >
    {children}
  </h3>
));
H3.displayName = "H3";

/**
 * H4 — Jost Bold | 14px / 20px line / -0.2 tracking
 */
export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...rest }, ref) => (
  <h4
    ref={ref}
    className={twMerge("text-sm leading-5 font-bold tracking-[-0.2px] text-slate-600", className)}
    {...rest}
  >
    {children}
  </h4>
));
H4.displayName = "H4";

/**
 * Body1 — Jost Regular | 16px / 23px line
 */
export const Body1 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...rest }, ref) => (
  <p
    ref={ref}
    className={twMerge(
      "text-base leading-5.75 font-normal tracking-normal text-slate-600", className)}
    {...rest}
  >
    {children}
  </p>
));
Body1.displayName = "Body1";

/**
 * Body2 — Jost Regular | 15px / 22px line
 */
export const Body2 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...rest }, ref) => (
  <p
    ref={ref}
    className={twMerge("text-[15px] leading-5.5 font-normal tracking-normal text-slate-600", className)}
    {...rest}
  >
    {children}
  </p>
));
Body2.displayName = "Body2";

/**
 * Body3 — Jost Semibold | 13px / 19px line
 */
export const Body3 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...rest }, ref) => (
  <p
    ref={ref}
    className={twMerge(
      "text-[13px] leading-4.75 font-semibold tracking-normal text-slate-600",
      className)
    }
    {...rest}
  >
    {children}
  </p>
));
Body3.displayName = "Body3";


export interface TypographyProps extends BaseTypographyProps {
  variant: TypographyVariant;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, children, className, ...rest }, ref) => {
    const sharedProps = { className, ...rest };

    switch (variant) {
      case "h1":
        return (
          <H1 ref={ref as React.Ref<HTMLHeadingElement>} {...sharedProps}>
            {children}
          </H1>
        );
      case "h2":
        return (
          <H2 ref={ref as React.Ref<HTMLHeadingElement>} {...sharedProps}>
            {children}
          </H2>
        );
      case "h3":
        return (
          <H3 ref={ref as React.Ref<HTMLHeadingElement>} {...sharedProps}>
            {children}
          </H3>
        );
      case "h4":
        return (
          <H4 ref={ref as React.Ref<HTMLHeadingElement>} {...sharedProps}>
            {children}
          </H4>
        );
      case "body1":
        return (
          <Body1 ref={ref as React.Ref<HTMLParagraphElement>} {...sharedProps}>
            {children}
          </Body1>
        );
      case "body2":
        return (
          <Body2 ref={ref as React.Ref<HTMLParagraphElement>} {...sharedProps}>
            {children}
          </Body2>
        );
      case "body3":
        return (
          <Body3 ref={ref as React.Ref<HTMLParagraphElement>} {...sharedProps}>
            {children}
          </Body3>
        );
      default: {
        // Exhaustive check — TypeScript will error if a new variant is added but not handled
        const _exhaustive: never = variant;
        return null;
      }
    }
  },
);

Typography.displayName = "Typography";

export default Typography;
