import type { Mini, Realtime, User } from "@snapchat/minis-sdk";
import {
  AvatarVariants,
  Context,
  getBitmoji,
  RealtimeEvent,
  Runtime,
} from "@snapchat/minis-sdk";
import React, { useCallback, useEffect, useReducer, useState } from "react";

const userInfo = (u: User, runtime: Runtime) =>
  `${u.name}${runtime === Runtime.LOCAL ? ` (${u.id}` : ""}`;

interface RosterState {
  curr: User[];
  joined: User[];
  left: User[];
}

interface RosterAction {
  type: "init" | "join" | "leave";
  users: User[];
  leavers: string[];
}

export const RealtimeSample = ({
  realtime,
  mini,
}: {
  realtime: Realtime;
  mini: Mini;
}) => {
  const [result, setResult] = useState<string>("");
  const [rcvData, setRcvData] = useState<string>("");
  const [inMatch, setInMatch] = useState<boolean>(false);

  const [rosterState, dispatchRosterState] = useReducer(
    (currRoster: RosterState, action: RosterAction) => {
      switch (action.type) {
        case "init":
          return {
            curr: action.users,
            joined: [],
            left: [],
          };
        case "join":
          return {
            curr: [...currRoster.curr, ...action.users],
            joined: action.users,
            left: [],
          };
        case "leave":
          return {
            curr: currRoster.curr.filter(
              (u: User) => !action.leavers.includes(u.id)
            ),
            joined: [],
            left: currRoster.curr.filter((u: User) =>
              action.leavers.includes(u.id)
            ),
          };
      }
      throw new Error(`invalid action: ${JSON.stringify(action)}`);
    },
    { curr: [], joined: [], left: [] }
  );

  const joinMatch = useCallback(() => {
    realtime
      .join()
      .then((roster: User[]) => {
        dispatchRosterState({ type: "init", users: roster, leavers: [] });
        setResult("join success");
        setInMatch(true);
        return;
      })
      .catch((err) => setResult(`join error: ${JSON.stringify(err)}`));
  }, [realtime]);

  useEffect(() => {
    realtime.on(RealtimeEvent.RECEIVED_DATA, (sender: string, data: any) => {
      setRcvData(`sender: ${sender}, data: ${data}`);
    });

    realtime.on(RealtimeEvent.USER_JOINED, (users: User[]) => {
      dispatchRosterState({ type: "join", users: users, leavers: [] });
    });

    realtime.on(RealtimeEvent.USER_LEFT, (users: string[]) => {
      dispatchRosterState({ type: "leave", users: [], leavers: users });
    });

    joinMatch();

    return () => {
      for (const e of [
        RealtimeEvent.RECEIVED_DATA,
        RealtimeEvent.USER_JOINED,
        RealtimeEvent.USER_LEFT,
      ]) {
        realtime.unbind(e);
      }
    };
  }, [realtime, mini.runtime, joinMatch]);

  useEffect(() => {
    return () => {
      // leave when we switch tabs
      if (inMatch) {
        realtime.leave();
      }
    };
  }, [realtime, inMatch]);

  return (
    <>
      <div className="card">
        <div className="cell">
          <Info runtime={mini.runtime} context={mini.context} />
        </div>
        <div className="cell">
          <p className="textstyle-body">SessionId</p>
          <p className="textstyle-subheader">{mini.sessionId}</p>
        </div>
      </div>
      <div className="card">
        <div className="cell">
          <p className="textstyle-title">Join / Leave</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">Result</p>
          <p className="textstyle-subheader">{result}</p>
        </div>
        <div className="cell">
          <div className="stack">
            <button
              type="button"
              className="btn btn-md btn-primary"
              onClick={joinMatch}
            >
              Join
            </button>
            <button
              type="button"
              className="btn btn-md btn-primary"
              onClick={() => {
                try {
                  setResult("left match");
                  dispatchRosterState({ type: "init", users: [], leavers: [] });
                  setInMatch(false); // leave called in hook
                  setRcvData("");
                } catch (err) {
                  setResult(`leave error: ${JSON.stringify(err)}`);
                }
              }}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
      {inMatch && (
        <MatchData
          mini={mini}
          realtime={realtime}
          rosterState={rosterState}
          rcvData={rcvData}
        />
      )}
    </>
  );
};

const Info = ({ runtime, context }: { runtime: Runtime; context: Context }) => {
  let notes = <></>;

  if (runtime === Runtime.LOCAL) {
    notes = (
      <p className={"textstyle-subheader"}>
        1. To run with two users, open up two browsers to
        http://localhost:3000/realtime. Add userId=[abc] to use different
        userIds and avatarId=[xyz] to control the avatarIds
        <br />
        2. Join for both browsers.
        <br />
        3. Use send data to send message between the two users.
        <br />
      </p>
    );
  } else if (context === Context.INDIVIDUAL) {
    notes = (
      <p className="textstyle-subheader">
        In the individual context, only the current user can join the match
        right now. <br />
        Open the Mini in an Conversation context to try sending data between
        users.
      </p>
    );
  }

  return (
    <>
      <p className="textstyle-body">How to Use</p>
      {notes}
    </>
  );
};

const MatchData = ({
  mini,
  realtime,
  rosterState,
  rcvData,
}: {
  mini: Mini;
  realtime: Realtime;
  rosterState: RosterState;
  rcvData: string;
}) => {
  const [sendMessage, setSendMessage] = useState<string>(
    `hi from ${mini.user.name}`
  );
  const [sameDataCount, setSameDataCount] = useState<number>(0);

  const bitmoji = getBitmoji();

  const [rosterWithAvatar, setRosterWithAvatar] = useState<
    { user: User; avatarUrl: string }[]
  >([]);

  useEffect(() => {
    const loadAvatar = async () => {
      return Promise.all(
        [
          mini.user, // current user is never in the roster
          ...rosterState.curr.sort((a, b) => {
            return a.id.localeCompare(b.id);
          }),
        ].map(async (u: User) => {
          return {
            user: u,
            avatarUrl: (
              await bitmoji.fetchAvatar2D(
                u.avatarId,
                AvatarVariants.DEFAULT,
                64
              )
            ).url,
          };
        })
      );
    };

    loadAvatar()
      .then((res) => setRosterWithAvatar(res))
      .catch((err) => console.error(err));
  }, [rosterState.curr, mini.user, bitmoji]);

  return (
    <>
      <div className="card">
        <div className="cell">
          <>
            <p className="textstyle-title">Match State</p>
            {rosterWithAvatar.length > 0 &&
              rosterWithAvatar.map((u) => {
                return (
                  <div key={u.user.id} className={"cell"}>
                    <img
                      src={u.avatarUrl}
                      alt={"failed to render avatarURL"}
                      className="avatar"
                    />
                    <p className="textstyle-small-header">{`${userInfo(
                      u.user,
                      mini.runtime
                    )}${u.user.id === mini.user.id ? " [Current]" : ""}`}</p>
                  </div>
                );
              })}
          </>
        </div>
        {rosterState.curr.length > 0 && (
          <div className="cell">
            <div className="stack">
              <form>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={sendMessage}
                  onChange={(e) => {
                    setSendMessage(e.target.value);
                    setSameDataCount(0);
                  }}
                />
              </form>
              <button
                type="button"
                className="btn btn-md btn-primary"
                onClick={() => {
                  if (sendMessage.length > 0) {
                    realtime.sendData(sendMessage, []);
                    if (sameDataCount > 0) {
                      setSendMessage(
                        `${sendMessage.replace(
                          ` (${sameDataCount - 1})`,
                          ""
                        )} (${sameDataCount})`
                      );
                    }
                    setSameDataCount(sameDataCount + 1);
                  }
                }}
              >
                Send Data to Others
              </button>
              <p className="textstyle-body">Received Data</p>
              <p className="textstyle-subheader">{rcvData}</p>
            </div>
          </div>
        )}
        <div className="cell">
          <p className="textstyle-title">Events</p>
        </div>
        <div className="cell">
          <p className="textstyle-body">User Joined</p>
          <p className="textstyle-subheader">
            {rosterState.joined
              .map((u) => `${userInfo(u, mini.runtime)} joined`)
              .join(" ")}
          </p>
        </div>
        <div className="cell">
          <p className="textstyle-body">User Left</p>
          <p className="textstyle-subheader">
            {rosterState.left
              .map((u) => `${userInfo(u, mini.runtime)} left`)
              .join(" ")}
          </p>
        </div>
      </div>
    </>
  );
};
