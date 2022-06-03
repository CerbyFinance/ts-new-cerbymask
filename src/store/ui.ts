import { createDomain } from "effector";

import { UiSettings } from "@types";

const ui = createDomain();

export const $ui = ui.createStore<UiSettings>({
  isMenuOpened: false,
});

export const toggleMenu = ui.createEvent<boolean>();
$ui.on(toggleMenu, (settings, isMenuOpened) => ({
  ...settings,
  isMenuOpened,
}));
