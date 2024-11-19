// External dependencies
import { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

// Internal components
import { Label } from "../ui/label";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

// Types
import { Product } from "../ProductsDashboard/columns";

type StatusProps = {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
};

export default function Status({ selectedTab, setSelectedTab }: StatusProps) {
  return (
    <div>
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        className="mt-1"
        onValueChange={(value: string) =>
          setSelectedTab(value as Product["status"])
        }
      >
        <TabsList className="h-11 px-2">
          <TabsTrigger
            value="Published"
            className={`h-8 ${
              selectedTab === "Published" ? "text-red-500" : ""
            }`}
          >
            <FaCheck className="pr-1" />
            Published
          </TabsTrigger>
          <TabsTrigger
            value="Inactive"
            className={`h-8 ${
              selectedTab === "Inactive" ? "text-red-500" : ""
            }`}
          >
            <IoClose />
            Inactive
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${selectedTab === "Draft" ? "text-red-500" : ""}`}
            value="Draft"
          >
            <FaInbox className="pr-1" />
            Draft
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
