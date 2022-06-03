import React, { useState } from "react";
import { createPortal } from "react-dom";

import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import {
  $currentCurrency,
  $lockTimeout,
  $ui,
  authenticate,
  toggleMenu,
} from "@store";

import { setStorage } from "@chains/radix/utils";

import {
  ManageAccountsPopup,
  RecoveryPhrasePopup,
  ChangeCurrencyPopup,
  AutoLockPopup,
} from "@components/popups";

import { COLORS, ICONS } from "@globalStyle";
import * as S from "./style";

const MANAGE_ACCOUNTS_POPUP = "MANAGE_ACCOUNTS";
const RECOVERY_PHRASE_POPUP = "RECOVERY_PHRASE";
const CHANGE_CURRENCY_POPUP = "CHANGE_CURRENCY";
const AUTO_LOCK_POPUP = "AUTO_LOCK";

export const Menu = () => {
  const router = useRouter();
  const lockTimeout = useStore($lockTimeout);
  const currentCurrency = useStore($currentCurrency);
  const { isMenuOpened } = useStore($ui);

  const [popupChosen, choosePopup] = useState("");

  const options = [
    {
      icon: <ICONS.Users />,
      label: "Manage accounts",
      action: () => {
        choosePopup(MANAGE_ACCOUNTS_POPUP);
      },
      popup: (
        <ManageAccountsPopup
          visible={popupChosen === MANAGE_ACCOUNTS_POPUP}
          close={() => {
            choosePopup("");
          }}
        />
      ),
    },
    {
      icon: <ICONS.Clipboard />,
      label: "View recovery phrase",
      action: () => {
        choosePopup(RECOVERY_PHRASE_POPUP);
      },
      popup: (
        <RecoveryPhrasePopup
          visible={popupChosen === RECOVERY_PHRASE_POPUP}
          close={() => {
            choosePopup("");
          }}
        />
      ),
    },
    {
      icon: <ICONS.Currency />,
      label: "Change currency",
      value: currentCurrency.toUpperCase(),
      action: () => {
        choosePopup(CHANGE_CURRENCY_POPUP);
      },
      popup: (
        <ChangeCurrencyPopup
          visible={popupChosen === CHANGE_CURRENCY_POPUP}
          close={() => {
            choosePopup("");
          }}
        />
      ),
    },
    {
      icon: <ICONS.Lock />,
      label: "Auto-lock",
      value: lockTimeout.label,
      action: () => {
        choosePopup(AUTO_LOCK_POPUP);
      },
      popup: (
        <AutoLockPopup
          visible={popupChosen === AUTO_LOCK_POPUP}
          close={() => {
            choosePopup("");
          }}
        />
      ),
    },
  ];

  return isMenuOpened
    ? createPortal(
        <S.Wrapper>
          <header>
            <h4>Menu</h4>
            <ICONS.Close
              onClick={() => {
                toggleMenu(false);
              }}
            />
          </header>
          <main>
            {options.map((option) => {
              const { icon, label, value, action, popup } = option;
              return (
                <div
                  key={label}
                  onClick={() => {
                    action();
                  }}
                >
                  {icon}
                  <div>
                    <div>{label}</div>
                    {value && (
                      <div
                        style={{
                          color: COLORS.extralight,
                          fontSize: ".875rem",
                        }}
                      >
                        {value}
                      </div>
                    )}
                  </div>
                  {popup}
                </div>
              );
            })}
          </main>
          <footer
            onClick={() => {
              toggleMenu(false);
              authenticate(false);
              setStorage({
                sessionUntil: Date.now(),
                showedExpired: true,
              });
              router.redirect(routesNames.SIGN_IN as RouteKey);
            }}
          >
            <ICONS.Lock />
            <span>Lock</span>
          </footer>
        </S.Wrapper>,
        document.getElementById("menu") as HTMLElement
      )
    : null;
};
