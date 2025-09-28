import  { useState, useEffect } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortedData, setSortedData] = useState<T[]>([...data]);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());


  useEffect(() => {
    setSortedData([...data]);
  }, [data]);

 
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;

    let order: "asc" | "desc" = "asc";
    if (sortColumn === col.dataIndex) {
      order = sortOrder === "asc" ? "desc" : "asc";
    }

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[col.dataIndex];
      const bValue = b[col.dataIndex];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setSortedData(sorted);
    setSortColumn(col.dataIndex);
    setSortOrder(order);
  };


  const handleRowSelect = (index: number) => {
    if (!selectable) return;

    const newSet = new Set(selectedRows);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      if (selectable) newSet.add(index);
    }
    setSelectedRows(newSet);
    if (onRowSelect) {
      onRowSelect(Array.from(newSet).map((i) => sortedData[i]));
    }
  };

 
  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }


  if (!data || data.length === 0) {
    return <p className="text-center py-4">No data available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {selectable && <th className="p-2 border-b"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 text-left border-b cursor-pointer select-none"
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center gap-1">
                  {col.title}
                  {col.sortable && sortColumn === col.dataIndex && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 ${
                selectedRows.has(rowIndex) ? "bg-blue-100" : ""
              }`}
            >
              {selectable && (
                <td className="p-2 border-b text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(rowIndex)}
                    onChange={() => handleRowSelect(rowIndex)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2 border-b">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
