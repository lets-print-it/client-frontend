import React from "react";

function Sheet({
  children,
  className = "",
}: {
  children: any;
  className?: string;
}) {
  return (
    <div className="flex h-screen w-screen justify-center bg-blue-100">
      <div className="max-w-lg pt-7">
        <div className={`${className} rounded-lg bg-white p-5`}>{children}</div>
      </div>
    </div>
  );
}

export default Sheet;
