import { Eq } from "fp-ts/lib/Eq";

export const eqNumber: Eq<number> = {
  equals: (x, y) => x === y,
};
