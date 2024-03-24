import React from "react";
import { Order } from "../../models/printit";
import { getShortId } from "./formatters";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderCardProps {
  order: Order;
  onClick?: () => void | undefined;
}

function OrderCard({ order, onClick = undefined }: OrderCardProps) {
  return (
    <div
      onClick={onClick}
      className={"m-3" + (onClick !== undefined ? " hover:cursor-pointer" : "")}
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">Заказ #{getShortId(order.id)}</h3>
        <OrderStatusBadge order={order} />
      </div>
      <div className="mt-2">
        <div className="text-xs text-gray-400">Принтер: {order.printer_id}</div>
        <div className="text-xs text-gray-400">
          Страниц: {order.attachments.length}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
