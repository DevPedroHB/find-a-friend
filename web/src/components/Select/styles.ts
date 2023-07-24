import { cva } from "class-variance-authority";

export const selectTrigger = cva(
  "flex items-center justify-center focus:outline-transparent",
  {
    variants: {
      variant: {
        primary:
          "bg-coral-500 gap-1 rounded-3xl h-[4.375rem] px-3 font-extrabold text-xl border border-white",
        secondary:
          "bg-coral-600 rounded-3xl gap-2 h-[4.5rem] px-4 font-extrabold text-xl",
        tertiary: "bg-baby-pink-200 h-12 px-4 rounded-2xl gap-4",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const selectContent = cva("overflow-hidden", {
  variants: {
    variant: {
      primary:
        "bg-coral-500 font-extrabold text-xl rounded-3xl text-white border border-white",
      secondary: "bg-coral-600 font-extrabold text-xl text-white rounded-3xl",
      tertiary: "bg-baby-pink-200 text-midnight-blue-800 rounded-2xl",
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
      tertiary: "w-6 h-6",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const selectItem = cva(
  "flex items-center transition-colors cursor-pointer my-1 focus:outline-transparent",
  {
    variants: {
      variant: {
        primary:
          "gap-1 px-3 rounded-3xl hover:bg-coral-600 data-[state=checked]:bg-coral-600",
        secondary:
          "gap-2 px-4 rounded-3xl hover:bg-coral-500 data-[state=checked]:bg-coral-500",
        tertiary:
          "gap-4 px-4 rounded-2xl hover:bg-baby-pink-300 data-[state=checked]:bg-baby-pink-300",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
