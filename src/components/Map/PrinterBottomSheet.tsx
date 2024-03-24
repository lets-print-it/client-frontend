import React from "react";
import { Location, Printer } from "../../models/printit";
import PrinterInfoCard from "../PrinterInfoCard/PrinterInfoCard";
import Button from "../elements/Button";

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
      <Button
        text="Выбрать принтер"
        onClick={onPrintButtonClick}
        className="mb-10"
      />
    </div>
  );
}

export default PrinterBottomSheet;
