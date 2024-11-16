// External dependencies
import {
  MdInventory,
  MdBuild,
  MdPhoneIphone,
  MdLaptop,
  MdKitchen,
  MdHome,
} from "react-icons/md";

// Internal dependencies
import { Product } from "./columns";

const productsData: Product[] = [
  {
    id: "1",
    name: "Screwdriver",
    supplier: "ToolSupplier Inc.",
    sku: "SD123",
    category: "Others",
    status: "Draft",
    quantityInStock: 50,
    price: 12.99,
    icon: MdBuild,
  },
  {
    id: "2",
    name: "Hammer",
    supplier: "ToolSupplier Inc.",
    sku: "HM456",
    category: "Others",
    status: "Published",
    quantityInStock: 30,
    price: 15.5,
    icon: MdInventory,
  },
  {
    id: "3",
    name: "Smartphone",
    supplier: "TechWorld",
    sku: "SP789",
    category: "Electronics",
    status: "Published",
    quantityInStock: 100,
    price: 499.99,
    icon: MdPhoneIphone,
  },
  {
    id: "4",
    name: "Laptop",
    supplier: "TechWorld",
    sku: "LT101",
    category: "Electronics",
    status: "Inactive",
    quantityInStock: 25,
    price: 899.99,
    icon: MdLaptop,
  },
  {
    id: "5",
    name: "Microwave Oven",
    supplier: "HomeGoods Co.",
    sku: "MO202",
    category: "Furniture",
    status: "Draft",
    quantityInStock: 15,
    price: 120,
    icon: MdKitchen,
  },
  {
    id: "6",
    name: "Washing Machine",
    supplier: "HomeGoods Co.",
    sku: "WM303",
    category: "Home Decor",
    status: "Published",
    quantityInStock: 10,
    price: 450,
    icon: MdHome,
  },
];

export default productsData;
