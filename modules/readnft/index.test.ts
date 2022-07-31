import { pipe } from "fp-ts/lib/function";
import { TokenMeta, TokenVisible } from "/constants/database";
import { all, filter, merge, sort, visibleArrToMap, TokenInfo } from "/modules/readnft";

const __mocked_test_meta__: TokenMeta[] = [
  {
    createdAt: new Date(2022, 6, 1).toISOString(),
    title: "test_token_1",
    id: "1",
    nftTokenId: "1",
  },
  {
    createdAt: new Date(2022, 6, 1).toISOString(),
    title: "test_token_2",
    nftTokenId: "2",
    id: "2",
  },
  {
    createdAt: new Date(2022, 6, 1).toISOString(),
    title: "test_token_2",
    nftTokenId: "2",
    id: "3",
  },
  {
    createdAt: new Date(2022, 6, 1).toISOString(),
    title: "test_token_3",
    nftTokenId: "4",
    id: "4",
  },
  {
    createdAt: new Date(2022, 6, 1).toISOString(),
    title: "test_token_4",
    nftTokenId: "5",
    id: "5",
  },
];

const __mocked_test_visible__: TokenVisible[] = [
  {
    id: "0",
    nftTokenId: "1",
    isHidden: "true",
    order: "0",
  },
  {
    id: "0",
    nftTokenId: "2",
    isHidden: "false",
    order: "0",
  },
  {
    id: "0",
    nftTokenId: "4",
    isHidden: "false",
    order: "30",
  },
  {
    id: "0",
    nftTokenId: "5",
    isHidden: "true",
    order: "15",
  },
  {
    id: "0",
    nftTokenId: "6",
    isHidden: "true",
    order: "15",
  },
];

describe("visibleArrToMap", () => {
  it("works with normal case", () => {
    expect(visibleArrToMap(__mocked_test_visible__)).toStrictEqual(
      new Map([
        [__mocked_test_visible__[0].nftTokenId, __mocked_test_visible__[0]],
        [__mocked_test_visible__[1].nftTokenId, __mocked_test_visible__[1]],
        [__mocked_test_visible__[2].nftTokenId, __mocked_test_visible__[2]],
        [__mocked_test_visible__[3].nftTokenId, __mocked_test_visible__[3]],
        [__mocked_test_visible__[4].nftTokenId, __mocked_test_visible__[4]],
      ]),
    );
  });
});

const __mocked_merge_info__: TokenInfo[] = __mocked_test_meta__.map((i) => ({
  _id: i.id,
  ...i,
  ...__mocked_test_visible__.find((i) => i.nftTokenId === i.nftTokenId)!,
}));

describe("merge", () => {
  it("should defined function", () => {
    expect(typeof merge).toBe("function");
  });

  it("works with normal case", () => {
    expect(pipe(__mocked_test_visible__, visibleArrToMap, merge(__mocked_test_meta__))).toStrictEqual(
      __mocked_merge_info__,
    );
  });
});

describe("filter", () => {
  it("should defined function", () => {
    expect(typeof filter).toBe("function");
  });

  it("works with normal case", () => {});
});

describe("sort", () => {
  it("should defined function", () => {
    expect(typeof sort).toBe("function");
  });

  it("works with normal case", () => {});
});

describe("all", () => {
  it("should defined function", () => {
    expect(typeof all).toBe("function");
  });

  it("works with normal case", () => {});
});
