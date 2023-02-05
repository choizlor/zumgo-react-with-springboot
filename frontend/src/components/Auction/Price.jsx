import React, { useEffect, useState } from "react";

export default function Price({ handleBidPrice }) {
  return (
    <div>
      <button
        onClick={() => {
        //   setPrice(100);
          handleBidPrice(100);
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
        //   setPrice(500);
          handleBidPrice(500);
        }}
      >
        +500
      </button>
      <button
        onClick={() => {
        //   setPrice(1000);
          handleBidPrice(1000);
        }}
      >
        +1000
      </button>
    </div>
  );
}
