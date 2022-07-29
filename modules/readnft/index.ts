import { TokenMeta } from "constants/database";
import { Numeric } from "modules/types";
import { groupBy, __, keys as _keys } from "ramda";

export const groupByTokenId = groupBy<TokenMeta, Numeric>((item) => item.nftTokenId);
