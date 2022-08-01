import { TokenMeta as Meta, TokenVisible as Visible } from "constants/database";
import { Numeric } from "../types";
import { pipe } from "fp-ts/lib/function";
import * as Array from "fp-ts/Array";
import * as String from "fp-ts/string";
import * as Ord from "fp-ts/Ord";
import * as Option from "fp-ts/Option";

export type TokenInfo = Visible &
  Meta & {
    _id: Numeric;
  };
type Info = TokenInfo;
export type NumericMap<T> = Map<Numeric, T>;
export type MappedVisible = NumericMap<Visible>;
export type MappedInfo = NumericMap<Info>;

export const visibleArrToMap = (visible: Visible[]) => new Map(visible.map((x) => [x.nftTokenId, x]));

export const defaultVisible = (nftTokenId: Numeric): Visible => ({
  id: "-1",
  nftTokenId,
  order: "0",
  isHidden: "false",
});

export const visibleFromMap = (v: MappedVisible) => (nftId: Numeric) =>
  pipe(v.get(nftId), Option.of, Option.getOrElse(defaultVisible(nftId)));

export const visibleObject =
  (v: MappedVisible) =>
  (m: Meta): Info => ({
    _id: m.id,
    ...m,
    ...visibleFromMap(v)(m.nftTokenId),
  });

export const mergeMetaWithVisibleMap =
  (m: Meta[]) =>
  (v: MappedVisible): Info[] =>
    pipe(m, Array.map(visibleObject(v)));

const isHidden = (item: Info) => item.isHidden === "false";
export const keepNonHidden = (items: Info[]) => pipe(items, Array.filter(isHidden));

const sortByOrder = pipe(
  String.Ord,
  Ord.reverse,
  Ord.contramap((item: Info) => item.order),
);
export const sortItemsByItsOrder = (items: Info[]) => pipe(items, Array.sort(sortByOrder));

export const all = (meta: Meta[]) => (visible: Visible[]) =>
  pipe(visible, visibleArrToMap, mergeMetaWithVisibleMap(meta), keepNonHidden, sortItemsByItsOrder);
