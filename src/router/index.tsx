import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { routes } from "./routes";

import { RouteKey, RouterContextValue } from "./types";
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
  const [current, setCurrent] = useState<RouteKey | null>(null);

  useEffect(() => {
    (async () => {
      const { route } = await chrome.storage.local.get("route");
      if (route) {
        setCurrent(route);
      }
    })();
  }, []);

  const setRoute = async (route: RouteKey) => {
    setCurrent(route);
    await chrome.storage.local.set({ route });
  };

  return (
    <RouterContext.Provider
      value={{
        current,
        push: (route: RouteKey) => {
          setRoute(route);
          setHistory((history) => [...history, route]);
        },
        back: () => {
          if (history.length > 0) {
            const newHistory = history.slice(0, history.length - 1);
            setRoute(
              newHistory.length > 0
                ? newHistory[history.length - 1]
                : (routesNames.DASHBOARD as RouteKey)
            );
            setHistory(newHistory);
          }
        },
        redirect: (route: RouteKey) => {
          setRoute(route);
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
    if (current && !views[current]) {
      redirect(
        (authenticated
          ? routesNames.DASHBOARD
          : routesNames.SIGN_IN) as RouteKey
      );
    }
  }, [current, authenticated]);

  return current && views[current] ? views[current]() : <div>Loading...</div>;
};
