import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import { CarDetailsPage } from "./pages/CarDetailsPage";
import { ContactPage } from "./pages/ContactPage";
import { OrderCustomPage } from "./pages/OrderCustomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "car/:id", element: <CarDetailsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "order-custom", element: <OrderCustomPage /> },
    ],
  },
]);
