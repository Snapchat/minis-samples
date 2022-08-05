import type {
  Bitmoji,
  LaunchInfo,
  Mini,
  ShareLensResponse,
  Sharing,
} from "@snapchat/minis-sdk";
import { AvatarVariants, ClientEvents, getBitmoji } from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

import { getAvatarOptions } from "../utils/avatar";

const getDataURL = (m: string) => {
  switch (m) {
    case "JPG":
      return "/assets/jpg_data_url.jpg";
    case "WEBP":
      return "/assets/webp_data_url.webp";
    case "PNG":
      return "/assets/png_data_url.png";
    default:
      return "/assets/gif_data_url.gif";
  }
};

const lensUUIDs: Record<string, string> = {
  dynamic: "98d64caaa83445ea80b3c1434caa0239",
  static: "d84eff13ba6f4f729138154533bc0477",
  connected: "e3549c51bb694f1bba9bc5f7c6a67404",
  payload: "91035edeab7d48c9951661bb12f429bd",
  badId: "bad-id",
};

export const SharingSample = ({
  sharing,
  mini,
}: {
  sharing: Sharing;
  mini: Mini;
}) => {
  const [result, setResult] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [path, setPath] = useState<string>("path");
  const [payload, setPayload] = useState<string>("payload");

  useEffect(() => {
    const didDismissLensCb = (resp: ShareLensResponse) => {
      setEvent(
        `received ${ClientEvents.DID_DISMISS_LENS}: ${resp.lensUUID} with payload: ${resp.payload}`
      );
    };
    mini.on(ClientEvents.DID_DISMISS_LENS, didDismissLensCb);

    return () => {
      mini.unbind(ClientEvents.DID_DISMISS_LENS, didDismissLensCb);
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
            <label htmlFor="path">Path</label>
            <input
              type="text"
              id="path"
              name="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
            <label htmlFor="payload">Payload</label>
            <input
              type="text"
              id="payload"
              name="payload"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </form>
        </div>
      </div>
      <TextAndImageSharing
        sharing={sharing}
        launchInfo={{ path, payload }}
        setResult={setResult}
        clearEvent={() => setEvent("")}
      />
      <BitmojiSharing
        sharing={sharing}
        bitmoji={getBitmoji()}
        avatarId={mini.user.avatarId}
        launchInfo={{ path, payload }}
        setResult={setResult}
        clearEvent={() => setEvent("")}
      />
    </div>
  );
};

const TextAndImageSharing = ({
  sharing,
  launchInfo,
  setResult,
  clearEvent,
}: {
  sharing: Sharing;
  launchInfo: LaunchInfo;
  setResult: (s: string) => void;
  clearEvent: () => void;
}) => {
  const [lensUUID, setLensUUID] = useState<string>(lensUUIDs.dynamic);
  const [enableFullScreenMode, setEnableFullScreenMode] =
    useState<boolean>(true);
  const [media, setMedia] = useState<string>("JPEG");
  const [dataURL, setDataURL] = useState<string>(getDataURL(media));

  return (
    <>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="share-media-type">Lens UUID</label>
            <select
              id="share-media-type"
              name="share-media-type"
              value={lensUUID}
              onChange={(e) => setLensUUID(e.target.value)}
            >
              {Object.entries(lensUUIDs).map(([k, v]) => {
                return (
                  <option value={v} key={k}>
                    {k}
                  </option>
                );
              })}
            </select>
            <label
              htmlFor="enableFullScreenMode"
              className="checkbox-container"
            >
              <input
                type="checkbox"
                id="enableFullScreenMode"
                checked={enableFullScreenMode}
                onChange={(e) => setEnableFullScreenMode(e.target.checked)}
              />
              enableFullScreenMode
            </label>
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              clearEvent();
              sharing
                .launchCameraWithLens(
                  lensUUID,
                  launchInfo,
                  { sample: "test" },
                  enableFullScreenMode
                )
                .then((res) =>
                  setResult(
                    `launchCameraWithLens success: ${JSON.stringify(res)}`
                  )
                )
                .catch((err) =>
                  setResult(
                    `launchCameraWithLens error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            launchCameraWithLens
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="share-media-type">Data</label>
            <select
              id="share-media-type"
              name="share-media-type"
              value={media}
              onChange={(e) => {
                setMedia(e.target.value);
                setDataURL(getDataURL(e.target.value));
                return;
              }}
            >
              <option value="JPG">JPG</option>
              <option value="PNG">PNG</option>
              <option value="WEBP">WEBP</option>
              <option value="GIF">GIF</option>
            </select>
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              clearEvent();
              sharing
                .sendShareCardToChat(
                  {
                    primaryImageUrl: dataURL,
                    headline: "testing headline",
                    description: "testing description",
                    actionCta: "testing share card CTA",
                  },
                  launchInfo
                )
                .then(() => setResult("sendShareCardToChat w/Text success"))
                .catch((err) =>
                  setResult(
                    `sendShareCardToChat w/Text error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            sendShareCardToChat w/Text
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              clearEvent();
              sharing
                .sendShareCardToChat(
                  {
                    primaryImageUrl: dataURL,
                    actionCta: "testing image share CTA",
                  },
                  launchInfo
                )
                .then(() => setResult("sendShareCardToChat w/Image success"))
                .catch((err) =>
                  setResult(
                    `sendShareCardToChat w/Image error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            sendShareCardToChat w/Image
          </button>
        </div>
      </div>
    </>
  );
};

const BitmojiSharing = ({
  sharing,
  bitmoji,
  avatarId,
  launchInfo,
  setResult,
  clearEvent,
}: {
  sharing: Sharing;
  bitmoji: Bitmoji;
  avatarId: string;
  launchInfo: LaunchInfo;
  setResult: (s: string) => void;
  clearEvent: () => void;
}) => {
  const options = getAvatarOptions();
  const [avatarValue, setAvatarValue] = useState<AvatarVariants>(
    AvatarVariants.HAPPY
  );

  return (
    <div className="cell">
      <div className="stack">
        <form>
          <label htmlFor="avatarVariant">Avatar Variant</label>
          <select
            id="avatarVariant"
            name="avatarVariant"
            value={avatarValue}
            onChange={(event) =>
              setAvatarValue(event.target.value as AvatarVariants)
            }
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </form>
        <button
          type="button"
          className="btn btn-md btn-primary"
          onClick={async () => {
            clearEvent();
            sharing
              .launchCameraWithStickers(
                [
                  {
                    mediaId: "fake-media-id",
                    dataUrl: (
                      await bitmoji.fetchAvatar2D(avatarId, avatarValue, 128)
                    ).url,
                    width: 128,
                    height: 128,
                  },
                ],
                launchInfo
              )
              .then(() =>
                setResult("launchCameraWithStickers w/Bitmoji success")
              )
              .catch((err) =>
                setResult(
                  `launchCameraWithStickers w/Bitmoji error: ${JSON.stringify(
                    err
                  )}`
                )
              );
          }}
        >
          launchCameraWithStickers w/Bitmoji
        </button>
        <button
          type="button"
          className="btn btn-md btn-primary"
          onClick={async () => {
            clearEvent();
            sharing
              .sendShareCardToChat(
                {
                  primaryImageDataUrl: (
                    await bitmoji.fetchAvatar2D(avatarId, avatarValue, 128)
                  ).url,
                  headline: `${avatarValue} headline`,
                  description: `${avatarValue} description`,
                  actionCta: `${avatarValue} testing image share CTA`,
                },
                launchInfo
              )
              .then(() =>
                setResult("shareShareCardToChat w/Bitmoji Text success")
              )
              .catch((err) =>
                setResult(
                  `shareShareCardToChat w/Bitmoji Text error: ${JSON.stringify(
                    err
                  )}`
                )
              );
          }}
        >
          shareShareCardToChat w/Bitmoji Text
        </button>
        <button
          type="button"
          className="btn btn-md btn-primary"
          onClick={async () => {
            clearEvent();
            sharing
              .sendShareCardToChat(
                {
                  primaryImageDataUrl: (
                    await bitmoji.fetchAvatar2D(avatarId, avatarValue, 128)
                  ).url,
                  actionCta: `${avatarValue} image share CTA`,
                },
                launchInfo
              )
              .then(() =>
                setResult("sendShareCardToChat w/Bitmoji Image success")
              )
              .catch((err) =>
                setResult(
                  `sendChatMessage w/Bitmoji Image error: ${JSON.stringify(
                    err
                  )}`
                )
              );
          }}
        >
          sendShareCardToChat w/Bitmoji Image
        </button>
      </div>
    </div>
  );
};
