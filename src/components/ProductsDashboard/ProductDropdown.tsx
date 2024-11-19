// External dependencies
import { Row } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { MdContentCopy, MdOutlineDelete } from "react-icons/md";
import { MoreHorizontal } from "lucide-react";
import { nanoid } from "nanoid";

// Internal components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

// Zustand store
import { useProductStore } from "@/app/useProductStore";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Types
import { Product } from "./columns";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  className: string;
  separator?: undefined;
};

export default function ProductDropdown({ row }: { row: Row<Product> }) {
  const {
    setSelectedProduct,
    setOpenDialog,
    setOpenProductDialog,
    addProduct,
  } = useProductStore();

  const { toast } = useToast();
  const menuItems: MenuItem[] = [
    { icon: <MdContentCopy />, label: "Copy", className: "" },
    { icon: <FaRegEdit />, label: "Edit", className: "" },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  async function handleClickedItem(item: MenuItem) {
    if (item.label === "Delete") {
      setOpenDialog(true);
      setSelectedProduct(row.original);
    }

    if (item.label === "Copy") {
      const productToCopy: Product = {
        ...row.original,
        id: nanoid(),
        name: `${row.original.name} (copy)`,
        createdAt: new Date(),
      };

      const result = await addProduct(productToCopy);

      if (result) {
        toast({
          title: "Copy successfully",
          description: "Product has been copied successfully",
        });
      }
    }

    if (item.label === "Edit") {
      setOpenProductDialog(true);
      setSelectedProduct(row.original);
    }
  }

  return (
    <DropdownMenu>
      {/* Trigger drop down which is the more icon */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="poppins">
        {menuItems.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem
              key={index}
              className={`flex items-center gap-1 p-[10px] ${item.className}`}
              onClick={() => handleClickedItem(item)}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
