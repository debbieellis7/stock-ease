// External dependencies
import { Table } from "@tanstack/react-table";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

// Internal components
import RowsPerPageSelector from "./RowsPerPageSelector";
import { Button } from "../ui/button";

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

interface PaginationProps<TData> {
  table: Table<TData>;
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

export default function Pagination<TData>({
  table,
  pagination,
  setPagination,
}: PaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 gap-3">
      <RowsPerPageSelector
        pagination={pagination}
        setPagination={setPagination}
      />

      <div className="flex gap-6 items-center">
        <span className="text-sm text-gray-500">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <div className="flex items-center justify-end space-x-2 py-4">
          {/* First page button */}
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage}
          >
            <BiFirstPage />
          </Button>

          {/* Previous page button */}
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <GrFormPrevious />
          </Button>

          {/* Next page button */}
          <Button
            className="size-9 w-12"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <GrFormNext />
          </Button>

          {/* Last page button */}
          <Button
            className="size-9 w-12"
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <BiLastPage />
          </Button>
        </div>
      </div>
    </div>
  );
}
