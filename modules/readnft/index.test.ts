import { TokenMeta, TokenVisible } from "/constants/database";
import { mergeVisibleAndMeta } from "/modules/readnft";

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

describe("mergeVisibleAndMeta", () => {
  it("well merged", () => {
    const expectArray = [
      {
        ...__mocked_test_meta__[0],
        ...__mocked_test_visible__[0],
      },
      {
        ...__mocked_test_meta__[1],
        ...__mocked_test_visible__[1],
      },
      {
        ...__mocked_test_meta__[2],
        ...__mocked_test_visible__[1],
      },
      {
        ...__mocked_test_meta__[3],
        ...__mocked_test_visible__[2],
      },
      {
        ...__mocked_test_meta__[4],
        ...__mocked_test_visible__[3],
      },
    ];

    expect(mergeVisibleAndMeta(__mocked_test_visible__)(__mocked_test_meta__)).toStrictEqual(expectArray);
  });
});
