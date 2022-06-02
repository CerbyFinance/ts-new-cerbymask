import React from "react";
import { useStore } from "effector-react";

import { LockTimeout } from "@types";

import { $lockTimeout, setLockTimeout, toggleMenu } from "@store";

import { Popup } from "@components/atoms";
import { SelectItem } from "@components/molecules";

export const AutoLockPopup = ({
  close,
  visible,
}: {
  close: () => void;
  visible: boolean;
}) => {
  const lockTimeout = useStore($lockTimeout);
  const lockTimeouts: LockTimeout[] = [
    {
      label: "15 min",
      value: 15 * 60 * 1000,
    },
    {
      label: "1 hour",
      value: 60 * 60 * 1000,
    },
    {
      label: "24 hours",
      value: 24 * 60 * 60 * 1000,
    },
    {
      label: "Never",
      value: null,
    },
  ];

  return (
    <Popup visible={visible} title="Auto-lock" close={close}>
      {lockTimeouts.map((timeout) => {
        const { label, value } = timeout;
        return (
          <SelectItem
            key={label}
            checkboxId={`lock-timeout-${value}`}
            label={label}
            value={timeout}
            onSelect={(selectedTimeout: LockTimeout) => {
              setLockTimeout(selectedTimeout);
              close();
              toggleMenu(false);
            }}
            selected={lockTimeout.value === value}
          />
        );
      })}
    </Popup>
  );
};
