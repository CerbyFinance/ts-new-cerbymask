import { createDomain } from "effector";

const account = createDomain();

export const $authenticated = account.createStore<boolean>(false);
export const authenticate = account.createEvent<boolean>();

$authenticated.on(authenticate, (_, auth) => auth);
