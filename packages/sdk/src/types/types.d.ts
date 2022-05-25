import { PermissionValue, PermissionScope } from "./constants";
import { User } from "./user";
export interface ScError {
  code: string;
  message: string;
}
export interface SafeAreaInsets {
  top: number;
  bottom: number;
}
export interface UserFields {
  id: string;
  avatarId: string;
  name: string;
  color: string;
}
export interface Purchase {
  sku: string;
  transactionId: string;
  transactionTime: number;
  tokenPrice: number;
  receipt: string;
}
export interface Product {
  sku: string;
  itemId: string;
  title: string;
  description: string;
  iconAssetUrl: string;
  tokenPrice: number;
}
export interface Permission {
  permissionScope: PermissionScope;
  permissionValue: PermissionValue;
}
export interface Sticker {
  mediaId: string;
  dataUrl: string;
  width: number;
  height: number;
  centerX?: number;
  centerY?: number;
  rotation?: number;
}
export interface ShareCard {
  primaryImageUrl?: string;
  primaryImageDataUrl?: string;
  headline: string;
  description: string;
  actionCta: string;
}
export interface ImageShareCard {
  primaryImageUrl?: string;
  primaryImageDataUrl?: string;
  actionCta: string;
}
export interface ShareInfo {
  path?: string;
  payload?: any;
}
export declare type LensLaunchData = {
  [key: string]: string;
};
export declare type EventCb = (...args: any[]) => unknown;
export declare type ScreenshotCallback = (dataUri: string) => unknown;
export interface DevelopmentOptions {
  applicationId?: string;
  context?: string;
  env?: string;
  sessionId?: string;
  conversationSize?: number;
  locale?: string;
  user?: {
    id?: string;
    name?: string;
    avatarId?: string;
    color?: string;
  };
  safeAreaInsets?: SafeAreaInsets;
  volume?: number;
}
export interface InitializeResponseFields {
  applicationId: string;
  context: string;
  env: string;
  sessionId: string;
  conversationSize: number;
  locale: string;
  user: UserFields;
  safeAreaInsets: SafeAreaInsets;
  volume: number;
}
export interface InitializeResponse extends InitializeResponseFields {
  user: User;
}
export interface TokenResponse {
  token: string;
}
export interface AvatarResponse {
  url: string;
}
export interface PlayResponse {
  sessionId: string;
}
export interface PlayWithFriendsResponse extends PlayResponse {
  conversationSize: number;
  user: UserFields;
}
export interface UnconsumedAdsResponse {
  unconsumedAds: Array<{
    slotId: string;
    timestamp: number;
    requestId: string;
    developerPayload: string;
  }>;
}
export interface InitializeAdsResponse {
  url: string;
}
export interface IsReadyResponse {
  isReady: boolean;
}
export interface WatchAdResponse {
  requestId: string;
}
export interface LocalStorageGetDataResponse {
  data?: Record<string, string>;
}
export interface IsEnabledResponse {
  isEnabled: boolean;
}
export interface SuccessResponse {
  success: boolean;
}
export interface GetShareInfoResponse {
  shareInfo?: ShareInfo;
}
export interface PurchasesResponse {
  purchases: Array<{
    purchase: Purchase;
  }>;
}
export interface PurchaseResponse {
  purchase: Purchase;
}
export interface ProductsResponse {
  products: Array<{
    product: Product;
  }>;
}
export interface PermissionResponse {
  permissions: Record<PermissionScope, Permission>;
}
export interface SwitchAppSessionResponse {
  conversationSize: number;
  context: string;
}
export interface ValidateAgeThresholdResponse {
  isAgeValid?: boolean;
}
export interface SessionsResponse {
  sessions: Array<SessionInfo>;
}
export interface SessionInfo {
  sessionId: string;
  participantCount: number;
}
export interface ParticipantsResponse {
  participants: {
    [sessionId: string]: Array<Participant>;
  };
}
export interface Participant {
  id: string;
  name: string;
  avatarId: string;
}
export interface CanCreateShortcutResponse {
  canCreate: boolean;
  failureReason?: string;
}
export interface DiscoverableFriendsResponse {
  friends: Array<UserFields>;
}
export interface ShareLensResponse {
  lensUUID: string;
  payload?: string;
}
