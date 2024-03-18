import React from 'react';
import {useNavigate} from "react-router-dom";

function PrinterBottomSheet({printer, location}) {
    const navigate = useNavigate()

    function onPrintButtonPress() {
        navigate("/code_enter")
    }

    return (
        <div className="h-72 flex">
            <div className="h-52 w-52">
                <img className="w-full h-full object-contain"
                     src={printer.photo}
                     alt="printer image" width="100px" height="100px"
                />
            </div>
            <div className="ml-5">
                <span className="bg-gray-600 text-white text-xs px-4 rounded-full py-1">Ч/Б печать</span>
                <h2 className="text-2xl font-bold">{printer.code}</h2>
                <span className="font-semibold text-gray-400">{location.address}</span>
                <p>{location.help_text}</p>
                <br/>
                Стоимость: {printer.bw_price} руб/л
                <br/>
                <br/>

                <button onClick={onPrintButtonPress}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full w-52 h-12">
                    Print It!
                </button>
            </div>
        </div>
    );
}

export default PrinterBottomSheet;