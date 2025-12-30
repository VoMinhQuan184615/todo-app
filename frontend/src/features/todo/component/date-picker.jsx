import { useState } from "react";
import { Calendar } from "@/features/todo/shared/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/features/todo/shared/ui/sidebar";

export function DatePicker({ onChange }) {
  const [date, setDate] = useState(new Date());
  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
  };
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
