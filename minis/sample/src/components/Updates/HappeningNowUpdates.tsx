import type { Mini, Updates } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const HappeningNowUpdates = ({
  updates,
  mini,
}: {
  updates: Updates;
  mini: Mini;
}) => {
  const [hnUpdateId, setHNUpdateId] = useState<string>(
    "c9f0b4ca-6953-4d43-98b0-1e46c3317175"
  );
  const [a, setA] = useState<string>("A");
  const [b, setB] = useState<string>("movies");
  const [result, setResult] = useState<string>("");
  const [thumbnailType, setThumbnailType] = useState<string>("BITMOJI");
  const [includeSelf, setIncludeSelf] = useState<boolean>(false);

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-title">Happening Now Update</p>{" "}
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
            <label htmlFor="hnUpdateId">UpdateId</label>
            <input
              type="text"
              id="hnUpdateId"
              name="hnUpdateId"
              value={hnUpdateId}
              onChange={(e) => setHNUpdateId(e.target.value)}
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
            <label htmlFor="thumbnailType">Thumbnail Type</label>
            <select
              id="thumbnailType"
              name="thumbnailType"
              value={thumbnailType}
              onChange={(e) => setThumbnailType(e.target.value)}
            >
              <option value={"BITMOJI"}>BITMOJI</option>
              <option value={"IMAGE"}>IMAGE</option>
            </select>
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              const thumbnail =
                thumbnailType === "BITMOJI"
                  ? {
                      userId: mini.user.id,
                    }
                  : {
                      // test image url
                      url: "https://cf-st.sc-cdn.net/d/nlXu8FO7nalsLObRf7w5Q?bo=EhQaABoAMgIEfUgCUAhaBAjFgQNgAQ%3D%3D&uc=8",
                    };

              updates
                .sendHappeningNowUpdateToSelf(
                  hnUpdateId,
                  {
                    A: a,
                    B: b,
                  },
                  thumbnail
                )
                .then(() => setResult("sendHappeningNowToSelf success"))
                .catch((err) =>
                  setResult(
                    `sendHappeningNowUpdateToSelf error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            sendHappeningNowUpdateToSelf
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              const thumbnail =
                thumbnailType === "BITMOJI"
                  ? {
                      userId: mini.user.id,
                    }
                  : {
                      // test image url
                      url: "https://cf-st.sc-cdn.net/d/nlXu8FO7nalsLObRf7w5Q?bo=EhQaABoAMgIEfUgCUAhaBAjFgQNgAQ%3D%3D&uc=8",
                    };

              updates
                .sendHappeningNowUpdateToFriends(
                  hnUpdateId,
                  {
                    A: a,
                    B: b,
                  },
                  thumbnail
                )
                .then(() => setResult("sendHappeningNowToFriends success"))
                .catch((err) =>
                  setResult(
                    `sendHappeningNowUpdateToFriends error: ${JSON.stringify(
                      err
                    )}`
                  )
                );
            }}
          >
            sendHappeningNowUpdateToFriends
          </button>
        </div>
        <div className="stack">
          <form>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={includeSelf}
                onChange={() => {
                  setIncludeSelf(!includeSelf);
                }}
              />
              Include Self
            </label>
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              const thumbnail =
                thumbnailType === "BITMOJI"
                  ? {
                      userId: mini.user.id,
                    }
                  : {
                      // test image url
                      url: "https://cf-st.sc-cdn.net/d/nlXu8FO7nalsLObRf7w5Q?bo=EhQaABoAMgIEfUgCUAhaBAjFgQNgAQ%3D%3D&uc=8",
                    };

              updates
                .sendHappeningNowUpdateToConversation(
                  hnUpdateId,
                  includeSelf,
                  {
                    A: a,
                    B: b,
                  },
                  thumbnail
                )
                .then(() => setResult("sendHappeningNowToConversation success"))
                .catch((err) =>
                  setResult(
                    `sendHappeningNowUpdateToConversation error: ${JSON.stringify(
                      err
                    )}`
                  )
                );
            }}
          >
            sendHappeningNowUpdateToConversation
          </button>
        </div>
      </div>
    </div>
  );
};
