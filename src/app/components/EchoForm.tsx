"use client";

import { useState } from "react";

export default function EchoForm() {
  const [text, setText] = useState("");
  const [echo, setEcho] = useState("");

  return (
    <form
      className="mt-6 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setEcho(text);
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="border rounded px-2 py-1"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
      >
        Echo
      </button>

      {echo && <p className="ml-4">You typed: {echo}</p>}
    </form>
  );
}
