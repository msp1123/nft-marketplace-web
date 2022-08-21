export interface UserModel {
    _id: string;
    active: boolean;
    address: string;
    imageUrl: string;
    followers: number;
    followings: number;
    popularity: number;
    social: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}