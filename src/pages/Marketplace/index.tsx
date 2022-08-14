/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import PolygonIcon from "../../assets/Icons/polygon.png"
import EthereumIcon from "../../assets/Icons/ethereum.png"
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Oldest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const categories = [
  { name: "All", active: true },
  { name: "Collectibles", active: false },
  { name: "Arts", active: false },
  { name: "Photography", active: false },
  { name: "Music", active: false },
  { name: "Video", active: false },
];

const filters = [
  {
    id: "chains",
    name: "Chains",
    options: [
      { chainId: 1, label: "Ethereum", checked: false },
      { chainId: 4, label: "Rinkeby", checked: true },
      { chainId: 137, label: "Polygon", checked: false },
      { chainId: 80001, label: "Mumbai", checked: false },
      { chainId: 420, label: "Goerli", checked: false },
    ],
  },
  {
    id: "status",
    name: "Status",
    options: [
      { label: "Buy Now", checked: true },
      { label: "Minted", checked: true },
      { label: "Sold Out", checked: false },
      { label: "Upcoming", checked: false },
    ],
  },
  {
    id: "currency",
    name: "Currency",
    options: [
      { label: "ETH", checked: true },
      { label: "TKN", checked: false },
      { label: "USDT", checked: false },
    ],
  },
];

const assets = [
  {
    price: 50,
    currency: "ETH",
    name: "Snow Cap Sarsaparilla",
    by: "Unicorns",
    imageSrc:
      "https://lh3.googleusercontent.com/fdxdjAAsIlPXf8pbjDx4aycZHaEFvFVZ1Y9S4EyTM7Hk-zYD3yPEKQ5jXKZd5XcsoeFu4IRdtfZWoDMN3633Jx9DzX54jyscJfcXFA=w282",
  },
  {
    price: 50,
    currency: "ETH",
    name: "Snow Cap Sarsaparilla",
    by: "Monkey king",
    imageSrc:
      "https://lh3.googleusercontent.com/8k_R8EMckL4ciR8QC6vaIL-IcMHYXyWpwh9-5hBK6avGeEB0elv8zja_iWh1X7tOV4UW54kvZ37BBogJDaECKlm8k9Y_JPAi1Tg3=w282",
  },
  {
    price: 140,
    currency: "MATIC",
    name: "Zip Tote Basket",
    by: "Unicorns",
    imageSrc:
      "https://lh3.googleusercontent.com/MHdI5nIKjItzrhvy4u1nh5EgrKR1jiDO9Ou6VI10XHAMsfZVbuQje2odU_Kb2HDs1dmgEgJ-njRH1SYfo_4Aq1rbSAgtj-WVW2EA=w282",
  },
  {
    price: 50,
    currency: "MATIC",
    name: "Nomad Pouch",
    by: "Wierdo",
    imageSrc:
      "https://lh3.googleusercontent.com/CH0hHgbknxE6jhAEqgNg9CZNn8m3mKmnUuI2R2ukbHEAmB9a4PZKDYm18beMBDS5SoRDGLv83qeU9E5xqPErC334O5LtmUwtzqB7=w282",
  },
  {
    price: 140,
    currency: "ETH",
    name: "Zip Tote Basket",
    by: "Wierdo",
    imageSrc:
      "https://lh3.googleusercontent.com/s99pHohl4I5mJlTdrNqGYWQ9Qk5bccfj_bsk7ZGluHcYt0YqKtpSbt0rkxIe-6ev1T_J_F0stxKiOhoURj_20I81jmfEKBEtgJqgwQ=w282",
  },
  {
    price: 140,
    currency: "ETH",
    name: "Zip Tote Basket",
    by: "Unicorns",
    imageSrc:
      "https://lh3.googleusercontent.com/NP_ut5jkzIp4GovuJiaYpWiM-r0jGo8tVe_9v14YY2YhlY_zTf0Nag4awyMN4Mmz8Kjr7ieKbFNdvVWXtsCzzI91t7ygWMDlSZnT5Q=w282",
  },
  {
    price: 50,
    currency: "MATIC",
    name: "Snow Cap Sarsaparilla",
    by: "Hyper Kong",
    imageSrc:
      "https://lh3.googleusercontent.com/sRuHccMMUTvZFC9HfPhLdCLnUBANY2wZXO3t_zJPQ92zpGozpkLvjpOY-jLw3jhSdw5cB3UBiKms-xSkeykfeT1os-iRUTUvNdzjN_g=w282",
  },
  {
    price: 140,
    currency: "ETH",
    name: "Zip Tote Basket",
    by: "Evil princess",
    imageSrc:
      "https://lh3.googleusercontent.com/lOZ1dBrxXxabWdV9wpAczzSX-EpPmkGMDxICT3qG4pNQk5el1D5cmuYafadqxhkHtN68DjNbWI6FsB1Rbf_-yS7pF2g_o64YiaTGxQ=w282",
  },
  {
    price: 50,
    currency: "ETH",
    name: "Nomad Pouch",
    by: "Wierdo",
    imageSrc:
      "https://lh3.googleusercontent.com/GyZSwH_xip8se6CDg0FP_--0l9-_O9Ue-U69H2pthZ9GbFTqkIK0yX6Yyk7IKxOHY9cgxLgdNMDYL07FuTlw6jOTSJF0Xvzy_D12=w282",
  },
  {
    price: 140,
    currency: "ETH",
    name: "Zip Tote Basket",
    by: "Crazy cat",
    imageSrc:
      "https://lh3.googleusercontent.com/5Q-PY5up-tBgpW2ex6iphCqNUXwY2_1iQknhZXZB2kL1dArLJJdKGtdKoasKeYqfQZbTpP7P8oTP0LQmNfvEREzTN3jEzNj2X_Zv=w282",
  },
  {
    price: 50,
    currency: "MATIC",
    name: "Nomad Pouch",
    by: "Unicorns",
    imageSrc:
      "https://lh3.googleusercontent.com/KnOrWuzQ-O5DXfmVs87cx0QLSs5DmLq8YSIdJBdNoWaD4f9NwwvT93EYoVZ52aKYsEOglMJAz30GmqQUPBwdzkz1aSToYPquYXiITg=w282",
  },
  {
    price: 140,
    currency: "ETH",
    name: "Zip Tote Basket",
    by: "Zig Zag",
    imageSrc:
      "https://lh3.googleusercontent.com/z7YfdE0pEKOQaaRxF3PHrbAGytytihibImiGTwXc9qXCDvQuCX6cl3xylNf3e2xePrSDkcyr2Sd9svBocCqLZGBfkoouJ2eDMNp-=w282",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-slate-900 min-h-full">
      <section>
        <div className="text-center pt-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Marketplace
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-base text-gray-400">
            Here you can discover different types of Collectibles, Arts, Music,
            Videos, Photography.
          </p>
        </div>
      </section>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-slate-900 shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-200">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-slate-900 p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="font-medium text-gray-200 px-2 py-3"
                    >
                      {categories.map((category) => (
                        <li key={category.name}>
                          <div className="block px-2 py-3 cursor-pointer">
                            <div
                              className={
                                category.active
                                  ? "text-gray-200"
                                  : "text-slate-500"
                              }
                            >
                              {category.name}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="px-2 py-3 bg-slate-900 w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-200">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.label}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.label}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 border-gray-300 rounded text-violet-600 focus:ring-violet-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-200">
              {}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-200 hover:text-gray-400">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-200 group-hover:text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-slate-800">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-bold text-gray-200"
                                  : "text-gray-400",
                                active ? "bg-slate-600" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="assets-heading" className="pt-6 pb-24">
            <div className="flex flex-row flex-nowrap justify-center">
              {/* Filters Desktop */}
              <form className="hidden lg:block w-72 mr-6">
                <ul
                  role="list"
                  className="text-lg font-semibold cursor-pointer space-y-4 pb-6 border-b border-gray-200"
                >
                  {categories.map((category) => (
                    <li key={category.name}>
                      <div
                        className={
                          category.active ? "text-gray-200" : "text-slate-500"
                        }
                      >
                        {category.name}
                      </div>
                    </li>
                  ))}
                </ul>

                {filters.map((filter) => (
                  <Disclosure
                    as="div"
                    key={filter.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-slate-900 w-full flex items-center justify-between text-sm text-gray-200 hover:text-gray-400">
                            <span className="text-lg font-semibold text-gray-200">
                              {filter.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {filter.options.map((option, optionIdx) => (
                              <div
                                key={option.label}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${filter.id}-${optionIdx}`}
                                  name={`${filter.id}[]`}
                                  defaultValue={option.label}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 border-gray-300 rounded text-violet-600"
                                />
                                <label
                                  htmlFor={`filter-${filter.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-300"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <ul
                role="list"
                className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8"
              >
                {assets.map((asset) => (
                  <a key={asset.imageSrc} href={"/"} className="group text-sm">
                    <div className="rounded-lg bg-slate-800 p-2">
                      <div className="rounded-lg overflow-hidden">
                        <img
                          className="scale-100 hover:scale-110 ease-in duration-300"
                          src={asset.imageSrc}
                          alt={asset.name}
                        />
                      </div>
                      <div className="bg-slate-800 px-2 pt-2 relative">
                        <h3 className="text-gray-200 font-medium">
                          <dt className="sr-only">Title</dt>
                          {asset.name}
                        </h3>
                        <div className="flex flex-row pb-2">
                          <h2 className="text-gray-400 pr-1 font-light text-xs">
                            by
                          </h2>
                          <h3 className="text-gray-300 font-light text-xs">
                            {asset.by}
                          </h3>
                        </div>
                        <div className="flex flex-row">
                          <img
                            className="h-5 pr-2"
                            src={ asset.currency === "ETH" ? EthereumIcon : PolygonIcon}
                            alt={asset.name}
                          />
                          <span className="text-white text-base font-medium rounded-md">
                            {asset.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
