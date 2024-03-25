import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Sheet from "../Sheet/Sheet";
import { Document, pdfjs, Thumbnail } from "react-pdf";
import { createOrder, getPrinter } from "../../api/printit";
import PrinterInfoCard from "../PrinterInfoCard/PrinterInfoCard";
import { Printer } from "../../models/printit";
import Button from "../elements/Button";
import { useRecentOrdersStore } from "../../stores/useRecentOrdersStore";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url,
// ).toString();

export async function load({ params }: { params: any }) {
  let res = await getPrinter(params.printerCode);
  if (res === null) {
    throw new Response(`Принтер ${params.printerCode} не найден`, {
      status: 404,
    });
  }
}

function OrderCreationScreen() {
  const printer = useLoaderData() as Printer;
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [file, setFile] = useState(null);
  const addRecentOrder = useRecentOrdersStore((state) => state.addOrder);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setTotalPrice(numPages * printer.bw_price);
  }

  async function createNewOrder() {
    if (!file) {
      setErrorMessage("Выберите файл для печати");
      return;
    }
    try {
      let res = await createOrder(printer.id, file);
      addRecentOrder(res.id);
      window.location.href = res.payment.payment_url;
    } catch (e: any) {
      if (e.response.status >= 400 && e.response.status < 500) {
        setErrorMessage(e.response.data);
        return null;
      }
    }
  }

  function handleCreateButton() {
    createNewOrder();
  }

  function handleFileSelect(event: any) {
    if (event.target.files[0].type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e: any) {
      setFileData(e.target.result);
    };
    reader.readAsDataURL(file);

    setFile(event.target.files[0]);
  }

  return (
    <Sheet>
      <PrinterInfoCard printer={printer} />
      <div>
        <div className="mt-4">
          {errorMessage && (
            <div className="w-full rounded-lg bg-red-100 p-2 text-center text-sm text-red-500">
              {errorMessage}
            </div>
          )}
          <label htmlFor="file" className="sr-only">
            Выберите файл
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            className="mt-3 block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4
                        file:py-3 focus:z-10 focus:border-blue-500
                        focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            onChange={handleFileSelect}
          />
          <span className="mt-2 block text-sm text-gray-500">
            Поддерживаемые форматы: PDF
          </span>
        </div>
        {fileData !== null && (
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Загруженный документ</h3>
            <Document
              file={fileData}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pt-7"
            >
              <Thumbnail pageNumber={1} height={300} />
            </Document>
          </div>
        )}
        <div>
          <h3 className="mt-7 text-xl font-semibold">Стоимость</h3>
          <span className="mt-4 block">
            <span className="text-md font-semibold">{totalPrice} руб.</span> ={" "}
            {numPages} страницы x {printer.bw_price} руб.
          </span>
        </div>

        <br />
        {/* TODO: redo this one day (problem with "block" on button) */}
        <div className="flex justify-center">
          <Button
            text="Печатать"
            className="ml mt-1 block "
            onClick={handleCreateButton}
          />
        </div>
      </div>
    </Sheet>
  );
}

export default OrderCreationScreen;
