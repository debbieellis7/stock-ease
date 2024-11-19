// External dependencies
import { ReactNode, useRef, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";

// Internal components
import ProductName from "./ProductName";
import SKU from "./SKU";
import Supplier from "./Supplier";
import ProductCategory from "./ProductCategory";
import Status from "./Status";
import Quantity from "./Quantity";
import Price from "./Price";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

// Internal data and utilities
import icons from "./Icons";

// Types
import { Product } from "../ProductsDashboard/columns";

// Store
import { useProductStore } from "@/app/useProductStore";

const ProductSchema = z.object({
  productName: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name must be 100 characters or less"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric"),
  supplier: z
    .string()
    .min(1, "Supplier is required")
    .max(100, "Supplier name must be 100 characters or less"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Price is required",
    })
    .transform((val) => {
      // If it's an empty string, this will fail validation
      if (val === "") return undefined;
      // Convert to number and fix to 2 decimal places
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a number",
        })
        .nonnegative("Price cannot be negative")
    ),
});

// Typescript type for the form data
type ProductFormData = z.infer<typeof ProductSchema>;

export default function ProductFormModal() {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      sku: "",
      supplier: "",
      quantity: 0,
      price: 0.0,
    },
  });
  const { reset } = methods;

  const [selectedTab, setSelectedTab] =
    useState<Product["status"]>("Published");
  const [selectedCategory, setSelectedCategory] =
    useState<Product["category"]>("Electronics");
  const [selectedIcon, setSelectedIcon] = useState<null | ReactNode>(
    icons.find((icon) => icon.isSelected === true)?.icon
  );

  const { addProduct, isLoading } = useProductStore();
  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = async (data: ProductFormData) => {
    const newProduct: Product = {
      id: nanoid(),
      supplier: data.supplier,
      name: data.productName,
      price: data.price,
      quantityInStock: data.quantity,
      sku: data.sku,
      status: selectedTab,
      category: selectedCategory,
      icon: selectedIcon,
      createdAt: new Date(),
    };

    console.log("onSubmit newProduct - ", newProduct);

    const result = await addProduct(newProduct);

    if (result) {
      toast({
        title: "Success",
        description: "Product addedd successfully!",
      });
      dialogCloseRef.current?.click();
    }
  };

  function handleReset() {
    reset();
  }

  function onSelectedIcon(icon: ReactNode) {
    setTimeout(() => setSelectedIcon(icon), 0);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10">Add Product</Button>
      </DialogTrigger>

      <DialogContent className="p-7 px-8 poppins">
        <DialogHeader>
          <DialogTitle className="text-[22px]">Add Product</DialogTitle>
          <DialogDescription>
            Fill in the form to add a new product
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              <div className="grid grid-cols-2 gap-7">
                <ProductName onSelectedIcon={onSelectedIcon} />
                <SKU />
              </div>

              <div className="grid grid-cols-2 gap-5 items-start mt-4">
                <Supplier />
                <ProductCategory
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-1 max-sm:grid-cols-1">
                <Status
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <Quantity />
                <Price />
              </div>
            </div>

            <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
              <DialogClose
                ref={dialogCloseRef}
                onClick={() => handleReset()}
                asChild
              >
                <Button variant="secondary" className="h-11 px-11" asChild>
                  Cancel
                </Button>
              </DialogClose>

              <Button className="h-11 px-11">Add Product</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
