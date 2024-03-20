import React, { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import Sheet from "./Sheet/Sheet";
import { Document, pdfjs, Thumbnail } from "react-pdf";
import { createOrder, getPrinter } from "../api/printit";
import PrinterInfoCard from "./PrinterInfoCard/PrinterInfoCard";
import { Printer } from "../models/printit";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url,
// ).toString();

export async function load({ params }: { params: any }) {
  return await getPrinter(params.printerCode);
}

export async function createOrderAction({ request }: { request: any }) {
  let formData = await request.formData();

  let res = await createOrder(formData.get("printer_code"), formData);
  window.location.href = res.payment.payment_url;
  return null;
}

function OrderCreationScreen() {
  const printer = useLoaderData() as Printer;

  const [numPages, setNumPages] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setTotalPrice(numPages * printer.bw_price);
  }

  function handleFileSelect(event: any) {
    if (event.target.files[0].type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e: any) {
      setUploadedFile(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Sheet>
      <div className="min-w-96 bg-white">
        <PrinterInfoCard printer={printer} />
        <div>
          <Form method="post" encType="multipart/form-data">
            <label htmlFor="file" className="sr-only">
              Choose file
            </label>
            <input hidden type="text" name="printer_code" value={printer.id} />
            <input
              type="file"
              name="file"
              id="file"
              accept=".pdf"
              className="block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4
                        file:py-3 focus:z-10 focus:border-blue-500
                        focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              onChange={handleFileSelect}
            />
            <span className="mt-2 block text-sm text-gray-500">
              Поддерживаемые форматы: PDF
            </span>
            {/*<div className="flex items-start mb-5">*/}
            {/*    <div className="flex items-center h-5">*/}
            {/*        <input id="terms" type="checkbox" value=""*/}
            {/*               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>*/}
            {/*    </div>*/}
            {/*    <label htmlFor="terms"*/}
            {/*           className="ms-2 text-sm font-medium text-gray-900">Двухстороння печать</label>*/}
            {/*</div>*/}
            {/*<div className="flex items-start mb-5">*/}
            {/*    <div className="flex items-center h-5">*/}
            {/*        <input id="terms" type="checkbox" value=""*/}
            {/*               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>*/}
            {/*    </div>*/}
            {/*    <label htmlFor="terms"*/}
            {/*           className="ms-2 text-sm font-medium text-gray-900">Цветная печать</label>*/}
            {/*</div>*/}

            {uploadedFile !== null && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold">Загруженный документ</h3>
                <Document
                  file={uploadedFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="pt-7"
                >
                  <Thumbnail className="w-full" pageNumber={1} height={300} />
                </Document>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">Стоимость</h3>
              <span className="ml-2 mt-4 block">
                <span className="text-md font-semibold">{totalPrice} руб.</span>{" "}
                = {numPages} страницы x {printer.bw_price} руб.
              </span>
            </div>

            <br />
            <button
              type="submit"
              className="mt-1 h-12 w-32 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Print It!
            </button>
          </Form>
        </div>
      </div>
    </Sheet>
  );
}

export default OrderCreationScreen;
