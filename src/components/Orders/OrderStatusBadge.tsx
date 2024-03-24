import { Order } from "../../models/printit";
import { getStatusBadgeStyle, humanizeStatus } from "./formatters";
import React from "react";

export function OrderStatusBadge({
  order,
  className = "",
}: {
  order: Order;
  className?: string;
}) {
  return (
    <div
      className={`${className} ${getStatusBadgeStyle(order.status)} rounded-full px-4 py-1 text-xs font-bold text-white shadow
              `}
    >
      {humanizeStatus(order.status)}
    </div>
  );
}
