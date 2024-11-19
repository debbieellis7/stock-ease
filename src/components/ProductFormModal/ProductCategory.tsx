// External dependencies
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Internal components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

// Types
import { Product } from "../ProductsDashboard/columns";

type ProductCategoryProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<Product["category"]>>;
};

export default function ProductCategory({
  selectedCategory,
  setSelectedCategory,
}: ProductCategoryProps) {
  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Toys",
    "Beauty",
    "Sports",
    "Home Decor",
    "Home Appliances",
    "Others",
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSelectedCategory("Electronics");
  }, []);

  // Avoid hydration issue
  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">Products Category</Label>

      <Select
        value={selectedCategory}
        onValueChange={(value: string) =>
          setSelectedCategory(value as Product["category"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
