import React from 'react';
import {QrReader} from "react-qr-reader";
import {useNavigate} from "react-router-dom";
import Sheet from "./Sheet";

function CodeEnterScreen(props) {
    const navigate = useNavigate()
    const [input, setInput] = React.useState("")
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    function handleQrResult(result, error) {
        if (!!result) {
            let text = result.text;
            // get only last part of url
            let code = text.split("/").pop();
            redirectToPrinter(code);
        }
    }

    function redirectToPrinter(printer_code) {
        navigate(`/printer/${printer_code}/new_order`, {replace: false});
    }

    return (
        <Sheet>
            <div className="flex flex-col bg-white w-72 p-5 rounded-lg items-center">
                <h2 className="text-xl font-bold mb-5">Отсканируйте QR-код</h2>
                <QrReader
                    containerStyle={{width: "100%", height: "200px"}}
                    videoContainerStyle={{width: "100%", height: "200px", paddingTop: "0"}}
                    videoStyle={{width: "100%", height: "200px", display: "block"}}
                    onResult={handleQrResult}
                    constraints={{facingMode: "environment"}}/>

                <p className="text-gray-500 mb-1 text-xs pt-7">или введите код принтера вручную</p>
                <input value={input} onChange={handleInput}
                       type="text" id="first_name"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                       placeholder="AB07" required/>
                <button onClick={() => redirectToPrinter(input)}
                        className="relative inline-flex items-center justify-center p-0.5 mt-10 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    Выбрать принтер
                    </span>
                </button>
            </div>
        </Sheet>
    );
}

export default CodeEnterScreen;