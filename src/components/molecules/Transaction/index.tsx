import React, { useEffect, useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import { ActionType, Message } from "@radixdlt/application";

import { CURRENCIES_SYMBOLS } from "@utils";

import { $currentCurrency, $usdTo } from "@store";

import { convertToMainUnit, convertToUsd } from "@chains/radix/utils";
import { $activeAddress, $pairsData, XRD_PRICE } from "@chains/radix/store";

import { TransactionProps } from "./types";

import { COLORS, TOKEN_ICONS } from "@globalStyle";
import * as S from "./style";
import { decryptMessage } from "@chains/radix/api";

// Inherited from Token molecule
export const Transaction = (props: TransactionProps) => {
  const { data, style, className } = props;
  const { actions, message } = data;

  const activeAddress = useStoreMap($activeAddress, (addr) => addr.toString());
  const currentCurrency = useStore($currentCurrency);
  const usdTo = useStore($usdTo);
  const tokenData = useStore($pairsData);

  const [isDecryptLoading, setDecryptLoading] = useState<boolean>(false);
  const [decryptedMessage, setDecryptedMessage] = useState<string>("");

  const handleDecrypt = async () => {
    setDecryptLoading(true);
    try {
      const msg = await decryptMessage(data);
      setDecryptedMessage(msg);
    } finally {
      setDecryptLoading(false);
    }
  };
  // just taking first action
  const action = actions[0];
  const { type } = action;
  if (type !== ActionType.TOKEN_TRANSFER) {
    return <S.Wrapper>Unsupported tx type</S.Wrapper>;
  }

  const { rri, amount, to_account } = action;
  const ticker = rri.name.toUpperCase();
  const usdAmount = convertToUsd(amount, tokenData[ticker]?.price);

  const isRecipient = to_account.toString() === activeAddress;
  const isMessageEncrypted = Message.isEncrypted(message || "");

  let messageView = message || "";
  if (isDecryptLoading) {
    messageView = "Decrypting...";
  } else if (isMessageEncrypted && !decryptedMessage) {
    messageView = "Click to decrypt the message";
  } else if (isMessageEncrypted && decryptedMessage) {
    messageView = decryptedMessage;
  }
  // rendering only transfers
  return (
    <S.Wrapper style={style} className={className}>
      <S.TxInfo>
        <S.TxIcon>{TOKEN_ICONS[ticker]}</S.TxIcon>
        <div style={{ width: "100%" }}>
          <S.TxTicker>{ticker}</S.TxTicker>
          <S.TxBalance
            style={{ color: isRecipient ? COLORS.green : COLORS.red }}
          >
            {isRecipient ? "+" : "-"}
            {convertToMainUnit(amount)} {ticker}
          </S.TxBalance>
          {message && (
            <S.TxMessage
              isEncrypted={isMessageEncrypted}
              onClick={() => {
                if (isMessageEncrypted) {
                  handleDecrypt();
                }
              }}
            >
              {messageView}
            </S.TxMessage>
          )}
        </div>
      </S.TxInfo>
      <S.TxPrice>
        {CURRENCIES_SYMBOLS[currentCurrency]}
        {(usdAmount * usdTo[currentCurrency]).toLocaleString()}
      </S.TxPrice>
    </S.Wrapper>
  );
};
