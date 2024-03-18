import React from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import Sheet from "./Sheet";

function CodeEnterScreen(props) {
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  function handleQrResult(result, error) {
    if (!!result) {
      let text = result.text;
      // get only last part of url
      let code = text.split("/").pop();
      redirectToPrinter(code);
    }
  }

  function redirectToPrinter(printer_code) {
    navigate(`/printer/${printer_code}/new_order`, { replace: false });
  }

  return (
    <Sheet>
      <div className="flex w-72 flex-col items-center rounded-lg bg-white p-5">
        <h2 className="mb-5 text-xl font-bold">Отсканируйте QR-код</h2>
        <QrReader
          containerStyle={{ width: "100%", height: "200px" }}
          videoContainerStyle={{
            width: "100%",
            height: "200px",
            paddingTop: "0",
          }}
          videoStyle={{ width: "100%", height: "200px", display: "block" }}
          onResult={handleQrResult}
          constraints={{ facingMode: "environment" }}
        />

        <p className="mb-1 pt-7 text-xs text-gray-500">
          или введите код принтера вручную
        </p>
        <input
          value={input}
          onChange={handleInput}
          type="text"
          id="first_name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="AB07"
          required
        />
        <button
          onClick={() => redirectToPrinter(input)}
          className="group relative mb-2 me-2 mt-10 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
            Выбрать принтер
          </span>
        </button>
      </div>
    </Sheet>
  );
}

export default CodeEnterScreen;
