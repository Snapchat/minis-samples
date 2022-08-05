import "./styles/global.css";

import type { DevelopmentOptions, LaunchInfo, Mini } from "@snapchat/minis-sdk";
import {
  getAds,
  getAuth,
  getBitmoji,
  getLeaderboards,
  getLocalStorage,
  getPermissions,
  getRealtime,
  getSharing,
  getShortcut,
  getSocial,
  getStorage,
  getTokens,
  getUpdates,
  initializeMini,
  Test3dAvatarIds,
} from "@snapchat/minis-sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import {
  AdsSample,
  AuthSample,
  BitmojiSample,
  Home,
  Layout,
  LeaderboardsSample,
  LocalStorageSample,
  PermissionsSample,
  RealtimeSample,
  SharingSample,
  ShortcutSample,
  SocialSample,
  StorageSample,
  TokensSample,
  UpdatesSample,
} from "./components";

const initParams: DevelopmentOptions = {
  projectId: process.env.REACT_APP_PROJECT_ID,
  sessionId: process.env.REACT_APP_SESSION_ID,
  user: {
    id: `${process.env.REACT_APP_USER_ID_PREFIX}-${Math.random()
      .toString(36)
      .slice(2, 10)}`,
    avatarId:
      process.env.REACT_APP_AVATAR_ID ??
      Test3dAvatarIds[Date.now() % Test3dAvatarIds.length],
  },
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

const renderMini = (mini: Mini, launchInfo?: LaunchInfo) => {
  const home = <Home mini={mini} launchInfo={launchInfo ?? {}} />;
  root.render(
    /*
     * Must use MemoryRouter as it's not tied to the browser history.
     * Other routers cause refresh which causes issues with Android event system.
     * To navigate to a set page, fetch the LaunchInfo after initializeMini and set
     * `<MemoryRouter initialEntries={["path from launchInfo"]}>`.
     */
    <MemoryRouter
      initialEntries={
        launchInfo?.path?.startsWith("/")
          ? [launchInfo.path]
          : [window.location.pathname]
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={home} />
          <Route path={"*"} element={home} />
          <Route
            path={"ads"}
            element={<AdsSample ads={getAds()} mini={mini} />}
          />
          <Route path={"auth"} element={<AuthSample auth={getAuth()} />} />
          <Route
            path={"bitmoji"}
            element={
              <BitmojiSample
                bitmoji={getBitmoji()}
                avatarId={mini.user.avatarId}
                runtime={mini.runtime}
              />
            }
          />
          <Route
            path={"leaderboards"}
            element={
              <LeaderboardsSample leaderboard={getLeaderboards()} mini={mini} />
            }
          />
          <Route
            path={"localstorage"}
            element={<LocalStorageSample localStorage={getLocalStorage()} />}
          />
          <Route
            path={"permissions"}
            element={
              <PermissionsSample permissions={getPermissions()} mini={mini} />
            }
          />
          <Route
            path={"sharing"}
            element={<SharingSample sharing={getSharing()} mini={mini} />}
          />
          <Route
            path={"shortcut"}
            element={<ShortcutSample shortcut={getShortcut()} mini={mini} />}
          />
          <Route
            path={"social"}
            element={<SocialSample social={getSocial()} />}
          />
          <Route
            path={"storage"}
            element={<StorageSample storage={getStorage()} />}
          />
          <Route
            path={"tokens"}
            element={<TokensSample tokens={getTokens()} />}
          />
          <Route
            path={"updates"}
            element={<UpdatesSample updates={getUpdates()} mini={mini} />}
          />
          <Route
            path={"realtime"}
            element={<RealtimeSample realtime={getRealtime()} mini={mini} />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

const setup = async () => {
  const mini = await initializeMini(initParams);
  await mini.setLoadingProgress(0.88); // optional call to set loading progress
  const { launchInfo } = await mini.getLaunchInfo();
  renderMini(mini, launchInfo);
  await mini.loadingComplete();
};

setup().catch((err) => console.error(`load mini: ${err}`));
