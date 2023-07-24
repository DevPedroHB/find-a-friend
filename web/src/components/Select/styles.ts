import { cva } from "class-variance-authority";

export const selectTrigger = cva(
  "flex items-center justify-center rounded-3xl focus:outline-transparent",
  {
    variants: {
      variant: {
        primary:
          "bg-coral-500 gap-1 h-[4.375rem] px-3 font-extrabold text-xl border border-white",
        secondary: "bg-coral-600 gap-2 h-[4.5rem] px-4 font-extrabold text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const selectContent = cva("rounded-3xl overflow-hidden", {
  variants: {
    variant: {
      primary:
        "bg-coral-500 font-extrabold text-xl text-white border border-white",
      secondary: "bg-coral-600 font-extrabold text-xl text-white",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const selectIcon = cva("mx-auto", {
  variants: {
    variant: {
      primary: "w-4 h-4",
      secondary: "w-4 h-4",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const selectItem = cva(
  "flex items-center rounded-3xl transition-colors cursor-pointer my-1 focus:outline-transparent",
  {
    variants: {
      variant: {
        primary:
          "gap-1 px-3 hover:bg-coral-600 data-[state=checked]:bg-coral-600",
        secondary:
          "gap-2 px-4 hover:bg-coral-500 data-[state=checked]:bg-coral-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
