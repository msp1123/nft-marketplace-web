export const sortOptions = [
    { name: "Most Popular", key: "likes", order: "desc" },
    { name: "Best Rating", key: "comments", order: "desc" },
    { name: "Newest", key: "timestamp", order: "desc" },
    { name: "Oldest", key: "timestamp", order: "asc" },
    { name: "Price: Low to High", key: "tokenPrice", order: "asc" },
    { name: "Price: High to Low", key: "tokenPrice", order: "desc" },
];

export const categories = [
    { name: "All" },
    { name: "Collectibles" },
    { name: "Arts" },
    { name: "Photography" },
    { name: "Music" },
    { name: "Video" },
];

export const filters = [
    {
        name: "Status",
        options: [
            { name: "Listed" },
            { name: "Sold" },
            { name: "Minted" }
        ]
    },
    {
        name: "Chains",
        options: [
            { chainId: 4, name: "Rinkeby" },
            { chainId: 80001, name: "Mumbai" }
        ]
    },
    {
        name: "Currency",
        options: [
            { name: "UNIKEN" },
            { name: "TUSDT" },
        ]
    },
];

export interface FilterInterface {
    name?: string,
    key?: string,
    order?: string,
    options?: any[]
}
