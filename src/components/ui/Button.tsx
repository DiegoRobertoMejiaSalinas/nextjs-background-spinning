import { cn } from "@/lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Spinner } from "@/components/Spinner/Spinner";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const buttonVariants = cva(
  "active:scale-95 hover:scale-105 inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-80 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100",
        outline:
          "text-slate-900 hover:text-slate-300 dark:text-slate-300 dark:hover:text-slate-900 bg-transparent hover:bg-slate-900 dark:hover:bg-slate-100 border border-slate-900 dark:border-slate-300",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400",
      },
      round: {
        default: "rounded",
        md: "rounded-mg",
        lg: "rounded-lg",
        full: "rounded-full",
        "non-rounded": "rounded-none",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 text-sm",
        lg: "h-12 px-12 text-md",
      },
    },
    defaultVariants: {
      round: "default",
      size: "default",
      variant: "default",
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading,
      disabled,
      className,
      children,
      variant,
      round,
      size,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(buttonVariants({ variant, size, round, className }))}
        {...props}
      >
        {isLoading ? <Spinner className="mr-3" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
