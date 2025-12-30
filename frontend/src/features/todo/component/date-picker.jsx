import { useState, useEffect } from "react";
import { Calendar } from "@/features/todo/shared/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/features/todo/shared/ui/sidebar";

export function DatePicker({ value, onChange }) {
  const [date, setDate] = useState(value || new Date());

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const handleSelect = (selectedDate) => {
    // Normalize date to avoid timezone issues
    if (!selectedDate) return;

    const normalized = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    setDate(normalized);
    onChange?.(normalized);
  };
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
