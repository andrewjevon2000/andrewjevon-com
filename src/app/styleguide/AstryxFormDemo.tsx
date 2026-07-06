"use client";

import { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";

export function AstryxFormDemo() {
  const [email, setEmail] = useState("");
  return (
    <div className="max-w-sm">
      <TextInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
      />
    </div>
  );
}
