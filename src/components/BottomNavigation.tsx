import React from "react";
import { useNavigate } from "react-router-dom";

function BottomNavigation() {
  const navigate = useNavigate();
  return (
    <div className="z-1 fixed bottom-10 left-1/2 h-16 w-full max-w-sm -translate-x-1/2 rounded-full border border-gray-200 bg-white">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3">
        <button
          onClick={() => navigate("/orders")}
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="group inline-flex flex-col items-center  justify-center rounded-s-full px-5 hover:bg-gray-50"
        >
          <svg
            className="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
          </svg>
          <span className="sr-only">Заказы</span>
        </button>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-950 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 "
        >
          Wallet
          <div className="tooltip-arrow" data-popper-arrow=""></div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate("/code_enter")}
            data-tooltip-target="tooltip-new"
            type="button"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            <svg
              className="h-4 w-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-950 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 "
        >
          Новый заказ
          <div className="tooltip-arrow" data-popper-arrow=""></div>
        </div>
        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="group inline-flex flex-col items-center justify-center rounded-e-full px-5 hover:bg-gray-50"
        >
          <svg
            className="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <span className="sr-only">Profile</span>
        </button>
        <div
          id="tooltip-profile"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-950 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
        >
          Профиль
          <div className="tooltip-arrow" data-popper-arrow=""></div>
        </div>
      </div>
    </div>
  );
}

export default BottomNavigation;
