import { TokenMeta as Meta, TokenVisible as Visible } from "constants/database";
import { Numeric } from "../types";

export type Info = Visible &
  Meta & {
    _id: Numeric;
  };
export type NumericMap<T> = Map<Numeric, T>;
export type MappedVisible = NumericMap<Visible>;
export type MappedInfo = NumericMap<Info>;

export const visiblesToMap: (x: Visible[]) => MappedVisible = (x) => new Map(x.map((x) => [x.nftTokenId, x]));

export function mergeVisiblesAndMetas(map: MappedVisible) {
  return (meta: Meta[]): MappedInfo => new Map();
}

export function getId(map: MappedVisible) {
  return (id: Numeric): Visible => map.get(id) || visible(id);
}

export function visible(nftTokenId: Numeric): Visible {
  return {
    id: "-1",
    nftTokenId,
    order: "0",
    isHidden: "false",
  };
}

export const mergeVisibleAndMeta = (visible: Visible[]) => (meta: Meta[]) => {
  return [];
};
