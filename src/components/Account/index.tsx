import { FaRegUser } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { useWeb3React } from "@web3-react/core";
import { minifyAddress } from "../../utils/helpers";
import IconTextButton from "../Buttons/IconTextButton";
import IconButton from "../Buttons/IconButton";
import { useCallback, useEffect, useState } from "react";
import { injected } from "../../utils/connections";
import { utils } from "ethers";
import { IoWalletOutline } from "react-icons/io5";
import { Login } from "../../services/ApiServices";
import { loginWithSignature } from "../../hooks/Web3/signatures";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/users/actions";

const Account = () => {
  const { account, active, activate, deactivate, library } = useWeb3React();
  const [balance, setBalance] = useState<any>(0);
  const dispatch = useDispatch();

  const connectMetamask = () => {
    activate(injected);
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

  useEffect(() => {
    if (!active) return;
    getBalance();
  }, [active, getBalance]);
  
  const signMessage = useCallback(async () => {
    let signedValues = await loginWithSignature(account ?? "", window);
    let user = await Login(signedValues);
    if(user) dispatch(setUser(user));
  }, [account, dispatch])

  return (
    <div style={{ display: "flex" }}>
    <IconButton icon={<BiSearchAlt size={26} />} onClick={() => {}} />
      <IconButton icon={<FaTelegramPlane size={24} />} onClick={() => {}} />
      <IconTextButton
        label={active ? minifyAddress(account ?? "", 5) : ""}
        icon={<FaRegUser size={20} />}
        showText={active}
        onClick={() => (account ? signMessage() : connectMetamask())}
      />
      <IconTextButton
        label={active ? balance + " ETH" : "CONNECT"}
        icon={<IoWalletOutline size={24} />}
        showText={true}
        onClick={() => (active ? deactivate() : connectMetamask())}
      />
    </div>
  );
};

export default Account;
