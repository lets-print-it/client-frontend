import React from "react";
import TelegramLoginButton from "../TelegramLoginButton/TelegramLoginButton";
import Sheet from "../Sheet/Sheet";

function LoginScreen() {
  return (
    <Sheet className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mt-5 text-xl font-bold">Авторизация</h1>
        <p className="mt-4 text-center text-gray-500">
          Используйте аккаунт в Telegram для
          <br />
          авторизации в Printit
        </p>
        <div className="mt-14 flex justify-center">
          <TelegramLoginButton
            botName="letsprintit_bot"
            dataOnauth={(user: any) => alert(JSON.stringify(user))}
            dataSize="large"
            requestAccess="write"
          />
        </div>
        <p className="mt-20 text-xs text-gray-300">
          Продолжая, вы соглашаетесь с{" "}
          <a href="#" className="underline">
            политикой конфиденциальности
          </a>
        </p>
      </div>
    </Sheet>
  );
}

export default LoginScreen;
