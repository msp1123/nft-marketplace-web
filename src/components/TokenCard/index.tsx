import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { RiBookmarkFill, RiBookmarkLine, RiCheckboxMultipleBlankLine, RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import UnicornLoader from "../../assets/lottie/unicorn-rainbow-loader.json";
import { TokenModel } from "../../models/token";

interface TokenProps {
  token: TokenModel;
}

export default function TokenCard({ token }: TokenProps, key: number) {
  const commonInfo = useSelector((state: any) => state?.commonInfo);
  const [supportedNetworks] = useState<any[]>(commonInfo.networks);

  const [imgLoading, setImgLoading] = useState(true);
  const [isNew, setIsNew] = useState(false);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: UnicornLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const checkNewItem = () => {
    let requiredTime = new Date();
    let tokenTime = token.createdAt;
    requiredTime.setDate(requiredTime.getDate() * 7)
    if(tokenTime < requiredTime){
      setIsNew(true)
    }
  }
  
  useEffect(() => {
    checkNewItem()
  })

  return (
    <div
      key={key}
      className="scale-100 hover:scale-105 ease-in-out block justify-end duration-100 hover:border-4 border-purple-600/75 min-w-[300px] min-h-[300px] max-w-[350px] rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 p-2 m-1"
    >
      <div className="relative w-full rounded-lg overflow-hidden">
        <img
          className="inset-0 bg-cover bg-center z-0 ease-in duration-300"
          src={token.image}
          alt={token.name}
          onLoad={() => setImgLoading(false)}
        />
        {imgLoading && (
          <Lottie options={lottieOptions} height={350} width={350} />
        )}
        <div>
          <div className="flex h-fit justify-between m-1 absolute inset-0 z-10">
            {isNew ? (
              <div className="w-fit rounded-lg px-2 py-1 text-center items-center bg-gray-900">
                <h3 className="text-gray-100 pl-1 text-base">{token.createdAt.toString()}</h3>
              </div>
            ) : <div></div>}
            {token.amount > 1 && (
              <div className="flex w-fit rounded-lg px-2 py-1 text-center items-center bg-gray-700">
                <RiCheckboxMultipleBlankLine color="white" />
                <h3 className="text-gray-100 pl-1 text-base">{token.amount}</h3>
              </div>
            )}
          </div>
          <div className="flex justify-center mb-2 items-end opacity-0 w-[100%] hover:opacity-100 duration-300 absolute inset-0 z-10">
            <div className="w-fit h-fit rounded-md px-2 py-2 items-center bg-slate-700">
              { token.isLiked ? <RiHeart3Fill size={23} color="white" /> : <RiHeart3Line size={23} color="white" />}
            </div>
            <button
              type="submit"
              className="block h-fit justify-center px-12 py-2 mx-2 rounded-md font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-pink-600"
            >
              {token.tokenPrice ? "Buy Now" : "View NFT"}
            </button>
            <div className="w-fit h-fit rounded-md px-2 py-2 items-center bg-slate-700">
              { token.isSaved ? <RiBookmarkFill size={23} color="white" /> : <RiBookmarkLine size={23} color="white" />}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 py-2">
        <div className={token.tokenPrice ? "w-3/4" : "w-full"}>
          <h2 className="text-gray-200 line-clamp-1 font-semibold text-lg">
            {token.name}
          </h2>
          <div className="flex flex-row">
            <h3 className="text-gray-400 pr-1 font-light text-xs">by</h3>
            <h2 className="text-gray-200 line-clamp-1 font-medium text-xs hover:underline">
              {token.collectionName}
            </h2>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center">
            <h2 className="text-purple-500 pr-1 font-semibold text-lg">
              {token.tokenPrice}
            </h2>
            {token.tokenPrice && (
              <h3 className="text-gray-300 font-medium text-sm">
                {supportedNetworks.find((n) => n.chainId === token.chainId)
                  ?.currency ?? "-"}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
