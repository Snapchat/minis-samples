import type { LocalStorage } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const LocalStorageSample = ({
  localStorage,
}: {
  localStorage: LocalStorage;
}) => {
  const [result, setResult] = useState<string>("");
  const [key, setKey] = useState("testKey");
  const [value, setValue] = useState("testValue");

  const setData = async () =>
    localStorage
      .setData({ [key]: value })
      .then(() => setResult("setData success"))
      .catch((err) => setResult(`setData error: ${JSON.stringify(err)}`));

  const getData = async () =>
    localStorage
      .getData([key])
      .then((res) => setResult(`getData: ${JSON.stringify(res)}`))
      .catch((err) => setResult(`getData error: ${JSON.stringify(err)}`));

  const deleteData = async () =>
    localStorage
      .deleteData([key])
      .then(() => setResult("deleteData success"))
      .catch((err) => setResult(`deleteData error: ${JSON.stringify(err)}`));

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="key">Key</label>
            <input
              type="text"
              id="key"
              name="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <label htmlFor="value">Value</label>
            <input
              type="text"
              id="value"
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
          {[
            { f: setData, name: "Set" },
            { f: getData, name: "Get" },
            { f: deleteData, name: "Delete" },
          ].map((a) => {
            return (
              <button
                key={a.name}
                type="button"
                className="btn btn-md btn-primary"
                onClick={a.f}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
