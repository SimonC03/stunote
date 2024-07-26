import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform transition-transform duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-orange-1 hover:bg-blue-600 text-white font-bold",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        inverted: "bg-white text-blue-600 hover:bg-gray-100 border border-blue-600",
      },
      size: {
        default: "h-12 px-8 py-4 text-lg",
        sm: "h-9 px-4 py-2 text-sm",
        xs: "h-7 px-3 py-1 text-xs",
        lg: "h-14 px-10 py-4 text-xl",
        xlg: "h-16 px-14 py-4 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean; // Add the loading prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), "button", className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <span className="loader"></span> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

const styles = `
  .button {
    transition: transform 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
  }

  .button:active {
    transform: scale(0.95);
  }

  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject styles into the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export { Button, buttonVariants };
