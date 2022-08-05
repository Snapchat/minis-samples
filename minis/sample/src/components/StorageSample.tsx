import type { Storage } from "@snapchat/minis-sdk";
import { Scope } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const StorageSample = ({ storage }: { storage: Storage }) => {
  const [result, setResult] = useState<string>("");
  const [storageScope, setStorageScope] = useState<Scope>(Scope.USER);
  const [collection, setCollection] = useState("testCollection");
  const [key, setKey] = useState("testKey");
  const [value, setValue] = useState("testValue");

  const setData = async () =>
    storage
      .setData(storageScope, collection, [{ key: key, value: value }])
      .then(() => setResult("setData success"))
      .catch((err) => setResult(`setData error: ${JSON.stringify(err)}`));

  const getData = async () =>
    storage
      .getData(storageScope, collection, [key])
      .then((res) =>
        setResult(
          `retrieved: ${
            res.responses[0].entry.value
              ? `key: ${res.responses[0].entry.key}: ${res.responses[0].entry.value}`
              : "no data found"
          }`
        )
      )
      .catch((err) => setResult(`getData error: ${JSON.stringify(err)}`));

  const scanData = async () =>
    storage
      .scanData(storageScope, collection)
      .then((res) =>
        setResult(
          `retrieved: ${res.responses.map(
            (a) => `${a.entry.key}:${a.entry.value}\n`
          )}`
        )
      )
      .catch((err) => setResult(`scanData error: ${JSON.stringify(err)}`));

  const deleteData = async () =>
    storage
      .deleteData(storageScope, collection, [key])
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
            <label htmlFor="scope">Scope</label>
            <select
              id="scope"
              name="scope"
              value={storageScope}
              onChange={(e) => setStorageScope(e.target.value as Scope)}
            >
              <option value={Scope.USER}>User</option>
              <option value={Scope.SESSION}>Session</option>
              <option value={Scope.APP}>App</option>
            </select>
            <label htmlFor="collection">Collection</label>
            <input
              type="text"
              id="collection"
              name="collectio"
              value={collection}
              onChange={(e) => setCollection(e.target.value as Scope)}
            />
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
            { f: scanData, name: "Scan" },
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
