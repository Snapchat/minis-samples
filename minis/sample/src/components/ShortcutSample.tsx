import type { Mini, Shortcut, ShortcutCreated } from "@snapchat/minis-sdk";
import { ClientEvents } from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

export const ShortcutSample = ({
  shortcut,
  mini,
}: {
  shortcut: Shortcut;
  mini: Mini;
}) => {
  const [result, setResult] = useState<string>("");
  const [event, setEvent] = useState<string>("");

  useEffect(() => {
    const createShortcutCompleteCb = (resp: ShortcutCreated) => {
      setEvent(
        `received ${ClientEvents.CREATE_SHORTCUT_COMPLETE}: ${JSON.stringify(
          resp
        )}`
      );
    };
    mini.on(ClientEvents.CREATE_SHORTCUT_COMPLETE, createShortcutCompleteCb);

    return () => {
      mini.unbind(
        ClientEvents.CREATE_SHORTCUT_COMPLETE,
        createShortcutCompleteCb
      );
    };
  }, [mini]);

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <p className="textstyle-body">Event</p>
        <p className="textstyle-subheader">{event}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              shortcut
                .canCreateShortcut()
                .then((res) => setResult(`canCreate: ${JSON.stringify(res)}`))
                .catch((err) =>
                  setResult(`canCreate error: ${JSON.stringify(err)}`)
                );
            }}
          >
            canCreateShortcut
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              shortcut
                .createShortcut()
                .then(() => setResult("createShortcut"))
                .catch((err) =>
                  setResult(`createShortcut error: ${JSON.stringify(err)}`)
                );
            }}
          >
            createShortcut
          </button>
        </div>
      </div>
    </div>
  );
};
