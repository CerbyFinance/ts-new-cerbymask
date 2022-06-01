import React, { useState } from "react";
import { useStore } from "effector-react";

import { toggleMenu } from "@store";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Button, Popup } from "@components/atoms";
import { SelectItem } from "@components/molecules";

import { COLORS, ICONS } from "@globalStyle";
import * as S from "./style";
import { deriveNextAccount } from "@chains/radix/api";
import { $accounts, $activeAddress, selectAccount } from "@chains/radix/store";

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
  const activeAddress = useStore($activeAddress);

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
                  key={address.toString()}
                  checkboxId={`manage-account-${address}`}
                  label={`Account #${i + 1}`}
                  value={account}
                  onSelect={(account) => {
                    selectAccount(account);
                  }}
                  selected={address === activeAddress}
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
