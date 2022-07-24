/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";

interface ToasterProps {
  visible: boolean,
  image?: string;
  from?: String;
  message: String;
  action: any;
  buttonText?: String;
}

export default function ActionToaster(props: ToasterProps) {
  const [show, setShow] = useState(true);
  
  setTimeout(() => {
    setShow(false)
  }, 5000);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show && props.visible}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
              <div className="w-0 flex-1 p-4">
                <div className="flex items-start">
                  {props.image && <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={props.image}
                      alt=""
                    />
                  </div>}
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {props.from ? props.from : "Unicorn Bot"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden text-ellipsis">
                      {props.message}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-purple-800" onClick={() => setShow(false)}>
                <button
                  type="button"
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => props.action}
                >
                  {props.buttonText ? props.buttonText : "OK"}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
