import * as React from "react";
import Account from "../Account";
import classes from "./Header.module.sass";
import { isMobile } from "react-device-detect";
import { validateChain } from "../../utils/helpers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import IconButton from "../Buttons/IconButton";
import { FaRegUser } from "react-icons/fa";

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
        </div>
      ) : null}
      <div className={classes.main}>
        <h4>Unicorn</h4>
        {isMobile ? (
          <IconButton icon={<FaRegUser size={20}/>} onClick={() => {}} />
        ) : (
          <Account />
        )}
      </div>
    </div>
  );
};

export default Header;
