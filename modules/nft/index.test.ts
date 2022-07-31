import { pipe } from "fp-ts/lib/function";
import { TokenMeta, TokenVisible } from "/constants/database";
import { all, merge, visibleArrToMap, TokenInfo, filter, sort } from ".";

const __mocked_token_meta__: TokenMeta[] = [
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

const __mocked_token_visible__: TokenVisible[] = [
  {
    id: "1",
    nftTokenId: "1",
    isHidden: "true",
    order: "0",
  },
  {
    id: "2",
    nftTokenId: "2",
    isHidden: "false",
    order: "0",
  },
  {
    id: "3",
    nftTokenId: "4",
    isHidden: "false",
    order: "30",
  },
  {
    id: "4",
    nftTokenId: "5",
    isHidden: "true",
    order: "15",
  },
  {
    id: "5",
    nftTokenId: "6",
    isHidden: "true",
    order: "15",
  },
];

const __mocked_token_info__: TokenInfo[] = [
  {
    _id: "1",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_1",
    id: "1",
    nftTokenId: "1",
    isHidden: "true",
    order: "0",
  },
  {
    _id: "2",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_2",
    nftTokenId: "2",
    id: "2",
    isHidden: "false",
    order: "0",
  },
  {
    _id: "3",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_2",
    nftTokenId: "2",
    id: "2",
    isHidden: "false",
    order: "0",
  },
  {
    _id: "4",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_3",
    nftTokenId: "4",
    id: "3",
    isHidden: "false",
    order: "30",
  },
  {
    _id: "5",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_4",
    nftTokenId: "5",
    id: "4",
    isHidden: "true",
    order: "15",
  },
];

const __mocked_token_final__: TokenInfo[] = [
  {
    _id: "4",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_3",
    nftTokenId: "4",
    id: "3",
    isHidden: "false",
    order: "30",
  },
  {
    _id: "2",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_2",
    nftTokenId: "2",
    id: "2",
    isHidden: "false",
    order: "0",
  },
  {
    _id: "3",
    createdAt: "2022-06-30T15:00:00.000Z",
    title: "test_token_2",
    nftTokenId: "2",
    id: "2",
    isHidden: "false",
    order: "0",
  },
];

describe("merge", () => {
  it("works with normal case", () => {
    expect(pipe(__mocked_token_visible__, visibleArrToMap, merge(__mocked_token_meta__))).toStrictEqual(
      __mocked_token_info__,
    );
  });
});

describe("merge", () => {
  it("should be exclude unmatched visible", () => {
    expect(
      merge(__mocked_token_meta__)(visibleArrToMap(__mocked_token_visible__)).some((i) => i.nftTokenId === "6"),
    ).toBeFalsy();
  });
});

describe("filter", () => {
  it("should be include isHidden=false item", () => {
    expect(filter(__mocked_token_info__).some((item) => item.isHidden === "true")).not.toBeTruthy();
    expect(filter(__mocked_token_info__).some((item) => item.isHidden === "false")).toBeTruthy();
  });

  it("should be exclude isHidden=true item", () => {
    expect(filter(__mocked_token_info__).some((item) => item.isHidden === "false")).toBeTruthy();
    expect(filter(__mocked_token_info__).some((item) => item.isHidden === "true")).not.toBeTruthy();
  });
});

describe("sort", () => {
  it("should be sorted first item order is 30", () => {
    expect(sort(__mocked_token_info__)[0].order).toBe("30");
  });

  it("should be sorted last item order is 0", () => {
    expect(sort(__mocked_token_info__)[4].order).toBe("0");
  });
});

describe("all", () => {
  it("should defined function", () => {
    expect(typeof all).toBe("function");
  });

  it("works with normal case", () => {
    expect(all(__mocked_token_meta__)(__mocked_token_visible__)).toStrictEqual(__mocked_token_final__);
  });
});
