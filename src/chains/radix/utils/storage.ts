import {
  KeystoreT,
  Network,
  sha256Twice,
  SigningKeychainT,
} from "@radixdlt/application";
import { firstValueFrom } from "rxjs";
import { sha256 } from "js-sha256";

import { log, resetAll } from "@utils";

import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { DEFAULT_LOCK_TIMEOUT } from "@store";

import { Node } from "@chains/radix/types";
import { DEFAULT_NETWORK, NETWORKS_LIST } from "@chains/radix/crypto";

export const getStorage = async (
  keys?: string[]
): Promise<{ [key: string]: any }> => {
  const { radix } = await chrome.storage.local.get("radix");

  if (!keys) {
    return radix;
  }

  return Object.keys(radix)
    .filter((key) => keys.includes(key))
    .reduce((result, key) => {
      return {
        ...result,
        [key]: radix[key],
      };
    }, {});
};
export const setStorage = async (values: { [key: string]: any }) => {
  const { radix: radixStorage } = await chrome.storage.local.get("radix");
  await chrome.storage.local.set({ radix: { ...radixStorage, ...values } });
};

export const getAccountsIndex = async (network: Network) => {
  const { accountIndexes } = await getStorage(["accountIndexes"]);
  return accountIndexes[network];
};
export const setAccountsIndex = async (index: number, network: Network) => {
  const { accountIndexes } = await getStorage(["accountIndexes"]);
  await setStorage({
    accountIndexes: {
      ...accountIndexes,
      [network]: index,
    },
  });
};

export const getAccountKeystore = async () => {
  const { keystore } = await getStorage(["keystore"]);
  log(`Got keystore: ${JSON.stringify(keystore, null, "\t")}`);
  return keystore as KeystoreT;
};

export const activateSession = async (password?: string) => {
  const { autoLockTimeout } = await getStorage(["autoLockTimeout"]);

  const defaultOptions = {
    ...(password && { masterPassword: sha256(password) }),
  };
  if (!autoLockTimeout) {
    await setStorage({
      ...defaultOptions,
      autoLockTimeout: DEFAULT_LOCK_TIMEOUT,
      sessionUntil: Date.now() + DEFAULT_LOCK_TIMEOUT.value,
    });
  } else {
    await setStorage({
      ...defaultOptions,
      sessionUntil: Date.now() + autoLockTimeout.value,
    });
  }
};
export const checkIfSessionExpired = async () => {
  const { sessionUntil } = await getStorage(["sessionUntil"]);
  return Date.now() > sessionUntil;
};

export const saveNodeUrl = async (
  url: string,
  signingKeychain: SigningKeychainT
): Promise<Node> => {
  const hashedUrl = sha256Twice(url);
  const signed = signingKeychain.signHash(hashedUrl);
  const signedHash = await firstValueFrom(signed);
  const der = signedHash.toDER();

  const { nodes } = await getStorage(["nodes"]);
  await setStorage({
    nodes: {
      ...nodes,
      [url]: der,
    },
  });

  return {
    url,
    hash: der,
  };
};
export const selectNode = async (node: Node) => {
  await setStorage({
    selectedNode: node,
  });
};
export const getSelectedNode = async (signingKeychain: SigningKeychainT) => {
  const { selectedNode } = await getStorage(["selectedNode"]);
  if (!selectedNode) {
    const defaultNetwork = NETWORKS_LIST[DEFAULT_NETWORK].url;
    const node = await saveNodeUrl(defaultNetwork, signingKeychain);
    await selectNode(node);
    return node;
  }
  return selectedNode;
};

export const setDefaultStorage = async (router: RouterContextValue) => {
  const radixStorage = await getStorage();
  if (!radixStorage) {
    await resetAll();
    router.redirect(routesNames.SIGN_UP as RouteKey);
  }
};
