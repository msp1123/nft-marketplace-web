/* eslint-disable jsx-a11y/anchor-is-valid */
import { utils } from "ethers";
import * as React from "react";
import { Fragment } from "react";
import { FaRegUser } from "react-icons/fa";
import TopBanner from "../Banners/TopBanner";
import { BiSearchAlt } from "react-icons/bi";
import IconButton from "../Buttons/IconButton";
import { IoWalletOutline } from "react-icons/io5";
import { injected } from "../../utils/connections";
import { GetSupportedNetworks, GetUser } from "../../services/ApiServices";
import { validateChain } from "../../utils/helpers";
import IconTextButton from "../Buttons/IconTextButton";
import { useCallback, useEffect, useState } from "react";
import { minifyAddress } from "../../utils/helpers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Popover, Transition } from "@headlessui/react";
import NftLogo from "../../assets/Icons/unicorn-icon.webp";
import {
  CursorClickIcon,
  HomeIcon,
  MenuIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CONFIG from "../../configs/globalConfigs";
import { useDispatch } from "react-redux";
import { setSupportedNetworks } from "../../redux/common/actions";
import { setUser } from "../../redux/users/actions";
import { loginWithSignature } from "../../hooks/Web3/signatures";

const Header = () => {
  const dispatch = useDispatch();

  const [balance, setBalance] = useState<any>(0);
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [supportedChain, setSupportedChain] = React.useState("");
  const [unSupportedChain, setUnSupportedChain] = React.useState("");
  const [showWarningBanner, setShowWarningBanner] = React.useState(false);
  const { account, active, error, activate, deactivate, library } =
    useWeb3React();

  let navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.open(CONFIG.metamaskDAappLink);
    } else {
      activate(injected);
    }
    let address = localStorage.getItem(CONFIG.authLoggedInUser);
    setLoggedInUser(address!);
  };

  const login = async () => {
    await loginWithSignature(account!, window);
    let address = localStorage.getItem(CONFIG.authLoggedInUser);
    setLoggedInUser(address!);
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await library!.getBalance(account!);
      let displayValue = utils.formatUnits(
        utils.parseUnits(balance.toString(), "wei"),
        "ether"
      );
      setBalance(Number(displayValue).toFixed(2));
    } catch (e) {
      throw e;
    }
  }, [account, library]);

  const getUser = useCallback(async () => {
    let user = await GetUser(account!);
    if (user) dispatch(setUser(user));
  }, [account, dispatch]);

  const validateNetwork = useCallback(async () => {
    if (error instanceof UnsupportedChainIdError) {
      let validation = validateChain(error);
      if (validation) {
        setSupportedChain(validation.supportedChains.toString());
        setUnSupportedChain(validation.unSupportedChain);
      }
      setShowWarningBanner(true);
    }
  }, [error]);

  const fetchSupportedNetworks = useCallback(async () => {
    let networks = await GetSupportedNetworks();
    if (networks && networks.length > 0) {
      dispatch(setSupportedNetworks(networks));
    }
  }, [dispatch]);

  useEffect(() => {
    if (active) {
      getUser();
      getBalance();
      setShowWarningBanner(false);
    }
    validateNetwork();
    fetchSupportedNetworks();
  }, [active, getUser, getBalance, validateNetwork, fetchSupportedNetworks]);

  const navigations = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: ViewGridIcon,
    },
    {
      name: "Mint",
      href: "/create-nft",
      icon: CursorClickIcon,
    },
  ];

  return (
    <div>
      <TopBanner
        short={"Unsupported chain found."}
        long={
          "You are connected to " +
          unSupportedChain +
          ". Please change your network to " +
          supportedChain
        }
        visible={showWarningBanner}
      />
      <Popover className="relative bg-gray-900">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex content-center cursor-pointer text-center lg:w-0 lg:flex-1"
          >
            <img
              className="inline-block pr-2 w-auto h-12 sm:h-16"
              src={NftLogo}
              alt=""
            />
            <span className="inline-block self-center flex-grow-1 font-black font-cinzel text-4xl text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500">
              Unicorn
            </span>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-slate-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {navigations.map((n) => (
              <div
                key={n.name}
                onClick={() => {
                  if (!active && n.name === "Mint") {
                    return toast.error("Connect wallet to continue.");
                  } else {
                    navigate(n.href);
                  }
                }}
                className="text-base font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
              >
                {n.name}
              </div>
            ))}
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <IconButton icon={<BiSearchAlt size={26} />} onClick={() => {}} />
            <IconTextButton
              label={
                active && loggedInUser === account
                  ? balance + " ETH"
                  : "Sign In"
              }
              icon={<FaRegUser size={20} />}
              showText={active}
              onClick={() => (account ? login() : connectWallet())}
            />
            <IconTextButton
              label={active ? minifyAddress(account ?? "", 5) : "CONNECT"}
              icon={<IoWalletOutline size={24} />}
              showText={true}
              onClick={() => (active ? deactivate() : connectWallet())}
            />
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-800 divide-y-2 divide-gray-500">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-14 w-auto" src={NftLogo} alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-slate-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-7">
                    {navigations.map((n) => (
                      <a
                        key={n.name}
                        href={n.href}
                        className="-m-3 p-3 flex items-center rounded-lg hover:bg-slate-800"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gray-700 text-white">
                          <n.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-white">
                          {n.name}
                        </div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="px-1 py-4">
                <div className="flex grid-cols-2 justify-between">
                  <IconTextButton
                    label={
                      active && loggedInUser === account
                        ? balance + " ETH"
                        : "Sign In"
                    }
                    icon={<FaRegUser size={20} />}
                    showText={true}
                    onClick={() => (account ? login() : connectWallet())}
                  />
                  <IconTextButton
                    label={active ? minifyAddress(account ?? "", 5) : "CONNECT"}
                    icon={<IoWalletOutline size={24} />}
                    showText={true}
                    onClick={() => (active ? deactivate() : connectWallet())}
                  />
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default Header;
