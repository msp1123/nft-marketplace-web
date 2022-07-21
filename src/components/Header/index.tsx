/* eslint-disable jsx-a11y/anchor-is-valid */
import { utils } from "ethers";
import * as React from "react";
import { Fragment } from 'react'
import { FaRegUser } from "react-icons/fa";
import TopBanner from "../Banners/TopBanner";
import { BiSearchAlt } from "react-icons/bi";
import IconButton from "../Buttons/IconButton";
import { IoWalletOutline } from "react-icons/io5";
import { injected } from "../../utils/connections";
import { Login } from "../../services/ApiServices";
import { validateChain } from "../../utils/helpers";
import IconTextButton from "../Buttons/IconTextButton";
import { useCallback, useEffect, useState } from "react";
import { getSignature, minifyAddress } from "../../utils/helpers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Popover, Transition } from '@headlessui/react'
import nftLogo from "../../assets/Icons/nft.png"
import {
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'


const Header = () => {
  const [balance, setBalance] = useState<any>(0);
  const [supportedChain, setSupportedChain] = React.useState("");
  const [unSupportedChain, setUnSupportedChain] = React.useState("");
  const [showWarningBanner, setShowWarningBanner] = React.useState(false);
  const { account, active, error, activate, deactivate, library } = useWeb3React();

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


  const signMessage = useCallback(async () => {
    let signedValues = await getSignature(account ?? "", window);
    let res = await Login(signedValues);
    console.log(res);
  }, [account])

  const validateNetwork = React.useCallback(async () => {
    if (error instanceof UnsupportedChainIdError) {
      let validation = validateChain(error);
      if (validation) {
        setSupportedChain(validation.supportedChains.toString());
        setUnSupportedChain(validation.unSupportedChain);
      }
      setShowWarningBanner(true);
    }
  }, [error]);

  useEffect(() => {
    if (active) {
      getBalance();
      setShowWarningBanner(false);
    };
    validateNetwork();
  }, [active, getBalance, validateNetwork]);

  const navigations = [
    {
      name: 'Explore',
      description: 'Explore all the the Hot NFTs.',
      href: '#',
      icon: CursorClickIcon,
    },
    {
      name: 'Ranking',
      description: 'Statistics of all active NFTs.',
      href: '#',
      icon: ChartBarIcon,
    },
    {
      name: 'Marketplace',
      description: "Explore the Market Buy your first NFT.",
      href: '#',
      icon: ViewGridIcon,
    }
  ]
  const resources = [
    {
      name: 'Help Center',
      description: 'Get all of your questions answered in our forums or contact support.',
      href: '#',
    },
    { name: 'Guides', description: 'Learn how to maximize our platform to get the most out of it.', href: '#' },
    { name: 'Events', description: 'See what meet-ups and other events we might be planning near you.', href: '#' },
    { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#' },
  ]

  return (
    <div>
      <TopBanner
        short={"Unsupported chain found."}
        long={"You are connected to " + unSupportedChain + ". Please change your network to " + supportedChain}
        visible={showWarningBanner}
      />
      <Popover className="relative bg-slate-900">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Unicorn</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={nftLogo}
                alt=""
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-slate-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-700">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">

            {navigations.map((n) => (
              <a href={n.href} className="text-base font-medium text-gray-400 hover:text-gray-200">
                {n.name}
              </a>
            ))}

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button>
                    <span className="text-base font-medium text-gray-400 hover:text-gray-200">More</span>
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-slate-900 px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((resource) => (
                            <a
                              key={resource.name}
                              href={resource.href}
                              className="-m-3 p-3 block rounded-md hover:bg-slate-800"
                            >
                              <p className="text-base font-medium text-gray-300">{resource.name}</p>
                              <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <IconButton icon={<BiSearchAlt size={26} />} onClick={() => { }} />
            <IconTextButton
              label={active ? minifyAddress(account ?? "", 5) : ""}
              icon={<FaRegUser size={20} />}
              showText={active}
              onClick={() => (account ? signMessage() : activate(injected))}
            />
            <IconTextButton
              label={active ? balance + " ETH" : "CONNECT"}
              icon={<IoWalletOutline size={24} />}
              showText={true}
              onClick={() => (active ? deactivate() : activate(injected))}
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
          <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-900 divide-y-2 divide-gray-500">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src={nftLogo}
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-slate-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-700">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-7">
                    {navigations.map((solution) => (
                      <a
                        key={solution.name}
                        href={solution.href}
                        className="-m-3 p-3 flex items-center rounded-lg hover:bg-slate-800"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gray-800 text-white">
                          <solution.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-white">{solution.name}</div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-5 px-5">
                <div className="grid grid-cols-2 gap-10">
                  <IconTextButton
                    label={active ? minifyAddress(account ?? "", 5) : ""}
                    icon={<FaRegUser size={20} />}
                    showText={active}
                    onClick={() => (account ? signMessage() : activate(injected))}
                  />
                  <IconTextButton
                    label={active ? balance + " ETH" : "CONNECT"}
                    icon={<IoWalletOutline size={24} />}
                    showText={true}
                    onClick={() => (active ? deactivate() : activate(injected))}
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
