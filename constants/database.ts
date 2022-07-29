export type TokenMeta = {
  id: `${number}`;
  nftTokenId: `${number}`;
  title: string;
  createdAt: `${ReturnType<Date["toISOString"]>}`;
};

export async function getTokensMeta() {
  // await new Promise((r) => setTimeout(r, 3000));
  return tokensMeta;
}

export const tokensMeta: TokenMeta[] = [
  {
    id: "0",
    nftTokenId: "1",
    title: "test_app_1",
    createdAt: new Date(2022, 6, 28).toISOString(),
  },
  {
    id: "1",
    nftTokenId: "2",
    title: "test_app_2",
    createdAt: new Date(2022, 6, 29).toISOString(),
  },
  {
    id: "2",
    nftTokenId: "2",
    title: "test_app_2",
    createdAt: new Date(2022, 6, 29).toISOString(),
  },
  {
    id: "3",
    nftTokenId: "3",
    title: "test_app_3",
    createdAt: new Date(2022, 6, 29).toISOString(),
  },
  {
    id: "4",
    nftTokenId: "4",
    title: "test_app_4",
    createdAt: new Date(2022, 6, 31).toISOString(),
  },
];

export type TokenVisible = {
  id: `${number}`;
  nftTokenId: `${number}`;
  isHidden: `${boolean}`;
  order: `${number}`;
};

export async function getTokensVisible() {
  // await new Promise((r) => setTimeout(r, 2000));
  return tokensVisible;
}

export const tokensVisible: TokenVisible[] = [
  {
    id: "0",
    nftTokenId: "1",
    isHidden: "false",
    order: "0",
  },
  {
    id: "1",
    nftTokenId: "2",
    isHidden: "true",
    order: "0",
  },
  {
    id: "2",
    nftTokenId: "3",
    isHidden: "false",
    order: "50",
  },
  {
    id: "3",
    nftTokenId: "4",
    isHidden: "false",
    order: "30",
  },
];
