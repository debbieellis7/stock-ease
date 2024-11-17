// External dependencies
import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
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

export default function ProductsDashboard() {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: productsData,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
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
        <Toolbar table={table} />

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
