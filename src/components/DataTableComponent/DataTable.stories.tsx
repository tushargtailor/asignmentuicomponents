import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DataTable, { type Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 },
  { id: 4, name: "David", email: "david@example.com", age: 28 },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [data, setData] = useState<User[]>(sampleData);
    const [loading, setLoading] = useState(false);

    const toggleLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    };

    const clearData = () => setData([]);
    const resetData = () => setData(sampleData);

    return (
      <div className="p-6 space-y-4">
        <div className="space-x-2 mb-4">
          <button
            onClick={toggleLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show Loading
          </button>
          <button
            onClick={clearData}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Show Empty
          </button>
          <button
            onClick={resetData}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Reset Data
          </button>
        </div>

        <DataTable
          data={data}
          columns={columns}
          loading={loading}
          selectable
          onRowSelect={(rows) => setSelectedUsers(rows)}
        />

        <div>
          <strong>Selected Users:</strong>{" "}
          {selectedUsers.length > 0
            ? selectedUsers.map((u) => u.name).join(", ")
            : "None"}
        </div>
      </div>
    );
  },
};
