import PolygonIcon from "../../assets/Icons/polygon.png"
import EthereumIcon from "../../assets/Icons/ethereum.png"
import { TokenModel } from "../../models/token";

interface TokenProps {
    token: TokenModel
}

export default function TokenCard({token}: TokenProps) {
    
  return (
      <div key={token.tokenId} className="rounded-lg bg-slate-800 p-2">
        <div className="rounded-lg overflow-hidden">
          <img
            className="scale-100 hover:scale-110 ease-in duration-300"
            src={token.image}
            alt={token.name}
          />
        </div>
        <div className="bg-slate-800 px-2 pt-2 relative">
          <h3 className="text-gray-200 font-medium">
            <dt className="sr-only">Title</dt>
            {token.name}
          </h3>
          <div className="flex flex-row pb-2">
            <h2 className="text-gray-400 pr-1 font-light text-xs">by</h2>
            <h3 className="text-gray-300 font-light text-xs">{token.collectionName}</h3>
          </div>
          <div className="flex flex-row">
            <img
              className="h-5 pr-2"
              src={token.chainId === 4 || 1 ? EthereumIcon : PolygonIcon}
              alt={token.name}
            />
            <span className="text-white text-base font-medium rounded-md">
              {token.likes}
            </span>
          </div>
        </div>
      </div>
  );
}
