"use client";

import InputBar from "./components/Inputs/InputBar";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "4rem",
        height: "100%",
      }}
    >
      <InputBar
        placeholder="Enter an URL"
        onSubmit={() => alert("URL Has been submitted")}
      />
    </div>
  );
}
