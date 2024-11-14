// Internal components
import Header from "../components/Header/Index";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-3">
      <Card className="flex flex-col shadow-none p-2 border-0">
        <Header />
      </Card>
    </div>
  );
}
