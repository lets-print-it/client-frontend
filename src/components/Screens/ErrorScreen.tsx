import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorScreen() {
  const error = useRouteError();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="mt-5 text-3xl font-bold">Случился сущий кошмар!</h1>
      <p className="mt-14 text-xl">
        Вы сломали сайт или то что Вы ищите не существует
      </p>
      {error !== null && (
        <p className="mt-10 px-20 text-center">
          Ошибка: {JSON.stringify(error)}
        </p>
      )}
    </div>
  );
}

export default ErrorScreen;
