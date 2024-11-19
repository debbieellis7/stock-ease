// Internal components
import { CardTitle } from "../ui/card";
import ProductFormModal from "../ProductFormModal";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <CardTitle className="font-bold text-[23px]">Products</CardTitle>
        <p className="text-sm text-slate-600">34 products</p>
      </div>
      <ProductFormModal />
    </div>
  );
}
