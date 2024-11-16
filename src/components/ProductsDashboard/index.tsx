// Internal components
import Header from "./Header";
import Toolbar from "./Toolbar";
import DataTable from "./DataTable";
import { Card, CardContent, CardHeader } from "../ui/card";

// Data and configuration
import productsData from "./productsData";
import columns from "./columns";

export default function ProductsDashboard() {
  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between p-2">
        <Header />
      </CardHeader>

      <CardContent>
        <Toolbar />
        <DataTable data={productsData} columns={columns} />
      </CardContent>
    </Card>
  );
}
