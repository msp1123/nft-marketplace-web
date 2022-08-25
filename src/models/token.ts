export type TokenModel = {
    _id: string;
    active: boolean;
    collectionName: string;
    nftAddress: string;
    chainId: number;
    tokenId: number;
    amount: number;
    creator: string;
    royalty: number;
    name: string;
    description: string;
    image: string;
    txHash: string;
    notifications: any[];
    likes: number;
    comments: number;
    attributes: any[];
    createdAt: Date;
    updatedAt: Date;
    tokenPrice: number,
    __v: number;
}