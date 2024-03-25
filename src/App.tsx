import PrintersMap, { load } from "./components/Map/PrintersMap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderCreationScreen, {
  load as orderCreateLoad,
} from "./components/Screens/OrderCreationScreen";
import CodeEnterScreen from "./components/Screens/CodeEnterScreen";
import OrderConfirmationScreen from "./components/Orders/OrderConfirmationScreen";
import { YMaps } from "@pbe/react-yandex-maps";
import React from "react";
import OrderScreen, {
  load as orderScreenLoad,
} from "./components/Screens/OrderScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import OrdersHistoryScreen from "./components/Screens/OrdersHistoryScreen";
import ProfileScreen from "./components/Screens/ProfileScreen";
import ErrorScreen from "./components/Screens/ErrorScreen";
import Shortener from "./components/Shortener";

const router = createBrowserRouter([
  {
    path: "/",
    loader: load,
    element: <PrintersMap />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/printers/:printerCode/new_order",
    element: <OrderCreationScreen />,
    errorElement: <ErrorScreen />,
    loader: orderCreateLoad,
  },
  {
    path: "/code_enter",
    element: <CodeEnterScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/confirm_order/:confirmationToken",
    element: <OrderConfirmationScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/orders/:orderId",
    element: <OrderScreen />,
    errorElement: <ErrorScreen />,
    loader: orderScreenLoad,
  },
  {
    path: "/login",
    element: <LoginScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/orders",
    element: <OrdersHistoryScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/error",
    element: <ErrorScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/s/p/:printerId",
    element: <Shortener />,
  },
]);

function App() {
  return (
    <YMaps>
      <div className="h-screen w-screen bg-blue-100">
        <RouterProvider router={router} />
      </div>
    </YMaps>
  );
}

export default App;
