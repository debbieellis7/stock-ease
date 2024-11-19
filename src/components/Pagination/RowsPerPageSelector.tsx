// External dependencies
import { Dispatch, SetStateAction } from "react";

// Internal components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Types
import { PaginationType } from ".";

type RowsPerPageSelectorProps = {
  pagination: PaginationType;
  setPagination: Dispatch<SetStateAction<PaginationType>>;
};

export default function RowsPerPageSelector({
  pagination,
  setPagination,
}: RowsPerPageSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-500 text-sm">Rows per page</div>
      <Select
        value={pagination.pageSize.toString()}
        onValueChange={value =>
          setPagination(prev => ({
            ...prev,
            pageSize: Number(value),
          }))
        }
      >
        <SelectTrigger className="border rounded-md px-2 w-14">
          <SelectValue placeholder={pagination.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {[4, 6, 8, 10, 15, 20, 30].map(size => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
