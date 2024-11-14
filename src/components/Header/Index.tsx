// External dependencies
import { AiOutlineProduct } from "react-icons/ai";

// Internal components
import { ModeToggle } from "./ModeToggle";

function Logo() {
  return (
    <div className="flex items-center gap-2 transition-all">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <AiOutlineProduct className="text-xl" />
      </div>

      <div className="flex items-center gap-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold text-[24px]">StockEase</span>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="p-2 flex justify-between items-center">
      <Logo />
      <ModeToggle />
    </div>
  );
}
