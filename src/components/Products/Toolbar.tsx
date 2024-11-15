// Internal components
import Status from "./dropdowns/Status";
import FilterArea from "./FilterArea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Toolbar() {
  return (
    <div className="">
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex items-center justify-between">
          <Input placeholder="Search by name..." className="max-w-sm h-10" />
          <div className="flex items-center gap-4">
            <Status />
            <Button variant="secondary">Category</Button>
          </div>
        </div>

        <FilterArea />
      </div>

      <div></div>
    </div>
  );
}
