"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

export const EventField = ({
  icon: Icon,
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  type = "text"
}: {
  icon: ReactNode;
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  type?: string;
}) =>
(
  <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
    <div className="flex items-center gap-2">
      {Icon}
      <Label htmlFor={id}>{label}</Label>
    </div>
    <Input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
)
