export interface Printer {
  code: string;
  location_id: string;
  color: boolean;
  duplex: boolean;
  paper_left: number;
  photo: string; // replace with photo url
  bw_price: number;
  bw_duplex_price: number;
  color_price: number;
  color_duplex_price: number;
}

export interface Location {
  id: string;
  longitude: number;
  latitude: number;
  photo: string; // replace with photo url
  help_text: string;
  address: string;
  printers: Printer[];
}

export enum OrderStatus {
  AwaitingPayment = "awaiting_payment",
  AwaitingPrinting = "awaiting_printing",
  Printing = "printing",
  Completed = "completed",
  Canceled = "canceled",
}

export enum PaymentStatus {
  Created = "created",
  Confirmed = "confirmed",
  Canceled = "canceled",
}

export interface OrderPayment {
  order_id: string;
  amount: string;
  id: string;
  status: PaymentStatus;
  payment_url: string;
}

export interface Order {
  user_id: string | null;
  printer_code: string;
  id: string;
  total: string;
  status: OrderStatus;
  attachments: OrderAttachment[];
  payment: OrderPayment;
}

export interface OrderAttachment {
  id: string;
  order_id: string;
  file_path: string;
  duplex: boolean;
  color: boolean;
  pages: number;
}
