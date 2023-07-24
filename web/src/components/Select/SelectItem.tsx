"use client";

import { cn } from "@/utils/cn";
import * as Select from "@radix-ui/react-select";
import { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { ReactNode } from "react";
import { selectIcon, selectItem } from "./styles";

interface ISelectItem
  extends Select.SelectItemProps,
    VariantProps<typeof selectItem> {
  children: ReactNode;
}

export function SelectItem({
  children,
  className,
  variant,
  ...rest
}: ISelectItem) {
  return (
    <Select.Item className={cn(selectItem({ variant, className }))} {...rest}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <Check className={cn(selectIcon({ variant, className }))} />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
