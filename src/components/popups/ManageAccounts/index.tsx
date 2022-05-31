import React, { useState } from "react";
import { useStore } from "effector-react";

import { Account } from "@types";

import { $accounts, $selectedAccount, selectAccount, toggleMenu } from "@store";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Button, Popup } from "@components/atoms";
import { SelectItem } from "@components/molecules";

import { COLORS, ICONS } from "@globalStyle";
import * as S from "./style";
import { log } from "@utils";
import { createWallet } from "@chains/radix/crypto";
import { deriveNextAccount } from "@chains/radix/api";

export const ManageAccountsPopup = ({
  close,
  visible,
}: {
  close: () => void;
  visible: boolean;
}) => {
  const router = useRouter();
  const [isCreatingAccount, setCreatingAccount] = useState(false);
  const accounts = useStore($accounts);
  const selectedAccount = useStore($selectedAccount);

  const handleCreateAccount = async () => {
    deriveNextAccount();
    /*
    close();
    toggleMenu(false);

    const { masterPassword } = await chrome.storage.local.get("masterPassword");
    await createWallet(masterPassword);

    router.redirect(routesNames.CREATE_ACCOUNT as RouteKey);
    */
  };

  return (
    <Popup
      visible={visible}
      title={isCreatingAccount ? "Create new account" : "Manage accounts"}
      back={
        isCreatingAccount
          ? () => {
              setCreatingAccount(false);
            }
          : undefined
      }
      close={close}
    >
      {isCreatingAccount ? (
        <div>
          <p style={{ color: COLORS.extralight, fontSize: ".825rem" }}>
            Are you really want to create new account?
          </p>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Button
              onClick={() => {
                setCreatingAccount(false);
              }}
              passive
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAccount}>Create</Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            {accounts.map((account, i) => {
              const { address } = account;
              return (
                <SelectItem
                  key={address}
                  checkboxId={`manage-account-${address}`}
                  label={`Account #${i + 1}`}
                  value={account}
                  onSelect={(account: Account) => {
                    selectAccount(account);
                  }}
                  selected={address === selectedAccount?.address}
                />
              );
            })}
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <S.Button
              onClick={() => {
                setCreatingAccount(true);
              }}
            >
              <ICONS.Add />
              Create new account
            </S.Button>
            <S.Button
              onClick={() => {
                router.redirect(routesNames.IMPORT_WALLET as RouteKey);
              }}
            >
              <ICONS.ArrowLeftDown />
              Import new wallet
            </S.Button>
          </div>
        </>
      )}
    </Popup>
  );
};
