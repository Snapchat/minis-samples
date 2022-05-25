import { useState } from "react";
import "./Storage.css";
import sc, { Scope } from "@snapchat/snapcanvas-sdk";
import type { App } from "@snapchat/snapcanvas-sdk";

export default function Storage({ app }: { app: App }) {
  const [info, setInfo] = useState("");
  const [storageScope, setStorageScope] = useState("USER");
  const [collection, setCollection] = useState("testCollection");
  const [key, setKey] = useState("testKey");
  const [value, setValue] = useState("testValue");

  const putData = () =>
    sc
      .cloudStorageSetData(storageScope as Scope, collection, [
        { key: key, value: value },
      ])
      .then((_) => setInfo("Data put"))
      .catch((e) => setInfo(`Failed to set data ${e}`));

  const getData = () =>
    sc
      .cloudStorageGetData(storageScope as Scope, collection, [key])
      .then((r) =>
        setInfo(
          `Retrieved: ${
            r.responses[0].entry.value
              ? r.responses[0].entry.value
              : "no data found"
          }`
        )
      )
      .catch((e) => setInfo(`Failed to get data ${e}`));

  const scanData = () =>
    sc
      .cloudStorageScanData(storageScope as Scope, collection)
      .then((r) =>
        setInfo(
          `Retrieved: ${r.responses.map(
            (a) => `${a.entry.key}:${a.entry.value}\n`
          )}`
        )
      )
      .catch((e) => setInfo(`Failed to scan data ${e}`));

  const deleteData = () =>
    sc
      .cloudStorageDeleteData(storageScope as Scope, collection, [key])
      .then((_) => setInfo("Data deleted"))
      .catch((e) => setInfo(`Failed to get data ${e}`));

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "25%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>Cloud Storage Sample</h1>
      <Info app={app} />
      &nbsp;&nbsp;
      <form>
        <label>Scope</label>
        <select
          value={storageScope}
          onChange={(e) => setStorageScope(e.target.value)}
        >
          <option value="USER">User</option>
          <option value="SESSION">Session</option>
          <option value="APP">App</option>
        </select>
        <label>Collection</label>
        <input
          type="text"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        />
        <label>Key</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <label>Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input type="button" value="Put" onClick={putData} />
        <input type="button" value="Get" onClick={getData} />
        <input type="button" value="Scan" onClick={scanData} />
        <input type="button" value="Delete" onClick={deleteData} />
      </form>
      {info && <div>{info}</div>}
    </div>
  );
}

function Info({ app }: { app: App }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>AppId</td>
          <td>{app?.id}</td>
        </tr>
        <tr>
          <td>SessionId</td>
          <td>{app?.sessionId}</td>
        </tr>
        <tr>
          <td>User Id</td>
          <td>{app?.user?.id}</td>
        </tr>
        <tr>
          <td>Env</td>
          <td>{app?.env}</td>
        </tr>
      </tbody>
    </table>
  );
}
