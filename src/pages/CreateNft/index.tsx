import { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

const chains = [
  { chainId: 1, name: "Ethereum" },
  { chainId: 137, name: "Polygon" },
  { chainId: 4, name: "Rinkeby" },
  { chainId: 5, name: "Goerli" },
];

const collections = [
  { id: 1, name: "Unicorns" },
  { id: 2, name: "Purple Warrior" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateNft() {
  const [chainQuery, setChainQuery] = useState("");
  const [selectedChain, setSelectedChain] = useState();
  const [collectionQuery, setCollectionQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState();

  const filteredChains =
    chainQuery === ""
      ? chains
      : chains.filter((chain) => {
          return chain.name.toLowerCase().includes(chainQuery.toLowerCase());
        });

  const filteredCollections =
    collectionQuery === ""
      ? collections
      : collections.filter((collection) => {
          return collection.name
            .toLowerCase()
            .includes(collectionQuery.toLowerCase());
        });
        
  const validateForm = () => {
    let name = document.getElementById('name');
    console.log(name);
  }

  return (
    <div className="flex justify-center bg-slate-900 pt-12 px-4">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-4">
          <div>
            <div>
              <h1 className="text-6xl leading-6 font-medium text-white">
                Create NFT
              </h1>
              <p className="mt-6 text-sm text-gray-300">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Asset name"
                    autoComplete="given-name"
                    className="shadow-sm text-white caret-purple-200 bg-slate-800 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm text-white caret-purple-200 bg-slate-800 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about the asset.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-300"
                >
                  Asset Image, Video, Music
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-500">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/png, image/gif, image/jpeg, video/mp4, audio/mp3"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, MP4, MP3 up to 20MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="supply"
                  className="block text-sm font-medium text-gray-300"
                >
                  Supply
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    defaultValue="1"
                    name="first-name"
                    id="supply"
                    autoComplete="given-name"
                    className="shadow-sm bg-slate-800 text-white caret-purple-200 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Combobox
                  as="div"
                  value={selectedChain}
                  onChange={setSelectedChain}
                >
                  <Combobox.Label className="block text-sm font-medium text-gray-300">
                    Blockchain
                  </Combobox.Label>
                  <div className="relative mt-1">
                    <Combobox.Input
                      id="blockchain"
                      className="w-full pointer-events-none rounded-md border border-gray-300 bg-slate-800 text-white caret-purple-200 py-2 pl-3 pr-10 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                      onChange={(event) => setChainQuery(event.target.value)}
                      defaultValue={chains[0].name}
                      displayValue={(chain: any) => chain?.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    {filteredChains.length > 0 && (
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredChains.map((chain) => (
                          <Combobox.Option
                            key={chain.chainId}
                            value={chain}
                            className={({ active }) =>
                              classNames(
                                "relative cursor-default select-none py-2 pl-3 pr-9",
                                active
                                  ? "bg-purple-600 text-white"
                                  : "text-gray-300"
                              )
                            }
                          >
                            {({ active, selected }) => (
                              <>
                                <span
                                  className={classNames(
                                    "block truncate",
                                    selected && "font-semibold"
                                  )}
                                >
                                  {chain.name}
                                </span>

                                {selected && (
                                  <span
                                    className={classNames(
                                      "absolute inset-y-0 right-0 flex items-center pr-4",
                                      active ? "text-white" : "text-purple-600"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}
                  </div>
                </Combobox>
              </div>
            </div>
            <Combobox
              as="div"
              value={selectedCollection}
              onChange={setSelectedCollection}
              className="mt-6"
            >
              <Combobox.Label className="block text-sm font-medium text-gray-300">
                Collection
              </Combobox.Label>
              <div className="relative mt-1">
                <Combobox.Input
                  id="collection"
                  className="w-full pointer-events-none rounded-md border border-gray-300 bg-slate-800 text-white caret-purple-200 py-2 pl-3 pr-10 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  onChange={(event) => setCollectionQuery(event.target.value)}
                  displayValue={(collection: any) => collection?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredCollections.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredCollections.map((collection) => (
                      <Combobox.Option
                        key={collection.id}
                        value={collection}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active
                              ? "bg-purple-600 text-white"
                              : "text-gray-300"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected && "font-semibold"
                              )}
                            >
                              {collection.name}
                            </span>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-purple-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-3xl leading-6 font-medium text-white">
                Notifications
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>
            </div>
            <div className="mt-6">
              <fieldset>
                <legend className="sr-only">By Email</legend>
                <div
                  className="text-base font-medium text-gray-400"
                  aria-hidden="true"
                >
                  By Email
                </div>
                <div className="mt-4 space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="likes-notify"
                        name="likes-notify"
                        type="checkbox"
                        className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="likes-notify"
                        className="font-medium text-gray-300"
                      >
                        Likes
                      </label>
                      <p className="text-gray-500">
                        Get notified when a user likes this asset.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments-notify"
                        name="comments-notify"
                        type="checkbox"
                        className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments-notify"
                        className="font-medium text-gray-300"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="purchase-notify"
                        name="purchase-notify"
                        type="checkbox"
                        className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="purchase-notify"
                        className="font-medium text-gray-300"
                      >
                        Purchase
                      </label>
                      <p className="text-gray-500">
                        Get notified when a user purchases this asset.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-slate-800 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
              <div
                onClick={() => {return validateForm()}}
                className="py-3 px-4 mx-3 w-44 text-center rounded-md shadow-lg shadow-gray-500/50 font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-pink-600"
              >
                Create
              </div>
          </div>
        </div>
      </form>
    </div>
  );
}
