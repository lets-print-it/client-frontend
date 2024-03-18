import React from "react";

function Sheet(props) {
  return (
    <div className="flex h-screen w-screen justify-center bg-blue-100">
      <div className="max-w-lg pt-7">
        <div className="rounded-lg bg-white p-5">{props.children}</div>
      </div>
    </div>
  );
}

export default Sheet;
