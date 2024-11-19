// External dependencies
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

// Internal components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconSelector } from "./IconSelector";

type ProductNameProps = {
  onSelectedIcon: (selectedIcon: ReactNode) => void;
};

export default function ProductName({ onSelectedIcon }: ProductNameProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function getSelectedIcon(selectedIcon: ReactNode) {
    onSelectedIcon(selectedIcon);
  }

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-600">
        Product&#39;s Name
      </Label>

      <div className="flex gap-2 items-center">
        <Input
          {...register("productName")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="Laptop..."
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>

      {errors.productName && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>The product name is required</p>
        </div>
      )}
    </div>
  );
}
