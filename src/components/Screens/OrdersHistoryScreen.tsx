import React, { useEffect, useState } from "react";
import Sheet from "../Sheet/Sheet";
import OrderCard from "../Orders/OrderCard";
import { useRecentOrdersStore } from "../../stores/useRecentOrdersStore";
import { Order } from "../../models/printit";
import { getOrder } from "../../api/printit";
import { useNavigate } from "react-router-dom";

function OrdersHistoryScreen() {
  const recentOrders = useRecentOrdersStore((state) => state.ordersId);
  const [orders, setOrders] = useState<Order[]>([]);
  const naviate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      let orders = await Promise.all(recentOrders.map((id) => getOrder(id)));
      setOrders(orders);
    }

    fetchOrders();
  }, []);

  return (
    <Sheet>
      <h1 className="text-xl font-bold">История заказов</h1>
      {orders.map((order) => (
        <OrderCard
          order={order}
          onClick={() => naviate(`/orders/${order.id}`)}
        />
      ))}
    </Sheet>
  );
}

export default OrdersHistoryScreen;
