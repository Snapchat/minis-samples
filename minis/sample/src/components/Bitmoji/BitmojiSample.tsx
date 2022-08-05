/* eslint-disable @typescript-eslint/ban-ts-comment */
import "@google/model-viewer/dist/model-viewer";
import "./BitmojiSample.css";

import type { Bitmoji } from "@snapchat/minis-sdk";
import { AvatarVariants, Runtime, Test3dAvatarIds } from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

import { getAvatarOptions } from "../../utils/avatar";

const avatarSize = 192;

export const BitmojiSample = ({
  bitmoji,
  avatarId,
  runtime,
}: {
  bitmoji: Bitmoji;
  avatarId: string;
  runtime: Runtime;
}) => {
  const options: string[] = [
    avatarId,
    ...Test3dAvatarIds.filter((v: string) => v !== avatarId),
  ];
  const [currAvatarId, setCurrAvatarId] = useState<string>(avatarId);

  return (
    <>
      <div className="card">
        <div className="cell">
          <form>
            <label htmlFor="avatarId" className="textstyle-body">
              Avatar Id
            </label>
            <select
              id="avatarId"
              name="avatarId"
              value={currAvatarId}
              onChange={(event) => setCurrAvatarId(event.target.value)}
            >
              {options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option === avatarId
                      ? `${option} (current user)`
                      : `${option}`}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      </div>
      <Bitmoji2DSample bitmoji={bitmoji} avatarId={currAvatarId} />
      <Bitmoji3DSample
        bitmoji={bitmoji}
        avatarId={currAvatarId}
        runtime={runtime}
      />
    </>
  );
};

const Bitmoji2DSample = ({
  bitmoji,
  avatarId,
}: {
  bitmoji: Bitmoji;
  avatarId: string;
}) => {
  const options = getAvatarOptions();
  const [avatarValue, setAvatarValue] = useState<AvatarVariants>(
    AvatarVariants.HAPPY
  );
  const [avatar2DUrl, setAvatar2DUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const setup = async () => {
      const res = await bitmoji.fetchAvatar2D(
        avatarId,
        avatarValue,
        avatarSize
      );
      setAvatar2DUrl(res.url);
    };

    setup()
      .then(() => setResult("fetchAvatar2d success"))
      .catch((err) => setResult(`fetchAvatar2D error: ${JSON.stringify(err)}`));
  }, [avatarId, avatarValue, bitmoji]);

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
        {avatar2DUrl && (
          <img
            src={avatar2DUrl}
            alt={"failed to render avatarURL"}
            className="avatar"
          />
        )}
      </div>
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
        </div>
      </div>
    </div>
  );
};

const Bitmoji3DSample = ({
  bitmoji,
  avatarId,
  runtime,
}: {
  bitmoji: Bitmoji;
  avatarId: string;
  runtime: Runtime;
}) => {
  const [avatar3dURL, setAvatar3DURL] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const setup = async () => {
      const res = await bitmoji.fetchAvatar3D(avatarId);
      setAvatar3DURL(res.url);
    };

    if (runtime === Runtime.LOCAL && !Test3dAvatarIds.includes(avatarId)) {
      setResult(
        `Cannot fetch ${avatarId} on local. Please try one different from the current user's.`
      );
      setAvatar3DURL("");
      return;
    }

    setup()
      .then(() => setResult("fetchAvatar3d success"))
      .catch((err) => setResult(`fetchAvatar3d error: ${JSON.stringify(err)}`));
  }, [runtime, avatarId, bitmoji]);

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
        {avatar3dURL && (
          // @ts-ignore
          <model-viewer
            src={avatar3dURL}
            camera-controls={true}
            enable-pan={true}
          />
        )}
      </div>
      <div />
    </div>
  );
};
