// External dependencies
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

// Internal components
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type FilterAreaProps = {
  selectedStatuses: string[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

type FilterGroupProps = {
  label: string;
  selectedItems: string[];
};

function FilterGroup({ label, selectedItems }: FilterGroupProps) {
  const MAX_VISIBLE = 3; // Define a flexible limit

  return (
    <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
      <span className="text-gray-600">{label}</span>
      <Separator orientation="vertical" />
      <div className="flex gap-2 items-center">
        {selectedItems.length <= MAX_VISIBLE ? (
          selectedItems.map((item, index) => (
            <Badge key={index} variant="secondary">
              {item}
            </Badge>
          ))
        ) : (
          <Badge variant="secondary">{`${selectedItems.length} Selected`}</Badge>
        )}
      </div>
    </div>
  );
}

export default function FilterArea({
  selectedStatuses,
  setSelectedStatuses,
  selectedCategories,
  setSelectedCategories,
}: FilterAreaProps) {
  const hasFilters =
    selectedStatuses.length > 0 || selectedCategories.length > 0;

  return (
    <div className="flex gap-3">
      {/* Render Status Filter */}
      {selectedStatuses.length > 0 && (
        <FilterGroup label="Status" selectedItems={selectedStatuses} />
      )}

      {/* Render Categories Filter */}
      {selectedCategories.length > 0 && (
        <FilterGroup label="Category" selectedItems={selectedCategories} />
      )}

      {/* Reset Button */}
      {hasFilters && (
        <Button
          variant="ghost"
          className="p-1 px-2"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedStatuses([]);
          }}
        >
          <span>Reset</span>
          <IoClose />
        </Button>
      )}
    </div>
  );
}
