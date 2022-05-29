import { StakePosition } from "@radixdlt/application";

interface MyStakeOptions {
  addStake: () => void;
  reduceStake: () => void;
}

export interface MyStakesProps {
  options: MyStakeOptions;
}

export interface MyStakeProps {
  stake: StakePosition;
  isPending?: boolean;
  options: MyStakeOptions;
}
