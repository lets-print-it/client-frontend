import PrintersMap, { load } from "./PrintersMap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderCreationScreen, {
  createOrder,
  load as orderCreateLoad,
} from "./OrderCreationScreen";
import CodeEnterScreen from "./CodeEnterScreen";
import OrderConfirmation from "./OrderConfirmation";
import { YMaps } from "@pbe/react-yandex-maps";

const router = createBrowserRouter([
  {
    path: "/",
    loader: load,
    element: <PrintersMap />,
  },
  {
    path: "/printer/:printerCode/new_order",
    element: <OrderCreationScreen />,
    action: createOrder,
    loader: orderCreateLoad,
  },
  {
    path: "/code_enter",
    element: <CodeEnterScreen />,
  },
  {
    path: "/confirm_order/:confirmationToken",
    element: <OrderConfirmation />,
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
