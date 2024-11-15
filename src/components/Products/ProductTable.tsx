// Internal components
import Toolbar from "./Toolbar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ProductTable() {
  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between p-2">
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle className="font-bold text-[23px]">Products</CardTitle>
            <p className="text-sm text-slate-600">34 products</p>
          </div>
          <Button>Add Product</Button>
        </div>
      </CardHeader>

      <CardContent>
        <Toolbar />
      </CardContent>
    </Card>
  );
}
