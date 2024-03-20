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
      <div className="h-52 w-52">
        <img
          className="h-full w-full object-contain"
          src={printer.photo}
          alt="printer"
          width="100px"
          height="100px"
        />
      </div>
      <div className="ml-5">
        <span className="rounded-full bg-gray-600 px-4 py-1 text-xs text-white">
          Ч/Б печать
        </span>
        <h2 className="mt-3 text-2xl font-bold">{printer.id}</h2>
        {location && (
          <>
            <span className="font-semibold text-gray-400">
              {location.address}
            </span>
            <p>{location.help_text}</p>
            <br />
          </>
        )}
        Стоимость: {printer.bw_price} руб/л
      </div>
    </div>
  );
}

export default PrinterInfoCard;
