import { TokenMeta, TokenVisible } from "constants/database";
import { Numeric } from "modules/types";
import { groupBy, __ } from "ramda";

export const groupByTokenId = groupBy<TokenMeta, Numeric>((item) => item.nftTokenId);

export const mergeVisibleAndMeta = (visible: TokenVisible[]) => (meta: TokenMeta[]) => {
  return [];
};
