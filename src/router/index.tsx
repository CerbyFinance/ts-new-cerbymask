import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { routes } from "./routes";

import { CurrentRoute, RouteKey, RouterContextValue } from "./types";
import { routesNames } from "./routesNames";
import { resetAll } from "@utils";

export * from "./routesNames";

const RouterContext = createContext<RouterContextValue>({
  current: null,
  push: () => {},
  back: () => {},
  redirect: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const Router = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<RouteKey[]>([]);
  const [current, setCurrent] = useState<CurrentRoute | null>(null);

  useEffect(() => {
    (async () => {
      const { route } = await chrome.storage.local.get("route");
      if (route) {
        setCurrent(route);
      }
    })();
  }, []);

  const setRoute = async (route: CurrentRoute) => {
    setCurrent(route);
    await chrome.storage.local.set({ route });
  };

  return (
    <RouterContext.Provider
      value={{
        current,
        push: (key, params) => {
          setRoute({ key, params });
          setHistory((history) => [...history, key]);
        },
        back: () => {
          if (history.length > 0) {
            const newHistory = history.slice(0, history.length - 1);
            setRoute({
              key:
                newHistory.length > 0
                  ? newHistory[history.length - 1]
                  : (routesNames.DASHBOARD as RouteKey),
            });
            setHistory(newHistory);
          }
        },
        redirect: (key: RouteKey) => {
          setRoute({ key });
        },
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const RouterView = ({
  authenticated = false,
}: {
  authenticated?: boolean;
}) => {
  const router = useRouter();
  const { current, redirect } = router;

  const views = {
    ...routes.public,
    ...(authenticated && routes.protected),
  };
  /*
  useEffect(() => {
    resetAll(router);
  }, []);
  */
  useEffect(() => {
    if (current && !views[current.key]) {
      redirect(
        (authenticated
          ? routesNames.DASHBOARD
          : routesNames.SIGN_IN) as RouteKey
      );
    }
  }, [current, authenticated]);

  return current && views[current.key] ? (
    views[current.key]()
  ) : (
    <div>Loading...</div>
  );
};
