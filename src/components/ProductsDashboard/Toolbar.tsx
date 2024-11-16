// Internal components
import StatusDropdown from "./StatusDropdown";
import CategoryDropdown from "./CategoryDropdown";
import FilterArea from "./FilterArea";
import { Input } from "../ui/input";

export default function Toolbar() {
  return (
    <div className="flex flex-col gap-3 mb-8 mt-6">
      <div className="flex items-center justify-between">
        <Input placeholder="Search by name..." className="max-w-sm h-10" />

        <div className="flex items-center gap-4">
          <StatusDropdown />
          <CategoryDropdown />
        </div>
      </div>

      <FilterArea />
    </div>
  );
}
