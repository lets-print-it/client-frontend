import React from "react";

function Sheet({
  children,
  className = "",
}: {
  children: any;
  className?: string;
}) {
  return (
    <div className="flex w-screen justify-center">
      <div className="my-5 w-11/12 max-w-md">
        <div className={`${className} rounded-lg bg-white p-5`}>{children}</div>
      </div>
    </div>
  );
}

export default Sheet;
