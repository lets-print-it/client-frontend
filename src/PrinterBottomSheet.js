import React from "react";
import { useNavigate } from "react-router-dom";

function PrinterBottomSheet({ printer, location }) {
  const navigate = useNavigate();

  function onPrintButtonPress() {
    navigate("/code_enter");
  }

  return (
    <div className="flex h-72">
      <div className="h-52 w-52">
        <img
          className="h-full w-full object-contain"
          src={printer.photo}
          alt="printer image"
          width="100px"
          height="100px"
        />
      </div>
      <div className="ml-5">
        <span className="rounded-full bg-gray-600 px-4 py-1 text-xs text-white">
          Ч/Б печать
        </span>
        <h2 className="text-2xl font-bold">{printer.code}</h2>
        <span className="font-semibold text-gray-400">{location.address}</span>
        <p>{location.help_text}</p>
        <br />
        Стоимость: {printer.bw_price} руб/л
        <br />
        <br />
        <button
          onClick={onPrintButtonPress}
          className="h-12 w-52 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Print It!
        </button>
      </div>
    </div>
  );
}

export default PrinterBottomSheet;
