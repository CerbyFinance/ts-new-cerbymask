import {
  protectedRoutesNames,
  publicRoutesNames,
  routesNames,
} from "./routesNames";

export type ProtectedRouteKey = keyof typeof protectedRoutesNames;
export type PublicRouteKey = keyof typeof publicRoutesNames;
export type RouteKey = keyof typeof routesNames;

export interface CurrentRoute {
  key: RouteKey;
  params?: { [key: string]: any };
}

export interface RouterContextValue {
  current: CurrentRoute | null;
  push: (route: RouteKey, params?: { [key: string]: any }) => void;
  back: () => void;
  redirect: (route: RouteKey) => void;
}
