// External dependencies
import { Table } from "@tanstack/react-table";

// Internal components
import StatusDropdown from "./StatusDropdown";
import CategoryDropdown from "./CategoryDropdown";
import FilterArea from "./FilterArea";
import { Input } from "../ui/input";

// Types
import { StatusDropdownProps } from "./StatusDropdown";

interface ToolbarProps<TData> {
  table: Table<TData>;
  selectedStatuses: StatusDropdownProps["selectedStatuses"];
  setSelectedStatuses: StatusDropdownProps["setSelectedStatuses"];
}

export default function Toolbar<TData>({
  table,
  selectedStatuses,
  setSelectedStatuses,
}: ToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-3 mb-8 mt-6">
      <div className="flex items-center justify-between">
        <Input
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          placeholder="Search by name..."
          className="max-w-sm h-10"
        />

        <div className="flex items-center gap-4">
          <StatusDropdown
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
          />
          <CategoryDropdown />
        </div>
      </div>

      <FilterArea />
    </div>
  );
}
