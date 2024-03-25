import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Sheet from "./Sheet/Sheet";

function Shortener() {
  const { printerId } = useParams() as { printerId: string };
  return (
    <Sheet>
      <h1 className="font-bold">Переадресация...</h1>
      <Navigate to={`/printers/${printerId}/new_order`} replace={true} />
    </Sheet>
  );
}

export default Shortener;
