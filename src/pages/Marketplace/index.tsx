/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useCallback, useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { GetAllTokens } from "../../services/ApiServices";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../../redux/tokens/actions";
import { TokenModel } from "../../models/token";
import TokenCard from "../../components/TokenCard";
import { categories, filters, FilterInterface, sortOptions } from "./model";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Marketplace() {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const allTokensState = useSelector((state: any) => state?.allTokens);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<FilterInterface>(
    sortOptions[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<FilterInterface>(
    categories[0]
  );
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string[]>([]);

  const onSortChange = (sort: any) => {
    setSelectedSort(sort);
  };

  const onCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const handleFilters = (e: any) => {
    const section = e.target.getAttribute("name");
    const value = e.target.getAttribute("value");
    let element = document.getElementById(
      `filters-slider-${section}-${value}`
    ) as HTMLInputElement;

    if (element.checked) {
      if (section === "Status") {
        setSelectedStatus([...selectedStatus, value]);
      }
      if (section === "Chains") {
        setSelectedChains([...selectedChains, value]);
      }
      if (section === "Currency") {
        setSelectedCurrency([...selectedCurrency, value]);
      }
    } else {
      if (section === "Status") {
        setSelectedStatus(selectedStatus?.filter((v) => v !== value));
      }
      if (section === "Chains") {
        setSelectedChains(selectedChains?.filter((v) => v !== value));
      }
      if (section === "Currency") {
        setSelectedCurrency(selectedCurrency?.filter((v) => v !== value));
      }
    }
  };

  function selectedFilters(section: any, value: any): boolean {
    if (section === "Status") {
      if (selectedStatus.find((v) => v === value)) return true;
    }
    if (section === "Chains") {
      if (selectedChains.find((v) => v === value)) return true;
    }
    if (section === "Currency") {
      if (selectedCurrency.find((v) => v === value)) return true;
    }
    return false;
  }

  const resetFilters = () => {
    setSelectedStatus([]);
    setSelectedChains([]);
    setSelectedCurrency([]);
    setSelectedCategory(categories[0]);
  };

  const getTokens = useCallback(async () => {
    const tokensT = await GetAllTokens(account ? `?account=${account}` : "");
    if (tokensT) {
      dispatch(setTokens(tokensT));
    }
  }, [account, dispatch]);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="text-center pt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Marketplace
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base text-gray-400">
          Here you can discover different types of Collectibles, Arts, Music,
          Videos, Photography.
        </p>
      </div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
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
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-slate-800 shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-200">Filters</h2>
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
                              category.name === selectedCategory.name
                                ? "text-gray-200"
                                : "text-slate-500"
                            }
                            onClick={() => onCategoryChange(category)}
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
                      key={section.name}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
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
                                  key={option.name}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filters-slider-${section.name}-${option.name}`}
                                    name={`${section.name}`}
                                    value={option.name}
                                    type="checkbox"
                                    onChange={handleFilters}
                                    defaultChecked={selectedFilters(
                                      section.name,
                                      option.name
                                    )}
                                    className="h-4 w-4 border-gray-300 rounded text-violet-600 focus:ring-violet-500"
                                  />
                                  <label
                                    htmlFor={`filters-slider`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.name}
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
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="m-4 block border-transparent rounded-md py-3 px-8 text-base font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:bg-pink-600 sm:w-auto"
                >
                  Done
                </button>
                <div
                  onClick={() => {
                    resetFilters()
                    setMobileFiltersOpen(false);
                  }}
                  className="text-md text-center cursor-pointer text-gray-400 hover:text-gray-300"
                >
                  Reset
                </div>
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
                  {selectedSort.name}
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
                    {sortOptions.map((sort) => (
                      <Menu.Item key={sort.name}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              sort.name === selectedSort.name
                                ? "font-bold text-gray-200"
                                : "text-gray-400",
                              active ? "bg-slate-600" : "",
                              "block px-4 py-2 text-sm cursor-pointer"
                            )}
                            onClick={() => onSortChange(sort)}
                          >
                            {sort.name}
                          </div>
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
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>

      {/* Filters & Tokens Desktop */}
      <div className="flex justify-center py-6">
        {/* Tokens grid */}
        <ul
          role="list"
          className="gap-6 grid grid-cols-1 group px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6"
        >
          {allTokensState.tokens && allTokensState.tokens.length > 0 ? (
            allTokensState.tokens.map((token: TokenModel, index: number) => (
              <TokenCard token={token} key={index}/>
            ))
          ) : (
            <div className="align-middle w-screen px-4 sm:px-6 lg:px-8">
              <div className="text-center py-16">
                <h1 className="mt-2 text-4xl font-bold text-gray-200 tracking-tight sm:text-5xl sm:tracking-tight">
                  No NFT found.
                </h1>
                <p className="mt-2 text-base text-gray-400">
                  Sorry, we couldn't find any NFTs for you.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="text-base font-medium text-gray-300 hover:text-gray-400"
                  >
                    Retry<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
