"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 active:scale-95 transition"
      onClick={() => setCount((c) => c + 1)}
    >
      Counter clicked {count} times
    </button>
  );
}
