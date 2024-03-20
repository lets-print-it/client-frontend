import React from "react";
import { Location, Printer } from "../../models/printit";

function PrinterInfoCard({
  printer,
  location,
}: {
  printer: Printer;
  location?: Location;
}) {
  return (
    <div className="flex">
      <div className="w-5/12 max-w-52">
        <img
          className="w-full object-contain"
          src={printer.photo}
          alt="printer"
        />
      </div>
      <div className="ml-5">
        <span className="rounded-full bg-gray-600 px-4 py-1 text-xs text-white">
          Ч/Б печать
        </span>
        <h2 className="mt-3 text-2xl font-bold">{printer.id}</h2>
        {location && (
          <>
            <p className="font-semibold text-gray-400">{location.address}</p>
            <p className="mt-3">{location.help_text}</p>
            <br />
          </>
        )}
        <span className="mr-4 font-bold">ЧБ печать</span> {printer.bw_price}{" "}
        руб/л
      </div>
    </div>
  );
}

export default PrinterInfoCard;
