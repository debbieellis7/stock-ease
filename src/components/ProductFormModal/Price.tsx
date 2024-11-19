// External dependencies
import { MdError } from "react-icons/md";
import { NumericFormat } from "react-number-format";

// Internal components
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Price() {
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="price" className="text-slate-600">
        Price
      </Label>
      <NumericFormat
        value="0"
        className="h-11"
        customInput={Input}
        thousandSeparator
        placeholder="Price..."
      />

      <div className="text-red-500 flex gap-1 items-center text-[13px]">
        <MdError />
        <p>The Price is required</p>
      </div>
    </div>
  );
}
