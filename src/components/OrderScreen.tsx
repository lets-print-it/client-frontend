import React, { useEffect } from "react";
import Sheet from "./Sheet/Sheet";
import { getOrder, getPrinter, leaveReview } from "../api/printit";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Order, OrderStatus } from "../models/printit";

export async function load({ params }: { params: any }) {
  return await getOrder(params.orderId);
}

function getShortId(id: string) {
  return id.slice(-5).toUpperCase();
}

function getStatusBadgeStyle(status: OrderStatus): string {
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

function humanizeStatus(status: OrderStatus): string {
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

function OrderScreen() {
  let revalidator = useRevalidator();

  useEffect(() => {
    let interval = setInterval(() => {
      if (revalidator.state === "idle") {
        revalidator.revalidate();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const order = useLoaderData() as Order;
  const [starsStatus, setStarsStatus] = React.useState<number>(0);

  function handleStarClick(star: number) {
    leaveReview(order.id, star);
    setStarsStatus(star);
  }

  return (
    <Sheet className="min-w-96">
      {order && (
        <>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Информация о заказе</h1>
              <h1 className="text-xl font-semibold text-gray-400">
                #{getShortId(order.id)}
              </h1>
            </div>
            <div
              className={`${getStatusBadgeStyle(order.status)} mt-3 inline-flex rounded-full px-4 py-1 text-xs font-bold text-white shadow
              `}
            >
              {humanizeStatus(order.status)}
            </div>
            <h2 className="mt-5 text-xl font-semibold">Принтер</h2>
            <p className="mt-2 text-gray-400">Код: {order.printer_id}</p>
            <h2 className="mt-5 text-xl font-semibold">Файлы</h2>
            {order.attachments.map((attachment, index) => (
              <div
                key={attachment.id}
                className="mt-3 rounded bg-gray-100 px-4 py-2 text-gray-500 shadow"
              >
                Файл {index + 1} (страниц: {attachment.pages})
              </div>
            ))}
            <h2 className="mt-5 text-xl font-semibold">Оплата</h2>
            <p className="mt-2 text-gray-400">Сумма: {order.total} ₽</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold">Оцените нас!</h2>
            <p className="text-gray-400">
              Мы запустили этот проект совсем недавно и нам очень нужна Ваша
              обратная связь :)
            </p>
            <div className="mt-5 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  className={`${star <= starsStatus ? "text-yellow-300" : "text-gray-300"} } mx-1
                    
                  mb-6 ms-2 h-8 w-8 cursor-pointer`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  onClick={() => handleStarClick(star)}
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            {/*<textarea*/}
            {/*  rows={3}*/}
            {/*  className="mt-5 block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "*/}
            {/*  placeholder="Если есть что сказать... :)"*/}
            {/*></textarea>*/}
          </div>
        </>
      )}
    </Sheet>
  );
}

export default OrderScreen;
