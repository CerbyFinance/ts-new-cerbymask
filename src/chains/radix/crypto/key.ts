import { Mnemonic, MnemomicT as MnemonicT } from "@radixdlt/application";

import { Key } from "./types";

export const generateKey = (): Key => {
  const phrase = Mnemonic.generateNew();
  let mnemonic;
  if (phrase) {
    mnemonic = Mnemonic.fromEnglishPhrase(phrase.toString());
  }

  return {
    mnemonic: mnemonic && mnemonic.isOk() ? mnemonic.value : ({} as MnemonicT),
  };
};
