import type { AdCompleteResponse, Ads, Mini } from "@snapchat/minis-sdk";
import { ClientEvents, Runtime } from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

export const AdsSample = ({ ads, mini }: { ads: Ads; mini: Mini }) => {
  const [result, setResult] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [requestId, setRequestId] = useState<string>(
    mini.runtime === Runtime.LOCAL ? "localTesting" : ""
  );

  const [slotId, setSlotId] = useState<string>("testing-slot");
  const [devPayload, setDevPayload] = useState<string>("devPayload");

  useEffect(() => {
    const adReady = (slotId: string) => {
      setEvent(`received ${ClientEvents.AD_READY}: ${slotId}`);
    };
    mini.on(ClientEvents.AD_READY, adReady);

    const adCompleteCB = (resp: AdCompleteResponse) => {
      setEvent(`received ${ClientEvents.AD_COMPLETE}: ${JSON.stringify(resp)}`);
      setRequestId(resp.requestId);
    };
    mini.on(ClientEvents.AD_COMPLETE, adCompleteCB);

    return () => {
      mini.unbind(ClientEvents.AD_READY, adReady);
      mini.unbind(ClientEvents.AD_COMPLETE, adCompleteCB);
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
          <form>
            <label htmlFor="slotId">Slot Id</label>
            <input
              type="text"
              id="slotId"
              name="slotId"
              value={slotId}
              onChange={(e) => {
                setSlotId(e.target.value);
              }}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              ads
                .initializeAds([slotId])
                .then((res) =>
                  setResult(`initializeAds: ${JSON.stringify(res)}`)
                )
                .catch((err) =>
                  setResult(`initializeAds error: ${JSON.stringify(err)}`)
                );
            }}
          >
            initializeAds
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              ads
                .isAdReady(slotId)
                .then((res) => setResult(`isAdReady: ${JSON.stringify(res)}`))
                .catch((err) =>
                  setResult(`isAdReady error: ${JSON.stringify(err)}`)
                );
            }}
          >
            isAdReady
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="devPayload">Dev Payload</label>
            <input
              type="text"
              id="devPayload"
              name="devPayload"
              value={devPayload}
              onChange={(e) => {
                setDevPayload(e.target.value);
              }}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              ads
                .watchAd(slotId, devPayload)
                .then((res) => {
                  setResult(`watchAd: ${JSON.stringify(res)}`);
                  setRequestId(res.requestId);
                  return;
                })
                .catch((err) =>
                  setResult(`watchAd error: ${JSON.stringify(err)}`)
                );
            }}
          >
            watchAd
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              ads
                .getUnconsumedAds()
                .then((res) => {
                  setResult(`unconsumedAds: ${JSON.stringify(res)}`);
                  setRequestId(res.unconsumedAds[0]?.requestId ?? "");
                  return;
                })
                .catch((err) =>
                  setResult(`unconsumedAds error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getUnconsumedAds
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="requestId">RequestId</label>
            <input
              type="text"
              id="requestId"
              name="requestId"
              value={requestId}
              onChange={(e) => {
                setRequestId(e.target.value);
              }}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              setEvent("");
              ads
                .consumeAd(requestId)
                .then(() => {
                  setResult("consumeAd success");
                  setRequestId("");
                  return;
                })
                .catch((err) =>
                  setResult(`consumeAd error: ${JSON.stringify(err)}`)
                );
            }}
          >
            consumeAd
          </button>
        </div>
      </div>
    </div>
  );
};
