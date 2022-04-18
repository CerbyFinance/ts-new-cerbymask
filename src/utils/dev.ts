const KEYSTORE = {
  memo: "1,650,119,303,763",
  crypto: {
    cipher: "AES-GCM",
    cipherparams: {
      nonce: "a3670d7a2db49b2237bd34e8",
    },
    ciphertext: "fdd6bd882d5a6421c5aed2d58c361da7",
    kdf: "scrypt",
    kdfparams: {
      costParameterN: 8192,
      costParameterC: 262144,
      blockSize: 8,
      parallelizationParameter: 1,
      lengthOfDerivedKey: 32,
      salt: "bf24470e87869559dd74834980cee324d9b7c2671d99534bfc4b5444d0f00e79",
    },
    mac: "2940e41e55532c217d78e1b072b3fd9c",
  },
  id: "12cd289cd385e89e",
  version: 1,
};

export const log = (message: any) =>
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: message,
  });

export const patchKeystore = async () => {
  await chrome.storage.local.set({ keystore: KEYSTORE });
  log("Keystore patched");
};
