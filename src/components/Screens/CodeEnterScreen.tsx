import React from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import Sheet from "../Sheet/Sheet";
import { getPrinter } from "../../api/printit";
import Button from "../elements/Button";
import { BottomSheet } from "react-spring-bottom-sheet";
import LoginOfferBottomSheet from "../Orders/LoginOfferBottomSheet";
import { useAuthStore } from "../../stores/useAuthStore";

function CodeEnterScreen() {
  const navigate = useNavigate();
  const [loginBottomSheet, setLoginBottomSheet] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const user = useAuthStore((state) => state.getUser());

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleQrResult(result: any, error: any) {
    if (!!result) {
      let text = result.text;
      let code = text.split("/").pop();
      setInput(code);
      handlePrinterSelection();
    }
  }

  async function handlePrinterSelection() {
    if (input.length === 0) {
      setErrorMessage("Введите код принтера");
      return;
    }

    if ((await getPrinter(input)) === null) {
      setErrorMessage("Принтер не найден");
      return;
    }

    if (!user) {
      setLoginBottomSheet(true);
      return;
    }

    redirectToPrinter(input);
  }

  async function redirectToPrinter(printerCode: string) {
    navigate(`/printers/${printerCode}/new_order`);
  }

  return (
    <Sheet>
      <div className="flex w-full flex-col items-center">
        <h2 className="mb-5 text-xl font-bold">Отсканируйте QR-код</h2>
        <QrReader
          videoContainerStyle={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            backgroundColor: "#dcdcdc",
          }}
          videoStyle={{ objectFit: "cover" }}
          constraints={{ facingMode: "environment" }}
          onResult={handleQrResult}
        />
        <p className="mb-1 pt-7 text-xs text-gray-500">
          или введите код принтера вручную
        </p>

        <input
          value={input}
          onChange={handleInput}
          type="text"
          id="first_name"
          className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm tracking-widest text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="AB07"
          required
        />
        {errorMessage && (
          <div className="mt-4 w-full rounded-lg bg-red-100 p-2 text-center text-sm text-red-500">
            {errorMessage}
          </div>
        )}
        <Button
          className="mb-2 mt-10"
          text="Выбрать принтер"
          onClick={() => handlePrinterSelection()}
        />
      </div>
      <BottomSheet
        open={loginBottomSheet}
        onDismiss={() => {
          setLoginBottomSheet(false);
        }}
      >
        {<LoginOfferBottomSheet callback={() => redirectToPrinter(input)} />}
      </BottomSheet>
    </Sheet>
  );
}

export default CodeEnterScreen;
