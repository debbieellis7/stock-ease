// External dependencies
import { Table } from "@tanstack/react-table";

// Internal components
import StatusDropdown from "./StatusDropdown";
import CategoryDropdown from "./CategoryDropdown";
import FilterArea from "./FilterArea";
import { Input } from "../ui/input";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export default function Toolbar<TData>({ table }: ToolbarProps<TData>) {
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
          <StatusDropdown />
          <CategoryDropdown />
        </div>
      </div>

      <FilterArea />
    </div>
  );
}
