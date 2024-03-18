import React, { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import axios from "axios";
import Sheet from "./Sheet";
import { Document, pdfjs, Thumbnail } from "react-pdf";
import { getPrinter } from "./api/printit";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export async function load({ params }) {
  return await getPrinter(params.printerCode);
}

export async function createOrder({ request }) {
  let formData = await request.formData();
  let res = await axios.post(
    `https://mongrel-careful-truly.ngrok-free.app/api/v1/orders?printer_code=${formData.get("printer_code")}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  window.location.href = res.data.payment.payment_url;
  return null;
}

function OrderCreationScreen() {
  const printer = useLoaderData();

  const [numPages, setNumPages] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setTotalPrice(numPages * printer.bw_price);
  }

  function handleFileSelect(event) {
    let file = event.target.files[0];
    // read bytes
    let reader = new FileReader();
    reader.onload = function (e) {
      setUploadedFile(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Sheet>
      <div className="min-w-96 bg-white">
        <div className="flex w-full">
          <div className="h-32 w-32">
            <img
              className="h-full w-full object-contain"
              src={printer.photo}
              alt="printer"
              width="100px"
              height="100px"
            />
          </div>
          <div className="ml-5">
            <h2 className="text-2xl font-bold">{printer.code}</h2>
            <p>Стоимость: {printer.bw_price} руб/л</p>
          </div>
        </div>
        <div>
          <Form method="post" encType="multipart/form-data">
            <label htmlFor="file" className="sr-only">
              Choose file
            </label>
            <input
              hidden
              type="text"
              name="printer_code"
              value={printer.code}
            />
            <input
              type="file"
              name="file"
              id="file"
              className="block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4
                        file:py-3 focus:z-10 focus:border-blue-500
                        focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              onChange={handleFileSelect}
            />
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
                <h3 className="font-semibold">Загруженный документ</h3>
                <Document
                  file={uploadedFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="pt-7"
                >
                  <Thumbnail className="w-full" pageNumber={1} height={300} />
                </Document>
              </div>
            )}
            <span className="mt-2 block">
              Итоговая стоимость: {numPages} л. x {printer.bw_price} руб. ={" "}
              {totalPrice}
            </span>
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
