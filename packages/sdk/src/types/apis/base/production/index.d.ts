import { App } from "../../../app";
import {
  AvatarResponse,
  CanCreateShortcutResponse,
  DiscoverableFriendsResponse,
  GetShareInfoResponse,
  ImageShareCard,
  InitializeAdsResponse,
  DevelopmentOptions,
  InitializeResponse,
  IsEnabledResponse,
  IsReadyResponse,
  LensLaunchData,
  LocalStorageGetDataResponse,
  ParticipantsResponse,
  PermissionResponse,
  PlayResponse,
  PlayWithFriendsResponse,
  ProductsResponse,
  PurchaseResponse,
  PurchasesResponse,
  SessionsResponse,
  ShareCard,
  ShareInfo,
  ShareLensResponse,
  Sticker,
  SuccessResponse,
  SwitchAppSessionResponse,
  TokenResponse,
  UnconsumedAdsResponse,
  ValidateAgeThresholdResponse,
  WatchAdResponse,
} from "../../../types";
import { User } from "../../../user";
import * as constants from "../../../constants";
import { BaseScProps, Bridge } from "./baseScProps";
import {
  DataEntry,
  GetDataResponse,
  ScanDataResponse,
  Scope,
  StorageClient,
} from "../../cloud-storage";
import { PermissionScope } from "../../../constants";
declare const generatedBaseAPIsType: {
  _m: Map<string, string>;
  _outsideSc: boolean;
  _storage: StorageClient | undefined;
  _timeoutSetup: () => Promise<unknown>;
  setLoadingProgress: (progress: number) => Promise<void>;
  loadingComplete: () => Promise<void>;
  initialize: (
    devOpts?: DevelopmentOptions | undefined
  ) => Promise<InitializeResponse>;
  _initializeFromLocal: (
    devOpts?: DevelopmentOptions | undefined
  ) => InitializeResponse;
  _initializeFromBridge: (b: Bridge) => Promise<InitializeResponse>;
  _outsideSnapchat: () => boolean;
  fetchAuthToken: () => Promise<TokenResponse>;
  _fetchOAuth2Token: () => Promise<TokenResponse>;
  fetchAvatar2D: (
    avatarId: string,
    variant: string,
    size: number
  ) => Promise<AvatarResponse>;
  fetchAvatar3D: (avatarId: string) => Promise<AvatarResponse>;
  playWithFriends: (
    maxNumberOfPlayers: number
  ) => Promise<PlayWithFriendsResponse>;
  getUnconsumedAds: () => Promise<UnconsumedAdsResponse>;
  initializeAds: (slotIds: string[]) => Promise<InitializeAdsResponse>;
  isAdReady: (slotId: string) => Promise<IsReadyResponse>;
  watchAd: (
    slotId: string,
    developerPayload: string
  ) => Promise<WatchAdResponse>;
  consumeAd: (requestId: string) => Promise<void>;
  localStorageSetData: (data: Record<string, string>) => Promise<void>;
  localStorageGetData: (keys: string[]) => Promise<LocalStorageGetDataResponse>;
  localStorageDeleteData: (keys: string[]) => Promise<void>;
  cloudStorageSetData: <T>(
    scope: Scope,
    collection: string,
    data: DataEntry<T>[],
    ttlSec?: number
  ) => Promise<void>;
  cloudStorageGetData: <T_1>(
    scope: Scope,
    collection: string,
    keys: Array<string>
  ) => Promise<GetDataResponse<T_1>>;
  cloudStorageScanData: <T_2>(
    scope: Scope,
    collection: string,
    limit?: number,
    cursor?: string
  ) => Promise<ScanDataResponse<T_2>>;
  cloudStorageDeleteData: (
    scope: Scope,
    collection: string,
    keys: Array<string>
  ) => Promise<void>;
  presentPrivacyPolicy: () => Promise<void>;
  presentTermsOfService: () => Promise<void>;
  startLoggingFPS: () => Promise<void>;
  endLoggingFPS: (success: boolean) => Promise<void>;
  shareLensToSnapchat: (
    lensUUID: string,
    shareInfo?: ShareInfo,
    lensLaunchData?: LensLaunchData | undefined,
    enableFullScreenMode?: boolean
  ) => Promise<ShareLensResponse>;
  shareMediaToSnapchat: (
    stickers: Sticker[],
    shareInfo?: ShareInfo
  ) => Promise<void>;
  logEvent: (
    eventName: string,
    parameters: Record<constants.AppEventParameterNames, any>
  ) => Promise<SuccessResponse>;
  submitLeaderboardScore: (
    leaderboardId: string,
    score: number
  ) => Promise<SuccessResponse>;
  presentLeaderboard: (leaderboardId: string) => Promise<SuccessResponse>;
  shareAppToChat: (
    shareCard: ShareCard,
    imageShareCard: ImageShareCard,
    shareInfo?: ShareInfo
  ) => Promise<void>;
  getShareInfo: () => Promise<GetShareInfoResponse>;
  presentWebpage: (url: string) => Promise<void>;
  getUnconsumedPurchases: () => Promise<PurchasesResponse>;
  getAllProducts: () => Promise<ProductsResponse>;
  getProducts: (skus: string[]) => Promise<ProductsResponse>;
  purchase: (sku: string) => Promise<PurchaseResponse>;
  consumePurchase: (transactionId: string) => Promise<void>;
  isTokenShopSupported: () => Promise<IsEnabledResponse>;
  switchAppSession: (
    targetSessionId: string
  ) => Promise<SwitchAppSessionResponse>;
  validateAgeThreshold: () => Promise<ValidateAgeThresholdResponse>;
  fetchSessions: () => Promise<SessionsResponse>;
  fetchParticipants: (sessionIds: string[]) => Promise<ParticipantsResponse>;
  getDiscoverableFriends: () => Promise<DiscoverableFriendsResponse>;
  switchToFriend: (friendId: string) => Promise<PlayResponse>;
  sendUpdateNotification: (
    updateId: string,
    inputs: Record<string, string>
  ) => Promise<void>;
  sendCustomUpdateToChat: (
    updateId: string,
    inputs: Record<string, string>,
    bitmojiVariant: constants.BitmojiVariants,
    shareInfo?: ShareInfo
  ) => Promise<void>;
  getPermissions: (
    permissionScopes: constants.PermissionScope[]
  ) => Promise<PermissionResponse>;
  requestPermission: (
    permissionScope: constants.PermissionScope
  ) => Promise<PermissionResponse>;
  canCreateShortcut: () => Promise<CanCreateShortcutResponse>;
  createShortcut: () => Promise<void>;
  _device: {
    android: boolean;
    ios: boolean;
  };
  _screenshotCompleteCallback:
    | import("../../../types").ScreenshotCallback
    | undefined;
  _b: Bridge | undefined;
  _k: string | undefined;
  _h: Record<string, Function>;
  _u: string;
  app: App | undefined;
  version: string;
  App: typeof App;
  Events: typeof import("../../../events").Events;
  User: typeof User;
  AvatarVariants: typeof constants.AvatarVariants;
  ErrorCodes: typeof constants.ErrorCodes;
  ClientEventNames: typeof constants.ClientEventNames;
  AppEventNames: typeof constants.AppEventNames;
  MiniEventNames: typeof constants.MiniEventNames;
  AppEventParameterNames: typeof constants.AppEventParameterNames;
  BitmojiVariants: typeof constants.BitmojiVariants;
  PermissionValue: typeof constants.PermissionValue;
  PermissionScope: typeof constants.PermissionScope;
};
export declare type GeneratedBaseAPIs = typeof generatedBaseAPIsType;
export interface BaseAPIs extends BaseScProps, GeneratedBaseAPIs {}
export {};
