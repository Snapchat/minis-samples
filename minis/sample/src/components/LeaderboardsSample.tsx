import type {
  LeaderboardEventResponse,
  Leaderboards,
  Mini,
} from "@snapchat/minis-sdk";
import { ClientEvents } from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

export const LeaderboardsSample = ({
  leaderboard,
  mini,
}: {
  leaderboard: Leaderboards;
  mini: Mini;
}) => {
  // Create one in the Developer Portal
  const [id, setId] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [event, setEvent] = useState<string>("");

  useEffect(() => {
    const didPresentCb = (resp: LeaderboardEventResponse) => {
      setEvent(
        `received ${ClientEvents.DID_PRESENT_LEADERBOARD}: ${resp.leaderboardId}`
      );
    };
    mini.on(ClientEvents.DID_PRESENT_LEADERBOARD, didPresentCb);

    const didDismissCb = (resp: LeaderboardEventResponse) => {
      setEvent(
        (e) =>
          `${e}\n` +
          `received ${ClientEvents.DID_DISMISS_LEADERBOARD}: ${resp.leaderboardId}`
      );
    };
    mini.on(ClientEvents.DID_DISMISS_LEADERBOARD, didDismissCb);

    return () => {
      mini.unbind(ClientEvents.DID_PRESENT_LEADERBOARD, didPresentCb);
      mini.unbind(ClientEvents.DID_DISMISS_LEADERBOARD, didDismissCb);
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
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="leaderboardId">LeaderboardId</label>
            <input
              type="text"
              id="leaderboardId"
              name="leaderboardId"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="score">Score</label>
            <input
              type="number"
              id="score"
              name="score"
              value={score}
              onChange={(e) => {
                setScore(Number.parseInt(e.target.value));
              }}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              setEvent("");
              leaderboard
                .presentLeaderboard(id)
                .then(() => setResult("presentLeaderboard success"))
                .catch((err) =>
                  setResult(`presentLeaderboard error: ${JSON.stringify(err)}`)
                );
            }}
          >
            presentLeaderboard
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              setEvent("");
              leaderboard
                .submitScore(id, score)
                .then(() => setResult("submitScore success"))
                .catch((err) =>
                  setResult(`submitScore error: ${JSON.stringify(err)}`)
                );
            }}
          >
            submitScore
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              leaderboard
                .getScores(id, mini.user.id)
                .then((resp) => setResult(JSON.stringify(resp, undefined, 4)))
                .catch((err) =>
                  setResult(`getScores error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getScores
          </button>
        </div>
      </div>
    </div>
  );
};
