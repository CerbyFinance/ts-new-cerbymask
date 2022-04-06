import { NetworkApi } from "@chains/radix";

export const buildTx = async (network: NetworkApi, options: any) => {
  const { api, name } = network;
  const {
    transaction: { from, rri, amount },
    type,
  } = options;

  const body = {
    actions: [
      {
        type,
        from_account: {
          address: from,
        },
        amount: {
          token_identifier: {
            rri,
          },
          value: amount,
        },
      },
    ],
    fee_payer: {
      address: from,
    },
    network_identifier: {
      network: name,
    },
    disable_token_mint_and_burn: true,
  };
  /* TypeScript error
  body.actions[0][type === "TransferTokens" ? "to_account" : "to_validator"] = {
    address: to,
  };
  */

  try {
    const response = await api.post("transaction/build", { body });
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["buildTx", response],
    });
  } catch (e) {
    throw new Error("buildTx failed");
  }
};

export const finalizeTx = async (network: NetworkApi, options: any) => {
  const { api, name } = network;
  const {
    transaction: { unsigned_transaction, bytes, pubKey },
  } = options;

  const body = {
    network_identifier: {
      network: name,
    },
    unsigned_transaction,
    signature: {
      bytes,
      public_key: {
        hex: pubKey,
      },
    },
    submit: true,
  };

  try {
    const response = await api.post("transaction/finalize", { body });
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getTokensInfo", response],
    });
  } catch (e) {
    throw new Error("finalizeTx failed");
  }
};
