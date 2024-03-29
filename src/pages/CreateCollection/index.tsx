import { storage } from "../../services/FirebaseServices";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  CreateNewCollection,
  GetNftCategories,
  VerifyCollectionName,
  VerifyCollectionUrl,
} from "../../services/ApiServices";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import moment from "moment";
import CONFIG from "../../configs/globalConfigs";
import { useSelector } from "react-redux";

export default function CreateCollection() {
  const { account } = useWeb3React();
  const commonInfo = useSelector((state: any) => state?.commonInfo);

  // Form variables
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [chain, setChain] = useState<string>("");
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>("");

  // Helper variables
  const [chains, setChains] = useState<string[]>();
  const [buttonLabel, setButtonLabel] = useState("Create");
  const [categories, setCategories] = useState<string[]>();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Temp variables
  const [allChains, setAllChains] = useState<any[]>();
  const [urlValidation, setUrlValidation] = useState("");
  const [nameValidation, setNameValidation] = useState("");
  const [isUrlAvailable, setIsUrlAvailable] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(false);

  const [bannerImageFile, setBannerImageFile] = useState<any>();
  const [profileImageFile, setProfileImageFile] = useState<any>();
  const [bannerImagePreview, setBannerImagePreview] = useState<any>();
  const [profileImagePreview, setProfileImagePreview] = useState<any>();

  const onProfileImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onBannerImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setBannerImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setBannerImagePreview(e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const fetchDefaults = useCallback(async () => {
    let networks = await commonInfo.networks;
    let categories = await GetNftCategories();

    if (networks && networks.length > 0) {
      setChain(networks[0].displayName);
      setAllChains(networks);
      setChains(networks.map((netowork: any) => netowork.displayName));
    }
    if (categories && categories.length > 0) {
      setCategory(categories[0]);
      setCategories(categories.map((category: any) => category));
    }
  }, [commonInfo]);

  const verifyName = async (name: any) => {
    setNameValidation("verifying...");
    setIsNameAvailable(false);
    var response = await VerifyCollectionName(name);
    if (!response) {
      setNameValidation("Something went wrong. Please contact support.");
      return;
    }
    if (response.success) {
      setNameValidation(response.message);
      setIsNameAvailable(true);
      setName(response.name);
    } else {
      setNameValidation(response.message);
    }
  };

  const verifyUrl = async (url: any) => {
    setUrlValidation("verifying...");
    setIsUrlAvailable(false);
    var response = await VerifyCollectionUrl(url);
    if (!response) {
      setUrlValidation("Something went wrong. Please contact support.");
      return;
    }
    if (response.success) {
      setUrlValidation(response.message);
      setIsUrlAvailable(true);
      setUrl(response.url);
    } else {
      setUrlValidation(response.message);
    }
  };

  const uploadProfile = async () => {
    let fileType = profileImageFile.type.split("/")[1];
    let fileName = "CLN-PROFILE-" + moment().utc().valueOf();

    const storageRef = ref(
      storage,
      `${account}/collection/${fileName}.${fileType}`
    );
    const uploadTask = uploadBytesResumable(storageRef, profileImageFile);

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
          if (bannerImageFile) {
            uploadBanner(downloadURL);
          } else {
            createCollection(downloadURL, "");
          }
        });
      }
    );
  };

  const uploadBanner = async (profileUrl: string) => {
    let fileType = bannerImageFile.type.split("/")[1];
    let fileName = "CLN-BANNER-" + moment().utc().valueOf();

    const storageRef = ref(
      storage,
      `${account}/collection/${fileName}.${fileType}`
    );
    const uploadTask = uploadBytesResumable(storageRef, bannerImageFile);

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
          createCollection(profileUrl, downloadURL);
        });
      }
    );
  };

  const createCollection = async (profileUrl: string, bannerUrl: string) => {
    setButtonLabel("Creating");
    let chainT = allChains?.find((c) => c.displayName === chain);
    let input = {
      url: url,
      name: name,
      category: category,
      bannerImage: bannerUrl,
      chainId: chainT.chainId,
      description: description,
      profileImage: profileUrl,
      address: chainT.nftContractAddress,
    };

    let collection = await CreateNewCollection(input);
    if (collection) {
      setButtonLabel("Created");
      window.location.reload();
    } else {
      setButtonLabel("Failed");
      setIsButtonClicked(false);
    }
  };

  const validateForm = () => {
    setButtonLabel("Creating");
    setIsButtonClicked(true);
    let authToken = localStorage.getItem(CONFIG.authTokenStorageKey);
    let loggedInUser = localStorage.getItem(CONFIG.authLoggedInUser);
    if (!authToken || loggedInUser !== account) {
      setButtonLabel("Create");
      setIsButtonClicked(false);
      return toast.error("Session expired. Please login.");
    }
    if (!profileImageFile) {
      setButtonLabel("Create");
      setIsButtonClicked(false);
      return toast.error("No image selected.");
    }
    if (!account) {
      setButtonLabel("Create");
      setIsButtonClicked(false);
      return toast.error("Connect wallet before continue");
    }
    if (!url) {
      setButtonLabel("Create");
      setIsButtonClicked(false);
      return toast.error("Collection url is required.");
    }
    if (!name) {
      setButtonLabel("Create");
      setIsButtonClicked(false);
      return toast.error("Collection name is required.");
    }
    uploadProfile();
  };

  useEffect(() => {
    if (commonInfo) {
      fetchDefaults();
    }
  }, [commonInfo, fetchDefaults]);

  return (
    <div className="flex justify-center bg-slate-900 pt-12 px-4 min-h-full">
      <form className="space-y-8 max-w-xl">
        <div className="space-y-4">
          <div>
            <div>
              <h1 className="text-6xl font-medium text-white">
                Create Collection
              </h1>
              <p className="mt-6 text-lg text-gray-300">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            {profileImagePreview && (
              <div className="sm:col-span-6 mt-6 flex flex-shrink-0 items-baseline justify-start">
                <div className="rounded-lg w-auto bg-slate-800 px-2 pt-2 pb-4">
                  <div className="rounded-lg overflow-hidden max-h-96 max-w-xs">
                    <img src={profileImagePreview} alt={"unknown file"} />
                  </div>
                  <div className="bg-slate-800 pt-3 relative text-center">
                    <h3 className="text-gray-200 font-medium">
                      {name || "Collection Name"}
                    </h3>
                    <h3 className="text-purple-500 font-semibold text-md">
                      {chain ?? chain}
                    </h3>
                    <h3 className="text-gray-300 font-light text-xs px-2 max-w-xs">
                      {description ||
                        "Collection description will goes here. You can change it with whatever you want."}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <div className="sm:col-span-6 mt-6">
              <label
                htmlFor="cover-photo"
                className="block text-lg font-medium text-gray-300"
              >
                Profile Image
              </label>
              <div className="mt-1 flex justify-center max-w-[50%] px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {!profileImagePreview ? (
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
                    <div className="flex text-lg justify-center text-gray-500">
                      <label
                        htmlFor="profile-image-upload"
                        className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="profile-image-upload"
                          name="profile-image-upload"
                          type="file"
                          onChange={onProfileImageChange}
                          accept="image/png, image/gif, image/jpeg"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-md text-gray-500">
                      PNG, JPG, GIF up to 20MB
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden text-center max-h-96 max-w-xs">
                    <img
                      src={profileImagePreview}
                      className="rounded-lg"
                      alt={"unknown file"}
                    />
                    <label
                      htmlFor="profile-image-upload"
                      className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                    >
                      <span>change</span>
                      <input
                        id="profile-image-upload"
                        name="profile-image-upload"
                        type="file"
                        onChange={onProfileImageChange}
                        accept="image/png, image/gif, image/jpeg"
                        className="sr-only"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-6 mt-6">
              <label
                htmlFor="cover-photo"
                className="block text-lg font-medium text-gray-300"
              >
                Banner Image
              </label>
              <div className="mt-1 flex justify-center max-h-[250px] px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {!bannerImagePreview ? (
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
                    <div className="flex justify-center text-lg text-gray-500">
                      <label
                        htmlFor="banner-image-upload"
                        className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="banner-image-upload"
                          name="banner-image-upload"
                          type="file"
                          onChange={onBannerImageChange}
                          accept="image/png, image/jpeg"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-md text-gray-500">PNG, JPG max 600KB</p>
                  </div>
                ) : (
                  <div className="relative max-h-80 w-full">
                    <div className="inset-0 z-0 rounded-lg overflow-hidden max-h-52 max-w-lg">
                      <img
                        src={bannerImagePreview}
                        className="object-cover h-40 w-full"
                        alt={"unknown file"}
                      />
                    </div>
                    <div className="absolute flex h-[100%] justify-evenly mb-2 items-end inset-0 z-10">
                      <div
                        onClick={() => setBannerImagePreview(null)}
                        className="cursor-pointer rounded-md font-medium text-white hover:text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        Remove
                      </div>
                      <label
                        htmlFor="banner-image-upload"
                        className="cursor-pointer rounded-md font-medium text-white hover:text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Change</span>
                        <input
                          id="banner-image-upload"
                          name="banner-image-upload"
                          type="file"
                          onChange={onBannerImageChange}
                          accept="image/png, image/jpeg"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
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
                    maxLength={30}
                    placeholder="Collection name"
                    autoComplete="given-name"
                    className="shadow-sm text-white caret-purple-200 bg-slate-800 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-lg border-gray-300 rounded-md"
                    defaultValue={name}
                    onChange={(c) => {
                      verifyName(c.target.value);
                    }}
                  />
                </div>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    nameValidation === "verifying..."
                      ? "text-gray-400"
                      : isNameAvailable
                      ? "text-purple-500"
                      : "text-red-500"
                  }`}
                >
                  {nameValidation}
                </p>
                <p className="mt-2 text-lg text-gray-500">
                  This name will be shown publicly.
                </p>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="url"
                  className="block text-lg font-medium text-gray-300"
                >
                  Url
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    maxLength={30}
                    placeholder="Collection url"
                    autoComplete="given-url"
                    className="shadow-sm text-white caret-purple-200 bg-slate-800 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-lg border-gray-300 rounded-md"
                    defaultValue={url}
                    onChange={(c) => {
                      verifyUrl(c.target.value);
                    }}
                  />
                </div>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    urlValidation === "verifying..."
                      ? "text-gray-400"
                      : isUrlAvailable
                      ? "text-purple-500"
                      : "text-red-500"
                  }`}
                >
                  {urlValidation}
                </p>
                <p className="mt-2 text-lg text-gray-500">
                  Note: Must only contain letters a-z, numbers, and hyphens.
                </p>
                <p className="mt-2 text-lg text-gray-500">
                  This will be used as collection url, make sure you have
                  entered the correct name.
                </p>
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
                  Write a few sentences about this collection.
                </p>
              </div>
            </div>
            <div className="pt-6 pb-4">
              <label
                htmlFor="chain"
                className="block text-lg font-medium text-gray-300"
              >
                Blockchain
              </label>
              <div className="top-16">
                <Listbox value={chain} onChange={setChain}>
                  <div className="mt-1">
                    <Listbox.Button className="flex justify-between w-full cursor-default text-white caret-purple-200 bg-slate-800 pt-2 pb-1 pl-3 text-left shadow-md border border-gray-300 rounded-md">
                      <span className="block truncate">
                        {chain ? chain : "-"}
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
                        {chains?.map((chain, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-slate-700 text-gray-200"
                                  : "text-gray-400"
                              }`
                            }
                            value={chain}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {chain}
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
              <p className="mt-2 text-lg text-gray-500">
                Select the blockchain where you'd like new items from this
                collection to be added by default.
              </p>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-300"
              >
                Category
              </label>
              <div className="top-16">
                <Listbox value={category} onChange={setCategory}>
                  <div className="mt-1">
                    <Listbox.Button className="flex justify-between w-full cursor-default text-white caret-purple-200 bg-slate-800 pt-2 pb-1 pl-3 text-left shadow-md border border-gray-300 rounded-md">
                      <span className="block truncate">{category ?? "-"}</span>
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
                        {categories?.map((category, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-slate-700 text-gray-200"
                                  : "text-gray-400"
                              }`
                            }
                            value={category}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {category}
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
        </div>

        <div className="py-4">
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
