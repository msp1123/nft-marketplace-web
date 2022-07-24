/* eslint-disable jsx-a11y/anchor-is-valid */
/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from '@heroicons/react/outline'
import { useState } from 'react'

interface BannerProps {
  short: String,
  long: String,
  visible: boolean
}

const TopBanner = ({ short, long, visible }: BannerProps) => {
  
  const [visiblity, setVisiblity] = useState(true);
  
  return (
    <div>
    {visible && visiblity ? <div className="relative bg-orange-500">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">{short}</span>
            <span className="hidden md:inline">{long}</span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
          <button
            type="button"
            onClick={() => {setVisiblity(false)}}
            className="flex p-2 rounded-md hover: bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div> : null}
    </div>
  )
}
export default TopBanner
