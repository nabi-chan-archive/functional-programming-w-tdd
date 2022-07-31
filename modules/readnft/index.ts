import { TokenMeta as Meta, TokenVisible as Visible } from "constants/database";
import { Numeric } from "../types";
import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Array";

export type TokenInfo = Visible &
  Meta & {
    _id: Numeric;
  };
type Info = TokenInfo;
export type NumericMap<T> = Map<Numeric, T>;
export type MappedVisible = NumericMap<Visible>;
export type MappedInfo = NumericMap<Info>;

export const visibleArrToMap = (visible: Visible[]) =>
  visible.reduce((map, cur) => map.set(cur.nftTokenId, cur), new Map() as MappedVisible);

const defaultVisible = (nftTokenId: Numeric): Visible => ({
  id: "-1",
  nftTokenId,
  order: "0",
  isHidden: "false",
});

const getVisible = (v: MappedVisible) => (nftId: Numeric) => v.get(nftId) || defaultVisible(nftId);

const generateVisible =
  (v: MappedVisible) =>
  (m: Meta): Info => ({
    _id: m.id,
    ...m,
    ...getVisible(v)(m.nftTokenId),
  });

export const merge =
  (m: Meta[]) =>
  (v: MappedVisible): Info[] =>
    pipe(m, map(generateVisible(v)));

export const filter = (items: Info[]) => items.filter((item) => item.isHidden !== "true");

export const sort = (items: Info[]) => items.sort((prev, next) => Number(prev.order) - Number(next.order));

export const all = (meta: Meta[]) => (visible: Visible[]) => pipe(visible, visibleArrToMap, merge(meta), filter, sort);
