"use client";

// External dependencies
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Internal components
import Header from "@/components/Header";
import ProductsDashboard from "@/components/ProductsDashboard";
import DeleteDialog from "@/components/DeleteDialog";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`poppins p-5 ${bgColor} border w-full min-h-screen`}>
      <Card className="flex flex-col shadow-none p-5">
        <Header />
        <ProductsDashboard />
        <DeleteDialog />
      </Card>
    </div>
  );
}
