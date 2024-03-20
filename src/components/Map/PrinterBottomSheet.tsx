import React from "react";
import { useNavigate } from "react-router-dom";
import { Location, Printer } from "../../models/printit";
import PrinterInfoCard from "../PrinterInfoCard/PrinterInfoCard";

function PrinterBottomSheet({
  printer,
  location,
  onPrintButtonClick,
}: {
  printer: Printer;
  location: Location;
  onPrintButtonClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <PrinterInfoCard printer={printer} location={location} />
      <button
        onClick={onPrintButtonClick}
        className="mb-10 h-12 w-52 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Выбрать принтер
      </button>
    </div>
  );
}

export default PrinterBottomSheet;
