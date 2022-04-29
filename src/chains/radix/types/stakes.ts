import { StakePositions } from "@radixdlt/application";

export interface Stakes {
  pendingStakes: StakePositions;
  stakes: StakePositions;
}
