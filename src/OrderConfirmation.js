import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrderConfirmation(props) {
  let { confirmationToken } = useParams();

  const confirmOrder = async (token) => {
    let res = await axios.get(
      `http://10.74.1.93:8000/api/v1/orders/confirm?confirmation_token=${token}`,
    );
    alert(res.data.message);
  };

  useEffect(() => {
    confirmOrder(confirmationToken);
  }, [confirmationToken]);

  return <div></div>;
}

export default OrderConfirmation;
