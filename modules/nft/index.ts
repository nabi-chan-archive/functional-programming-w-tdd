import { TokenMeta as Meta, TokenVisible as Visible } from "constants/database";
import { Numeric } from "../types";
import { pipe } from "fp-ts/lib/function";
import { map, filter as _filter, sort as _sort } from "fp-ts/lib/Array";
import { Ord } from "fp-ts/lib/string";
import { contramap, reverse } from "fp-ts/lib/Ord";

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

export const defaultVisible = (nftTokenId: Numeric): Visible => ({
  id: "-1",
  nftTokenId,
  order: "0",
  isHidden: "false",
});

export const visibleFromMap = (v: MappedVisible) => (nftId: Numeric) => v.get(nftId) || defaultVisible(nftId);

export const visibleObject =
  (v: MappedVisible) =>
  (m: Meta): Info => ({
    _id: m.id,
    ...m,
    ...visibleFromMap(v)(m.nftTokenId),
  });

export const merge =
  (m: Meta[]) =>
  (v: MappedVisible): Info[] =>
    pipe(m, map(visibleObject(v)));

const isHidden = (item: Info) => item.isHidden === "false";
export const filter = (items: Info[]) => pipe(items, _filter(isHidden));

const sortByOrder = pipe(
  Ord,
  reverse,
  contramap((item: Info) => item.order),
);
export const sort = (items: Info[]) => pipe(items, _sort(sortByOrder));

export const all = (meta: Meta[]) => (visible: Visible[]) => pipe(visible, visibleArrToMap, merge(meta), filter, sort);
