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
  return await getPrinter(params.printerCode);
}

function OrderCreationScreen() {
  const printer = useLoaderData() as Printer;

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
    let res = await createOrder(printer.id, file);
    addRecentOrder(res.id);
    window.location.href = res.payment.payment_url;
    return null;
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
        <label htmlFor="file" className="sr-only">
          Choose file
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept=".pdf"
          className="mt-6 block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4
                        file:py-3 focus:z-10 focus:border-blue-500
                        focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          onChange={handleFileSelect}
        />
        <span className="mt-2 block text-sm text-gray-500">
          Поддерживаемые форматы: PDF
        </span>
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
