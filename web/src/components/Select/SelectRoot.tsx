"use client";

import { cn } from "@/utils/cn";
import * as Select from "@radix-ui/react-select";
import { VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode } from "react";
import { selectContent, selectIcon, selectTrigger } from "./styles";

interface ISelectRoot
  extends Select.SelectProps,
    VariantProps<typeof selectTrigger> {
  idHtmlFor: string;
  children: ReactNode;
  className?: string;
}

export function SelectRoot({
  idHtmlFor,
  children,
  className,
  variant,
  ...rest
}: ISelectRoot) {
  return (
    <Select.Root {...rest}>
      <Select.Trigger
        id={idHtmlFor}
        className={cn(selectTrigger({ variant, className }))}
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown className={cn(selectIcon({ variant, className }))} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={cn(selectContent({ variant, className }))}>
          <Select.ScrollUpButton>
            <ChevronUp className={cn(selectIcon({ variant, className }))} />
          </Select.ScrollUpButton>
          <Select.Viewport>{children}</Select.Viewport>
          <Select.ScrollDownButton>
            <ChevronDown className={cn(selectIcon({ variant, className }))} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
