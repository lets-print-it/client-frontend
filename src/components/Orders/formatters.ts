import { OrderStatus } from "../../models/printit";

export function getShortId(id: string) {
  return id.slice(-5).toUpperCase();
}

export function getStatusBadgeStyle(status: OrderStatus): string {
  switch (status) {
    case "awaiting_payment":
      return "bg-green-600";
    case "awaiting_printing":
      return "bg-gray-600";
    case "printing":
      return "bg-blue-500";
    case "completed":
      return "bg-blue-200";
    case "canceled":
      return "bg-red-500";
  }
  return "bg-red-500";
}

export function humanizeStatus(status: OrderStatus): string {
  switch (status) {
    case "awaiting_payment":
      return "Ожидает оплаты";
    case "awaiting_printing":
      return "В очереди на печать";
    case "printing":
      return "Печатается";
    case "completed":
      return "Выполнен";
    case "canceled":
      return "Отменен";
  }
  return "ERROR #173";
}
