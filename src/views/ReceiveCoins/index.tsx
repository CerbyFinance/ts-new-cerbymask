import React from "react";

import { Layout } from "@components/template";
import { Button, Input, Title } from "@components/atoms";

import QrCode from "@assets/img/qr.png";

export const ReceiveCoins = () => {
  const walletAddress =
    "tdx1qsp352e5zhh9qlpm2xvvswzx85mq9al54z4sa2epp8jsnswlggnd4pgx6padw";

  const footer = (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <img src={QrCode} alt="QR code" width="100%" />
    </div>
  );
  return (
    <Layout footer={footer}>
      <Title>Receive coins</Title>
      <Input
        label="Wallet address"
        value={walletAddress}
        disabled
        useTextarea
        style={{ margin: ".625rem 0" }}
      />
      <Button onClick={() => {}}>Copy address</Button>
    </Layout>
  );
};
