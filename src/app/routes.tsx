import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import { CarDetailsPage } from "./pages/CarDetailsPage";
import { ContactPage } from "./pages/ContactPage";
import { OrderCustomPage } from "./pages/OrderCustomPage";
// Admin
import { AdminLayout } from "./admin/AdminLayout";
import { DashboardPage } from "./admin/pages/DashboardPage";
import { PermissionsPage } from "./admin/pages/PermissionsPage";
import { AdminUsersPage } from "./admin/pages/users/AdminUsersPage";
import { EditorUsersPage } from "./admin/pages/users/EditorUsersPage";
import { BrandPage } from "./admin/pages/cars/BrandPage";
import { ModelPage } from "./admin/pages/cars/ModelPage";
import { BodyStylePage } from "./admin/pages/cars/BodyStylePage";
import { ColorPage } from "./admin/pages/cars/ColorPage";
import { CarPage } from "./admin/pages/cars/CarPage";
import { FaqPage } from "./admin/pages/FaqPage";
import { PriceCalculatorPage } from "./admin/pages/PriceCalculatorPage";
import { GalleryPage } from "./admin/pages/GalleryPage";
import { InquiryListPage } from "./admin/pages/InquiryListPage";
import { OrderListPage } from "./admin/pages/OrderListPage";

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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "permissions", element: <PermissionsPage /> },
      { path: "users/admin", element: <AdminUsersPage /> },
      { path: "users/editor", element: <EditorUsersPage /> },
      { path: "cars/brand", element: <BrandPage /> },
      { path: "cars/model", element: <ModelPage /> },
      { path: "cars/body-style", element: <BodyStylePage /> },
      { path: "cars/color", element: <ColorPage /> },
      { path: "cars/list", element: <CarPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "price-calculator", element: <PriceCalculatorPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "inquiry", element: <InquiryListPage /> },
      { path: "orders", element: <OrderListPage /> },
    ],
  },
]);
