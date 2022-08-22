/* eslint-disable react/jsx-no-target-blank */
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { storage } from "../../services/FirebaseServices";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  CreateToken,
  GetSupportedNetworks,
  GetUniqueTokenId,
  GetUserCollections,
} from "../../services/ApiServices";
import CONFIG from "../../configs/globalConfigs";
import TokenMarketJson from "../../abi/TokenMarket.json";
import { callWithEstimateGas } from "../../hooks/Web3/estimateGas";
import { ethers } from "ethers";

export default function CreateNft() {
  const { account, active } = useWeb3React();

  const [supply, setSupply] = useState(5);
  const [royalty, setRoyalty] = useState(0);
  const [chainId, setChainId] = useState(0);
  const [tokenId, setTokenId] = useState(0);

  const [name, setName] = useState("");
  const [txHash, setTxHash] = useState("");
  const [collection, setCollection] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [description, setDescription] = useState("");
  const [explorerUrl, setExplorerUrl] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isCollectionSet, setIsCollectionSet] = useState<boolean>(false);
  const [supportedNetworks, setSupportedNetworks] = useState<any[]>([]);

  // Helper variables
  const [buttonLabel, setButtonLabel] = useState("Create");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Temp variables
  const [imageFile, setImageFile] = useState<any>();
  const [collections, setCollections] = useState<any[]>();
  const [imagePreview, setImagePreview] = useState<any>();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const fetchSupportedNetworks = async () => {
    let networks = await GetSupportedNetworks();
    if (networks && networks.length > 0) {
      setSupportedNetworks(networks);
    }
  };

  const getTokenId = useCallback(async () => {
    if (!chainId || !nftAddress) return;
    let tokenId = await GetUniqueTokenId(chainId, nftAddress);
    if (tokenId) {
      setTokenId(tokenId);
    } else {
      setButtonLabel("Failed");
      setIsButtonClicked(false);
    }
  }, [chainId, nftAddress]);

  const fetchCollections = useCallback(async () => {
    if (!account) return toast.error("Connect wallet to continue");
    let collectionsT = await GetUserCollections(account!, "trim=true");
    if (collectionsT) {
      setCollections(collectionsT);
      if (!isCollectionSet) {
        setChainId(collectionsT[0].chainId);
        setNftAddress(collectionsT[0].address);
        setCollection(collectionsT[0].name)
      };
      setIsCollectionSet(true);
      getTokenId();
    }
  }, [account, isCollectionSet, getTokenId]);

  const onCollectionChange = async (name: any) => {
    let collectionT = collections?.find((c) => c.name === name);
    if (collectionT) {
      setChainId(collectionT.chainId);
      setNftAddress(collectionT.address);
      setCollection(name);
      getTokenId();
    }
  };

  const handleNotifications = (e: any) => {
    const name = e.target.getAttribute("name");
    let element = document.getElementById(name) as HTMLInputElement;
    if (element.checked) {
      setNotifications([...notifications!, name]);
    } else {
      setNotifications(notifications?.filter((n) => n !== name));
    }
  };

  const mintToken = async () => {
    setButtonLabel("Minting");
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let network = supportedNetworks.find((n) => n.chainId === chainId);

    if (!network) {
      setButtonDefaults();
      return toast.error("Selected network is not available.");
    }
    setExplorerUrl(network.explorerUrl);
    let marketAddress = network.marketContractAddress;
    let activeNetwork = await provider.getNetwork();
    let signer = provider.getSigner();

    if (activeNetwork.chainId !== chainId) {
      setButtonDefaults();
      return toast.error(`Please connect to ${network.displayName}`);
    }

    let contract = new ethers.Contract(
      marketAddress,
      TokenMarketJson.abi,
      signer
    );
    try {
      var tx = await callWithEstimateGas(contract, "mintToken", [
        tokenId,
        royalty,
        supply,
      ]);
    } catch (error) {
      setButtonDefaults();
      return toast.error("Transaction failed!.")
    };
    setTxHash(tx.hash);
    uploadImage(tx.hash);
    toast.promise(tx.wait(), {
      pending: "Transaction is processing.",
      success: "Token Minted successfully.",
      error: "Failed to Mint Token.",
    });
  };

  const uploadImage = async (txHash: string) => {
    let fileType = imageFile.type.split("/")[1];
    let fileName = "TKN-" + tokenId;

    const storageRef = ref(
      storage,
      `${account}/token/${nftAddress}/${fileName}.${fileType}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setButtonLabel(`Uploading ${progress}%`);
      },
      (error) => {
        setButtonLabel("Failed");
        setIsButtonClicked(false);
        toast.error("Image upload failed!.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createToken(downloadURL, txHash);
        });
      }
    );
  };

  const createToken = async (imageUrl: string, txHash: string) => {
    setButtonLabel("Creating");
    let input = {
      name: name,
      image: imageUrl,
      txHash: txHash,
      tokenId: tokenId,
      description: description,
      collectionName: collection,
      amount: parseInt(supply.toString()),
      royalty: parseInt(royalty.toString()),
    };

    let token = await CreateToken(input);
    if (token) {
      setButtonLabel("Created");
    } else {
      setButtonLabel("Failed");
      setIsButtonClicked(false);
    }
  };

  const validateForm = () => {
    setButtonLabel("Validating");
    setIsButtonClicked(true);
    let authToken = localStorage.getItem(CONFIG.authTokenStorageKey);
    let loggedInUser = localStorage.getItem(CONFIG.authLoggedInUser);
    if (loggedInUser !== account) {
      setIsCollectionSet(false);
      fetchCollections();
    }
    if (!authToken || loggedInUser !== account) {
      setButtonDefaults();
      return toast.error("Session expired. Please login.");
    }
    if (!imageFile) {
      setButtonDefaults();
      return toast.error("No image selected.");
    }
    if (!account) {
      setButtonDefaults();
      return toast.error("Connect wallet before continue");
    }
    if (!name) {
      setButtonDefaults();
      return toast.error("Token name is required.");
    }
    if (!supply || supply <= 0) {
      setButtonDefaults();
      return toast.error("Invalid token supply.");
    }
    if (!tokenId) {
      setButtonDefaults();
      return toast.error("Invalid token metadata. Please try again later.");
    }
    if (royalty > 10) {
      setButtonDefaults();
      return toast.error("Royalty should be less than 10.");
    }
    if (!collection) {
      setButtonDefaults();
      return toast.error("Collection is mandatory.");
    }
    mintToken();
  };

  const setButtonDefaults = () => {
    setButtonLabel("Create");
    setIsButtonClicked(false);
  };

  useEffect(() => {
    fetchSupportedNetworks();
    if (active) {
      fetchCollections();
    }
  }, [active, isCollectionSet, fetchCollections]);

  return (
    <div className="flex justify-center bg-slate-900 pt-8 px-4 min-h-full">
      <form className="space-y-8 divide-y divide-gray-200 max-w-xl">
        <div className="space-y-4 divide-y divide-gray-200">
          <div>
            <div>
              <h1 className="text-6xl leading-6 font-medium text-white">
                Create NFT
              </h1>
              <p className="mt-6 text-md text-gray-300">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            {imagePreview ? (
              <div className="sm:col-span-6 mt-6 flex flex-shrink-0 items-baseline justify-start">
                <div className="rounded-lg w-auto bg-slate-800 px-2 pt-2 pb-3">
                  <div className="rounded-lg overflow-hidden max-h-96 max-w-xs">
                    <img src={imagePreview} alt={"unknown file"} />
                  </div>
                  <div className="bg-slate-800 pt-5 relative">
                    <h3 className="text-gray-200 font-medium">
                      {name || "Asset Name"}
                    </h3>
                    <div className="flex flex-row pb-2">
                      <h2 className="text-gray-400 pr-1 font-light text-xs">
                        by
                      </h2>
                      <h3 className="text-gray-300 font-light text-xs">
                        {collection}
                      </h3>
                    </div>
                    <h3 className="text-gray-300 font-light text-xs w-64">
                      {description ||
                        "Asset description will goes here. You can change it with whatever you want."}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sm:col-span-6 mt-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-lg font-medium text-gray-300"
                >
                  Asset Image
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
                    <div className="flex text-lg text-gray-500">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={onImageChange}
                          accept="image/png, image/gif, image/jpeg"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 20MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-300"
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
                    className="shadow-sm text-white caret-purple-200 bg-slate-800 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-lg border-gray-300 rounded-md"
                    defaultValue={name}
                    onChange={(c) => setName(c.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-gray-300"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm text-white caret-purple-200 bg-slate-800 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-lg border border-gray-300 rounded-md"
                    defaultValue={description}
                    onChange={(c) => setDescription(c.target.value)}
                  />
                </div>
                <p className="mt-2 text-lg text-gray-500">
                  Write a few sentences about the asset.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="supply"
                  className="block text-lg font-medium text-gray-300"
                >
                  Supply
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={supply}
                    onChange={(c) => setSupply(parseInt(c.target.value))}
                    name="first-name"
                    id="supply"
                    autoComplete="supply"
                    className="shadow-sm bg-slate-800 text-white caret-purple-200 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-lg border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="royalty"
                  className="block text-lg font-medium text-gray-300"
                >
                  Royalty
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="1"
                    value={royalty}
                    onChange={(c) => setRoyalty(parseInt(c.target.value))}
                    name="first-name"
                    id="royalty"
                    autoComplete="royalty"
                    className="shadow-sm bg-slate-800 text-white caret-purple-200 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-lg border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 pb-4">
              <label
                htmlFor="collection"
                className="block text-lg font-medium text-gray-300"
              >
                Collection
              </label>
              <div className="top-16">
                <Listbox value={collection} onChange={onCollectionChange}>
                  <div className="mt-1">
                    <Listbox.Button className="flex justify-between w-full cursor-default text-white caret-purple-200 bg-slate-800 pt-2 pb-1 pl-3 text-left shadow-md border border-gray-300 rounded-md">
                      <span className="block truncate">
                        {collection ? collection : "-"}
                      </span>
                      <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg">
                        {collections?.map((collection, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-slate-700 text-gray-200"
                                  : "text-gray-400"
                              }`
                            }
                            value={collection.name}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {collection.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-3xl leading-6 font-medium text-white">
                Notifications
              </h3>
              <p className="mt-3 text-lg text-gray-400">
                We'll always let you know about important changes.
              </p>
              <p className="mt-1 text-lg text-gray-400">
                But you pick what else you want to hear about.
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
                        id="likes"
                        name="likes"
                        type="checkbox"
                        onChange={handleNotifications}
                        className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-lg">
                      <label
                        htmlFor="likes"
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
                        id="comments"
                        name="comments"
                        type="checkbox"
                        onChange={handleNotifications}
                        className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-lg">
                      <label
                        htmlFor="comments"
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
                        id="purchase"
                        name="purchase"
                        type="checkbox"
                        onChange={handleNotifications}
                        className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-lg">
                      <label
                        htmlFor="purchase"
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

        <div className="pb-8 pt-3">
          {txHash && (
            <div className="pb-4 flex justify-center text-center">
              <p className="text-purple-600 pr-2">
                Transaction has been submitted.
              </p>
              <a
                href={`${explorerUrl}/tx/${txHash}`} target="_blank"
                className="cursor-pointer underline text-pink-600"
              >
                check
              </a>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-slate-800 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
            <div
              onClick={() => (isButtonClicked ? null : validateForm())}
              className="py-3 px-4 mx-3 w-44 text-center cursor-pointer rounded-md shadow-lg shadow-gray-500/50 font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-pink-600"
            >
              {buttonLabel}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
