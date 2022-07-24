/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { ChevronRightIcon } from "@heroicons/react/solid";
import Arts from "../../assets/Images/home/arts.jpeg";
import Music from "../../assets/Images/home/music.jpeg";
import Video from "../../assets/Images/home/video.jpeg";
import Trending from "../../assets/Images/home/trending.jpeg";
import Collectibles from "../../assets/Images/home/collectibles.jpeg";
import PurpleNftBg from "../../assets/Images/home/nft-bg.png";
import { IoWalletOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { MdOutlineImagesearchRoller } from "react-icons/md";
import { metamaskDappLink } from "../../utils/helpers";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/connections";

const categories = [
  {
    name: "Collectibles",
    href: "#",
    imageSrc: Collectibles,
  },
  {
    name: "Trending",
    href: "#",
    imageSrc: Trending,
  },
  {
    name: "Arts",
    href: "#",
    imageSrc: Arts,
  },
  {
    name: "Music",
    href: "#",
    imageSrc: Music,
  },
  {
    name: "Video",
    href: "#",
    imageSrc: Video,
  },
];

const cards = [
  {
    href: "#",
    name: "Wallet",
    linkName: "Connect wallet",
    description:
      "By clicking the Connect button on the top right corner you can connect your wallet with us. You must need Metamask wallet to connect.",
    icon: IoWalletOutline,
  },
  {
    href: "#",
    name: "NFT",
    linkName: "Mint now",
    description:
      "Mint your own NFT (Art, Image, Video, Photography) under your collection with your prefered title, description attributes to make a good impression.",
    icon: MdOutlineImagesearchRoller,
  },
  {
    href: "#",
    name: "Listing",
    linkName: "Sell your NFT",
    description:
      "List your NFT with the value of your asset. we will help you to sell them and if you were the Creator of the NFT you'll get your Royalty on every Sale.",
    icon: FaOpencart,
  },
];

export default function Home() {
  const { active, activate } = useWeb3React();

  const connectWallet = () => {
    if (!window.ethereum) {
      window.open(metamaskDappLink);
    } else {
      activate(injected);
    }
  };

  return (
    <div className="bg-slate-900">
      {/* Main section */}
      <div className="overflow-hidden">
        <main>
          <div className="pt-10 bg-slate-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <a
                      href="#"
                      className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-pink-600 rounded-full">
                        Free Mint
                      </span>
                      <span className="ml-4 text-sm">
                        Free mint available here
                      </span>
                      <ChevronRightIcon
                        className="ml-2 w-5 h-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                    <h1 className="mt-4 text-5xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-7xl">
                      <span className="block">A better way to</span>
                      <span className="block text-purple-500">
                        mint, sell, buy
                      </span>
                      <span className="text-pink-600">NFTs</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Here you can Mint, Buy & Sell your NFTs with royalty and
                      with minimal gas fees.
                    </p>
                    <div className="sm:ml-0 mt-8 content-start w-56">
                      <button
                        type="submit"
                        onClick={
                          !active
                            ? () => {
                                connectWallet();
                              }
                            : () => {}
                        }
                        className="block w-full py-3 px-4  rounded-md shadow-lg shadow-gray-500/50 font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-pink-600"
                      >
                        {active ? "Explore MarketPlace" : "Connect Wallet"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 hidden sm:block sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Categories section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 xl:max-w-7xl xl:mx-auto xl:px-8"
        >
          <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              Shop by Category
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-purple-500 hover:text-purple-400 sm:block"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src={category.imageSrc}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {category.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section
          className="pt-24 max-w-md mx-auto relative z-10 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
          aria-labelledby="contact-heading"
        >
          <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
            {cards.map((card) => (
              <div
                key={card.name}
                className="flex flex-col bg-gradient-to-l from-purple-600 to-pink-600 rounded-2xl shadow-xl"
              >
                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                  <div className="absolute top-0 p-5 inline-block bg-purple-700 rounded-xl shadow-lg transform -translate-y-1/2">
                    <card.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-200">
                    {card.name}
                  </h3>
                  <p className="mt-4 text-base text-gray-300">
                    {card.description}
                  </p>
                </div>
                <div className="p-6 backdrop-blur-xl rounded-bl-2xl rounded-br-2xl md:px-8">
                  <a
                    href={card.href}
                    className="text-base font-medium text-white hover:text-gray-300"
                  >
                    {card.linkName}
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Mint NFT banner section */}
        <section
          aria-labelledby="social-impact-heading"
          className="max-w-7xl mx-auto pt-12 px-4 sm:pt-12 sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <div className="absolute inset-0">
              <img
                src={PurpleNftBg}
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="relative backdrop-blur-sm bg-gray-900 bg-opacity-25 py-12 px-6 sm:py-40 sm:px-12 lg:px-16">
              <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                <h2
                  id="social-impact-heading"
                  className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                >
                  <span className="block sm:inline">Mint your </span>
                  <span className="block sm:inline">own NFT</span>
                </h2>
                <p className="mt-3 text-xl text-white">
                  Non-fungible tokens (NFTs) are cryptographic assets on a
                  blockchain with unique identification codes and metadata that
                  distinguish them from each other. Unlike cryptocurrencies,
                  they cannot be traded or exchanged at equivalency.
                </p>
                <a
                  href="#"
                  className="mt-8 w-full block border-transparent rounded-md py-3 px-8 text-base font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:bg-pink-600 sm:w-auto"
                >
                  Mint now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section
          aria-labelledby="social-impact-heading"
          className="max-w-7xl pb-8 pt-12 mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-0 lg:max-w-7xl lg:px-0">
            <div className="py-10 px-6 bg-gradient-to-l from-pink-500 to-purple-700 rounded-3xl sm:py-16 sm:px-12 lg:py-20 lg:px-20 lg:flex lg:items-center">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Sign up for our newsletter
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-cyan-100">
                  So that you'll never miss an oppourtunity of our offers and
                  free NFT minting.
                </p>
              </div>
              <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
                <div className="sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="block w-full py-3 px-4 rounded-md shadow bg-purple-600 text-white font-medium hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                    >
                      Notify me
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-cyan-100">
                  Reed our{" "}
                  <a href="#" className="text-white font-medium underline">
                    Privacy Policy
                  </a>{" "}
                  before proceed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
