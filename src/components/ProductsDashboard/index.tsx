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

const multiSelectFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: string[]
) => {
  const rowValue = (row.getValue(columnId) as string).toLowerCase();
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

  useEffect(() => {
    setColumnFilters((prev) => {
      const filtersWithoutStatus = prev.filter(
        (filter) => filter.id !== "status"
      );
      const newFilters =
        selectedStatuses.length > 0
          ? [...filtersWithoutStatus, { id: "status", value: selectedStatuses }]
          : filtersWithoutStatus;

      return newFilters;
    });
  }, [selectedStatuses]);

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
