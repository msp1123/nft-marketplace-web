import * as React from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Account from "../Account";
import classes from "./Header.module.sass";
import { validateChain } from "../../utils/helpers";
import HeaderButton from "../Buttons/HeaderButton";

const Header = () => {
  const { active, error } = useWeb3React();
  const [showWarningBanner, setShowWarningBanner] = React.useState(false);
  const [supportedChain, setSupportedChain] = React.useState("");
  const [unSupportedChain, setUnSupportedChain] = React.useState("");

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

  React.useEffect(() => {
    if (active) {
      setShowWarningBanner(false);
    }
    validateNetwork();
  }, [active, error, validateNetwork]);

  return (
    <div>
      {showWarningBanner ? (
        <div className={classes.topBanner}>
          {`You are connected to ${unSupportedChain}. Please change your network to ${supportedChain}`}
          .
        </div>
      ) : null}
      <div className={classes.headerMain}>
        <div className={classes.title}>
          <span>NFT MARKET</span>
        </div>
        <div className={classes.actions}>
          <div className={classes.navMain}>
            <HeaderButton label="Home" />
            <HeaderButton label="Explore" />
            <HeaderButton label="Ranking" />
            <HeaderButton label="Create" />
          </div>
          <Account />
        </div>
      </div>
    </div>
  );
};

export default Header;
