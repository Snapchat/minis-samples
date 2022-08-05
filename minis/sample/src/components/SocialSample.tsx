import type { Social } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const SocialSample = ({ social }: { social: Social }) => {
  const [result, setResult] = useState<string>("");
  const [friendId, setFriendId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="friendId">FriendId</label>
            <input
              type="text"
              id="friendId"
              name="friendId"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
            <label htmlFor="sessionId">SessionId</label>
            <input
              type="text"
              id="sessionId"
              name="sessionId"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              social
                .playWithFriends(32)
                .then((res) =>
                  setResult(`playWithFriends: ${JSON.stringify(res)}`)
                )
                .catch((err) =>
                  setResult(`playWithFriends error: ${JSON.stringify(err)}`)
                );
            }}
          >
            playWithFriends
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              social
                .discoverFriends()
                .then((res) => {
                  setResult(`discoverFriends: ${JSON.stringify(res)}`);
                  if (res.friends.length > 0) {
                    setFriendId(res.friends[0].id);
                  }
                  return;
                })
                .catch((err) =>
                  setResult(`discoverFriends error: ${JSON.stringify(err)}`)
                );
            }}
          >
            discoverFriends
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              social
                .getParticipants([sessionId])
                .then((res) => {
                  setResult(`getParticipants: ${JSON.stringify(res)}`);
                  return;
                })
                .catch((err) =>
                  setResult(`getParticipants error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getParticipants
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              social
                .getSessions()
                .then((res) => {
                  setResult(`getSessions: ${JSON.stringify(res)}`);
                  if (res.sessions.length > 0) {
                    setSessionId(res.sessions[0].sessionId);
                  }
                  return;
                })
                .catch((err) =>
                  setResult(`getSession error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getSessions
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              social
                .switchToFriend(friendId)
                .then((res) =>
                  setResult(`switch to friend with sessionId: ${res.sessionId}`)
                )
                .catch((err) =>
                  setResult(`switchToFriend: ${JSON.stringify(err)}`)
                );
            }}
          >
            switchToFriend
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              social
                .switchToSession(sessionId)
                .then((res) =>
                  setResult(`switchToSession: ${JSON.stringify(res)}`)
                )
                .catch((err) =>
                  setResult(`switchToSession error: ${JSON.stringify(err)}`)
                );
            }}
          >
            switchToSession
          </button>
        </div>
      </div>
    </div>
  );
};
