// Internal components
import { CardTitle } from "../ui/card";
import ProductFormModal from "../ProductFormModal";

// Types
import { Product } from "./columns";

type HeaderProps = {
  allProducts: Product[];
};

export default function Header({ allProducts }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <CardTitle className="font-bold text-[23px]">Products</CardTitle>
        <p className="text-sm text-slate-600">{allProducts.length} products</p>
      </div>
      <ProductFormModal />
    </div>
  );
}
