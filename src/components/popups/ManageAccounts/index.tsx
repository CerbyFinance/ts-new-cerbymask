import React, { useState } from "react";
import { useStoreMap } from "effector-react";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { deriveNextAccount } from "@chains/radix/api";
import {
  $accounts,
  $selectedAccount,
  selectAccount,
} from "@chains/radix/store";

import { Button, Loader, Popup } from "@components/atoms";
import { SelectItem } from "@components/molecules";

import { COLORS, ICONS } from "@globalStyle";
import * as S from "./style";

export const ManageAccountsPopup = ({
  close,
  visible,
}: {
  close: () => void;
  visible: boolean;
}) => {
  const router = useRouter();
  const [isCreatingAccount, setCreatingAccount] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const accounts = useStoreMap($accounts, (accounts) =>
    accounts ? accounts.all : []
  );
  const selectedAccountAddress = useStoreMap($selectedAccount, (account) =>
    account ? account.address.toString() : null
  );

  log("accounts");
  log(accounts);

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      await deriveNextAccount();
    } finally {
      setCreatingAccount(false);
      setLoading(false);
    }
  };

  let popupTitle, popupContent;
  if (isLoading) {
    popupContent = <Loader />;
  } else if (isCreatingAccount) {
    popupTitle = "Create new account";
    popupContent = (
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
    );
  } else {
    popupTitle = "Manage accounts";
    popupContent = (
      <>
        <div>
          {accounts.map((account, i) => {
            const { address } = account;
            const addressString = address.toString();
            return (
              <SelectItem
                key={addressString}
                checkboxId={`manage-account-${address}`}
                label={`Account #${i + 1}`}
                value={account}
                onSelect={(account) => {
                  selectAccount(account.address.toString());
                }}
                selected={addressString === selectedAccountAddress}
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
    );
  }
  return (
    <Popup
      visible={visible}
      title={popupTitle}
      back={
        isCreatingAccount && !isLoading
          ? () => {
              setCreatingAccount(false);
            }
          : undefined
      }
      close={close}
    >
      {popupContent}
    </Popup>
  );
};
