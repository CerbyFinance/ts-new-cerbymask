import React from "react";
import { useStore } from "effector-react";
import QRCode from "react-qr-code";

import { $activeAddress } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

import { COLORS } from "@globalStyle/colors";

export const ReceiveCoins = () => {
  const activeAddress = useStore($activeAddress);

  const address = activeAddress.toString();

  const footer = (
    <div style={{ textAlign: "center" }}>
      <QRCode value={address} />
    </div>
  );
  return (
    <Layout backButton footer={footer}>
      <Title>Receive coins</Title>
      <Input
        label="Wallet address"
        value={address}
        disabled
        style={{ margin: ".625rem 0" }}
      />
      <Button
        onClick={() => {
          navigator.clipboard.writeText(address);
        }}
      >
        Copy address
      </Button>
    </Layout>
  );
};
