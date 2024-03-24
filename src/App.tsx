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

const router = createBrowserRouter([
  {
    path: "/",
    loader: load,
    element: <PrintersMap />,
  },
  {
    path: "/printer/:printerCode/new_order",
    element: <OrderCreationScreen />,
    loader: orderCreateLoad,
  },
  {
    path: "/code_enter",
    element: <CodeEnterScreen />,
  },
  {
    path: "/confirm_order/:confirmationToken",
    element: <OrderConfirmationScreen />,
  },
  {
    path: "/orders/:orderId",
    element: <OrderScreen />,
    loader: orderScreenLoad,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/orders",
    element: <OrdersHistoryScreen />,
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
