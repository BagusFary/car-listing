import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEffect } from "react";




export const DataTable = ({columns, data}) => {

  

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [searchMode, setSearchMode] = useState(1);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {

    table.getAllColumns().forEach((col) => {

      if(
        (searchMode == 1 && col.id !== "brand") ||
        (searchMode == 2 && col.id !== "type") ||
        (searchMode == 3 && col.id !== "price") 
      ) {
        col.setFilterValue("");
      }
    });


  }, [searchMode]);

  return (
    <div>
      <div className="flex gap-3 items-center py-4">
        {
          searchMode === 1 && (
            <Input
              placeholder="Nissan"
              value={(table.getColumn("brand")?.getFilterValue()) ?? ""}
              onChange={(event) =>
                table.getColumn("brand")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )
        }
        {
          searchMode === 2 && (
            <Input
              placeholder="Livina SV 1.5 M/T/z"
              value={(table.getColumn("type")?.getFilterValue()) ?? ""}
              onChange={(event) =>
                table.getColumn("type")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )
        }
        {
          searchMode === 3 && (
            <Input
              placeholder="12000000"
              value={(table.getColumn("price")?.getFilterValue()) ?? ""}
              onChange={(event) =>
                table.getColumn("price")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )
        }
        <Select onValueChange={setSearchMode}>
          <SelectTrigger className="w-[180px]">
            <SelectValue value={searchMode}  placeholder="Merek" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pilih Mode Cari</SelectLabel>
              <SelectItem selected value={1} >Merek</SelectItem>
              <SelectItem value={2} >Jenis</SelectItem>
              <SelectItem value={3} >Harga</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border min-w-250 min-h-60 p-5">
        <Table>
          <TableHeader className="text-2xl font-mono">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-lg" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
       <div className="flex items-center justify-between space-x-2 py-4">
        <h1 className="text-2xl font-semibold">{`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()} Page`}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}