// External dependencies
import { useState } from "react";
import { LucideGitPullRequestDraft } from "lucide-react";

// Internal components
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type Category = {
  value: string;
  label: string;
};

export type CategoriesDropdownProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const categories: Category[] = [
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "toys", label: "Toys" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports" },
  { value: "home-decor", label: "Home Decor" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "others", label: "Others" },
];

export default function CategoriesDropdown({
  selectedCategories,
  setSelectedCategories,
}: CategoriesDropdownProps) {
  const [open, setOpen] = useState(false);

  function handleCheckboxChange(value: string) {
    setSelectedCategories(prev => {
      const updatedCategories = prev.includes(value)
        ? prev.filter(category => category !== value)
        : [...prev, value];

      return updatedCategories;
    });
  }

  function clearFilters() {
    setSelectedCategories([]);
  }

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10">
            <LucideGitPullRequestDraft />
            Categories
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-56 poppins" side="bottom" align="end">
          <Command className="p-1">
            <CommandInput placeholder="Category" />

            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                No category found.
              </CommandEmpty>

              <CommandGroup>
                {categories.map(category => (
                  <CommandItem key={category.value} className="h-9">
                    <Checkbox
                      checked={selectedCategories.includes(category.value)}
                      className="size-4 rounded-[4px]"
                      onClick={() => handleCheckboxChange(category.value)}
                    />
                    <div className="flex items-center gap-1 p-1 rounded-lg px-3 text-[14px]">
                      {category.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>

            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                variant="ghost"
                className="text-[12px] mb-1"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
