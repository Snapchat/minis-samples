import type {
  FocusResponse,
  LaunchInfo,
  Mini,
  SafeAreaUpdateResponse,
} from "@snapchat/minis-sdk";
import {
  ClientEvents,
  logEvent,
  LoggingEventParameters,
  LoggingEvents,
} from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

export const Home = ({
  mini,
  launchInfo,
}: {
  mini: Mini;
  launchInfo: LaunchInfo;
}) => {
  const [event, setEvent] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const volumeChangedCb = (volume: number) => {
      setEvent(`received ${ClientEvents.VOLUME_CHANGED}: ${volume}`);
    };
    mini.on(ClientEvents.VOLUME_CHANGED, volumeChangedCb);

    const didGainFocusCb = (resp: FocusResponse) => {
      setEvent(
        (e) =>
          `${e}\n` +
          `received ${ClientEvents.DID_GAIN_FOCUS}: ${JSON.stringify(resp)}`
      );
    };
    mini.on(ClientEvents.DID_GAIN_FOCUS, didGainFocusCb);

    const didLoseFocusCb = (resp: FocusResponse) => {
      // show gain focused then lose focus
      setEvent(
        `received ${ClientEvents.DID_LOSE_FOCUS}: ${JSON.stringify(resp)}`
      );
    };
    mini.on(ClientEvents.DID_LOSE_FOCUS, didLoseFocusCb);

    const didSafeAreaUpdateCb = (resp: SafeAreaUpdateResponse) => {
      setEvent(
        `received ${ClientEvents.SAFE_AREA_DID_UPDATE}: ${JSON.stringify(resp)}`
      );
    };
    mini.on(ClientEvents.SAFE_AREA_DID_UPDATE, didSafeAreaUpdateCb);

    return () => {
      mini.unbind(ClientEvents.VOLUME_CHANGED, volumeChangedCb);
      mini.unbind(ClientEvents.DID_GAIN_FOCUS, didGainFocusCb);
      mini.unbind(ClientEvents.DID_LOSE_FOCUS, didLoseFocusCb);
      mini.unbind(ClientEvents.SAFE_AREA_DID_UPDATE, didSafeAreaUpdateCb);
    };
  }, [mini]);

  return (
    <>
      <Info mini={mini} launchInfo={launchInfo} />
      <div className="card">
        <div className="cell">
          <p className="textstyle-body">Result</p>
          <p className="textstyle-subheader">{result}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Event</p>
          <p className="textstyle-subheader">
            {event.split("\n").map((e, i) => {
              return (
                <p key={i} className="event-list">
                  {e}
                </p>
              );
            })}
          </p>
        </div>
        <Methods
          mini={mini}
          setResult={setResult}
          clearEvent={() => setEvent("")}
        />
      </div>
    </>
  );
};

const Info = ({ mini, launchInfo }: { mini: Mini; launchInfo: LaunchInfo }) => {
  return (
    <>
      <div className="card">
        <div className="cell">
          <p className="textstyle-body">ProjectId</p>
          <p className="textstyle-subheader">{mini.projectId}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">SessionId</p>
          <p className="textstyle-subheader">{mini.sessionId}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Conversation Size</p>
          <p className="textstyle-subheader">{mini.conversationSize}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Context</p>
          <p className="textstyle-subheader">{mini.context}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Env</p>
          <p className="textstyle-subheader">{mini.env}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">User Id</p>
          <p className="textstyle-subheader">{mini.user.id}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Launch Info</p>
          <p className="textstyle-subheader">{JSON.stringify(launchInfo)}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">User Name</p>
          <p className="textstyle-subheader">{mini.user.name}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">User AvatarId</p>
          <p className="textstyle-subheader">{mini.user.avatarId}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Locale</p>
          <p className="textstyle-subheader">{mini.locale}</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Safe Area Insets</p>
          <p className="textstyle-subheader">
            {JSON.stringify(mini.safeAreaInsets)}
          </p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Window Safe Insets</p>
          <p className="textstyle-subheader">
            {JSON.stringify(mini.windowSafeAreaInsets)}
          </p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Volume</p>
          <p className="textstyle-subheader">{mini.volume}</p>
        </div>
      </div>
    </>
  );
};

const Methods = ({
  mini,
  setResult,
  clearEvent,
}: {
  mini: Mini;
  setResult: (s: string) => void;
  clearEvent: () => void;
}) => {
  // snapdev minis externalurl -p <projectId> register -u <url> to allowlist more
  const [url, setURL] = useState(
    "https://docs.snap.com/minis/getting-started/quick-start/#build-your-mini"
  );
  const [logEventName, setLogEventName] = useState<LoggingEvents>(
    LoggingEvents.ACHIEVEMENT_UNLOCKED
  );
  const [logParam, setLogParam] = useState<LoggingEventParameters>(
    LoggingEventParameters.CURRENCY
  );
  const [logKey, setLogKey] = useState("");

  const logEventOptions: { label: string; value: LoggingEvents }[] =
    Object.keys(LoggingEvents)
      .map((k) => {
        return { label: k, value: k as LoggingEvents };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  const logParamOptions: { label: string; value: LoggingEventParameters }[] =
    Object.keys(LoggingEventParameters)
      .map((k) => {
        return { label: k, value: k as LoggingEventParameters };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <div className="cell">
        <div className="stack">
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              clearEvent();
              mini
                .presentPrivacyPolicy()
                .then(() => setResult("privacy policy presented"))
                .catch((err) =>
                  setResult(
                    `privacy policy presented error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            presentPrivacyPolicy
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              clearEvent();
              mini
                .presentTermsOfService()
                .then(() => setResult("terms of service presented"))
                .catch((err) =>
                  setResult(
                    `present terms of service error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            presentTermsOfService
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="webpageUrl">Webpage URL</label>
            <input
              type="text"
              id="webpageUrl"
              name="webpageUrl"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              clearEvent();
              mini
                .presentWebpage(url)
                .then(() => setResult(`webpage: ${url} presented`))
                .catch((err) =>
                  setResult(`present webpage error: ${JSON.stringify(err)}`)
                );
            }}
          >
            presentWebpage
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="loggingEvent">Logging Event</label>
            <select
              id="loggingEvent"
              name="loggingEvent"
              value={logEventName}
              onChange={(e) => setLogEventName(e.target.value as LoggingEvents)}
            >
              {logEventOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <label htmlFor="loggingParameter">Logging Parameter</label>
            <select
              id="loggingParameter"
              name="loggingParameter"
              value={logParam}
              onChange={(e) =>
                setLogParam(e.target.value as LoggingEventParameters)
              }
            >
              {logParamOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <label htmlFor="loggingKey">Logging Key</label>
            <input
              type="text"
              id="loggingKey"
              name="loggingKey"
              value={logKey}
              onChange={(e) => setLogKey(e.target.value)}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              clearEvent();
              logEvent(logEventName, {
                [logParam]: logKey,
              })
                .then((res) => setResult(`logEvent: ${JSON.stringify(res)}`))
                .catch((err) =>
                  setResult(`logEvent error: ${JSON.stringify(err)}`)
                );
            }}
          >
            logEvent
          </button>
        </div>
      </div>
    </>
  );
};
