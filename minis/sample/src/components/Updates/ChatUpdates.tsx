import type { Updates } from "@snapchat/minis-sdk";
import { BitmojiVariants } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const ChatUpdates = ({ updates }: { updates: Updates }) => {
  const [id, setId] = useState<string>("testing1");
  const [a, setA] = useState<string>("A");
  const [b, setB] = useState<string>("movies");
  const [variant, setVariant] = useState<string>("USER");
  const [result, setResult] = useState<string>("");

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-title">Chat Update</p>
      </div>

      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <p className="textstyle-body">Content</p>
        <p className="textstyle-subheader">{"{A} watched {B}"}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="updateId">UpdateId</label>
            <input
              type="text"
              id="updateId"
              name="updateId"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="userA">A</label>
            <input
              type="text"
              id="userA"
              name="userA"
              placeholder="A"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
            <label htmlFor="userB">B</label>
            <input
              type="text"
              id="userB"
              name="userB"
              placeholder="B"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
            <label htmlFor="share-media-type">Bitmoji Variant</label>
            <select
              id="share-media-type"
              name="share-media-type"
              className="mb-2"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              <option value={BitmojiVariants.GROUP}>GROUP</option>
              <option value={BitmojiVariants.USER}>USER</option>
            </select>
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              updates
                .sendCustomChatMessage(
                  id,
                  {
                    A: a,
                    B: b,
                  },
                  variant as BitmojiVariants
                )
                .then(() => setResult("sendCustomChatMessage success"))
                .catch((err) =>
                  setResult(
                    `sendCustomChatMessage error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            sendCustomChatMessage
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              updates
                .sendCustomNotification(id, {
                  A: a,
                  B: b,
                })
                .then(() => setResult("sendCustomNotification success"))
                .catch((err) =>
                  setResult(
                    `sendCustomNotification error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            sendCustomNotification
          </button>
        </div>
      </div>
    </div>
  );
};
