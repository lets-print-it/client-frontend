import React from "react";
import Sheet from "../Sheet/Sheet";
import { useAuthStore } from "../../stores/useAuthStore";
import { Navigate } from "react-router-dom";

function ProfileScreen() {
  const user = useAuthStore((state) => state.getUser());

  return (
    <>
      {user === null ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <Sheet>
          <h1 className="text-xl font-bold">Профиль</h1>
          <div className="mt-5">
            <h2 className="font-bold">Информация о пользователе</h2>
            <div className="mt-2 text-gray-500">
              <p>Иван Иванов</p>
              <p>ev@mai.ru</p>
              <p>TG: 123456789</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="font-bold">Почта для чеков</h2>
            <div className="mt-2">
              <label
                htmlFor="search"
                className="sr-only mb-2 text-sm font-medium text-gray-900"
              >
                Адрес электронной почты
              </label>
              <input
                type="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder=" example@email.com"
                required
              />
            </div>
          </div>
          {/*<div className="mt-6">*/}
          {/*  <h2 className="font-bold">Платежная информация</h2>*/}
          {/*  <p className="mt-2 text-gray-500">*/}
          {/*    Баланс: 0 руб.{" "}*/}
          {/*    <button onClick={() => alert(1)} className="text-blue-500">*/}
          {/*      (активировать промокод)*/}
          {/*    </button>*/}
          {/*  </p>*/}
          {/*</div>*/}
          <div className="mt-12 flex flex-col content-center items-center">
            <button className="w-60 rounded-xl bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
              Сохранить
            </button>
            <button className="mt-5 text-sm font-semibold text-red-500 hover:text-red-700">
              Выйти
            </button>
          </div>
        </Sheet>
      )}
    </>
  );
}

export default ProfileScreen;
