// TODO:
import {
  protectedRoutesNames,
  publicRoutesNames,
  routesNames,
} from "./routesNames";

export type ProtectedRouteKey = keyof typeof protectedRoutesNames;
export type PublicRouteKey = keyof typeof publicRoutesNames;
export type RouteKey = keyof typeof routesNames;

export interface RouterContextValue {
  current: RouteKey | null;
  push: (route: RouteKey) => void;
  back: () => void;
  redirect: (route: RouteKey) => void;
}

// Я ЛЮБЛЮ МАРФУ!
