import React from "react";
import TelegramLoginButton from "../TelegramLoginButton/TelegramLoginButton";
import Button from "../elements/Button";

function LoginOfferBottomSheet({ callback }: { callback: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-2 text-xl font-bold">Авторизуйтесь в системе</h1>
      <p className="mt-4 text-center text-gray-500">
        Чтобы копить бонусы и сохранять историю заказов
      </p>
      <div className="mt-6 flex justify-center">
        <TelegramLoginButton
          botName="letsprintit_bot"
          // dataOnauth={(user: any) => alert(JSON.stringify(user))}
          dataOnauth={(_: any) => callback()}
          dataSize="large"
          requestAccess="write"
        />
      </div>
      <Button
        text="Продолжить без авторизации"
        className="mt-9к"
        onClick={callback}
      />
      <p className="mb-5 mt-9 text-xs text-gray-400">
        Продолжая, вы соглашаетесь с{" "}
        <a href="#" className="underline">
          политикой конфиденциальности
        </a>
      </p>
    </div>
  );
}

export default LoginOfferBottomSheet;
