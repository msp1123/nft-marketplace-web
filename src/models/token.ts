export interface TokenModel {
    _id: string;
    active: boolean;
    isLiked: boolean;
    isSaved: boolean;
    collectionName: string;
    collectionId: CollectionID;
    nftAddress: string;
    chainId: number;
    tokenId: number;
    amount: number;
    creator: string;
    royalty: number;
    name: string;
    description: string;
    previewImage: string;
    txHash: string;
    likes: number;
    comments: number;
    attachments: Attachment[];
    attributes: any[];
    createdAt: Date;
    updatedAt: Date;
    tokenPrice: string;
    __v: number;
}

export interface Attachment {
    fileType: string;
    url: string;
    _id: string;
}

export interface CollectionID {
    _id: string;
    active: boolean;
    chainId: number;
    address: string;
    owner: string;
    category: string;
    name: string;
    url: string;
    description: string;
    profileImage: string;
    links: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}