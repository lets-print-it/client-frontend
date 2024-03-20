import axios from "axios";
import { Printer, Location, Order } from "../models/printit";

let client = axios.create({
  timeout: 20000,
  baseURL: "https://api.letsprintit.ru/api/v1/",
  // headers: {
  //   "ngrok-skip-browser-warning": "69420",
  // },
});

export async function getLocations(): Promise<Location[]> {
  // add headers for ngrok
  let res = await client.get("locations");
  return res.data;
}

export async function getPrinter(printerCode: string): Promise<Printer | null> {
  try {
    let res = await client.get(`printers/${printerCode}`);
    return res.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      return null;
    }
    throw e;
  }
}

export async function createOrder(
  printerCode: string,
  data: any,
): Promise<Order> {
  let res = await client.post(
    `api/v1/orders?printer_code=${printerCode}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
}

export async function confirmOrder(confirmationToken: string): Promise<Order> {
  let res = await client.get(`orders/confirm/${confirmationToken}`);
  return res.data;
}

export async function getOrder(orderId: string): Promise<Order> {
  let res = await client.get(`orders/${orderId}`);
  return res.data;
}

export async function leaveReview(
  orderId: string,
  rating: number,
  comment: string | null = null,
) {
  await client.post(`orders/${orderId}/review`, {
    rating: rating,
    comment: comment,
  });
}
