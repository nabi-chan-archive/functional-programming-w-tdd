import { tap } from "ramda";

export const log = <T>(key: string) => tap<T>((...args) => console.log(`${key} :`, ...args));
