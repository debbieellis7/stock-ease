// External dependencies
import { Table } from "@tanstack/react-table";

// Internal components
import StatusDropdown from "./StatusDropdown";
//import CategoryDropdown from "./CategoriesDropdown";
import CategoriesDropdown from "./CategoriesDropdown";
import FilterArea from "./FilterArea";
import { Input } from "../ui/input";

// Types
import { StatusDropdownProps } from "./StatusDropdown";
import { CategoriesDropdownProps } from "./CategoriesDropdown";

interface ToolbarProps<TData> {
  table: Table<TData>;
  selectedStatuses: StatusDropdownProps["selectedStatuses"];
  setSelectedStatuses: StatusDropdownProps["setSelectedStatuses"];
  selectedCategories: CategoriesDropdownProps["selectedCategories"];
  setSelectedCategories: CategoriesDropdownProps["setSelectedCategories"];
}

export default function Toolbar<TData>({
  table,
  selectedStatuses,
  setSelectedStatuses,
  selectedCategories,
  setSelectedCategories,
}: ToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-3 mb-8 mt-6">
      <div className="flex flex-wrap items-start sm:items-center justify-between gap-4">
        <Input
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={e =>
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
          <CategoriesDropdown
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      <FilterArea
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
}
