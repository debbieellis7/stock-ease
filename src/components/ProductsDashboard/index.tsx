// External dependencies
import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";

// Internal components
import Header from "./Header";
import Toolbar from "./Toolbar";
import DataTable from "./DataTable";
import Pagination from "../Pagination";
import { Card, CardContent, CardHeader } from "../ui/card";

// Data and configuration
import productsData from "./productsData";
import columns from "./columns";

// Types
import { PaginationType } from "../Pagination";

// Define custom filter types
declare module "@tanstack/table-core" {
  interface FilterFns {
    multiSelect: FilterFn<unknown>;
  }
}

const multiSelectFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: string[]
) => {
  const rowValue = (row.getValue(columnId) as string)
    .toLowerCase()
    .replace(/\s+/g, "-"); // Normalize spaces to hyphens
  const lowercaseFilterValues = filterValue.map((val) => val.toLowerCase());

  return filterValue.length === 0 || lowercaseFilterValues.includes(rowValue);
};

export default function ProductsDashboard() {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Combined useEffect for both filters
  useEffect(() => {
    setColumnFilters((prev) => {
      // Remove both status and category filters
      const baseFilters = prev.filter(
        (filter) => filter.id !== "status" && filter.id !== "category"
      );

      const newFilters = [...baseFilters];

      // Add status filter if there are selected statuses
      if (selectedStatuses.length > 0) {
        newFilters.push({
          id: "status",
          value: selectedStatuses,
        });
      }

      // Add category filter if there are selected categories
      if (selectedCategories.length > 0) {
        newFilters.push({
          id: "category",
          value: selectedCategories,
        });
      }

      return newFilters;
    });
  }, [selectedStatuses, selectedCategories]);

  const table = useReactTable({
    data: productsData,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    filterFns: {
      multiSelect: multiSelectFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between p-2">
        <Header />
      </CardHeader>

      <CardContent>
        <Toolbar
          table={table}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <DataTable table={table} columns={columns} />

        <Pagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
        />
      </CardContent>
    </Card>
  );
}
