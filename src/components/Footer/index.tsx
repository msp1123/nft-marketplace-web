/* This example requires Tailwind CSS v2.0+ */

import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "API Docs", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Help", href: "#" },
  ],
  social: [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/praveen1123",
      icon: FaLinkedin
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/msp_1123_/",
      icon: FaInstagram
    },
    {
      name: "Twitter",
      link: "https://twitter.com/msp_1123_",
      icon: FaTwitter
    },
    {
      name: "GitHub",
      link: "https://github.com/Praveen-1123",
      icon: FaGithub
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-gray-300 hover:text-gray-200"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6 cursor-pointer">
          {navigation.social.map((social) => (
            <div
              key={social.name}
              onClick={()=> window.open(social.link, "_blank")}
              className="text-gray-300 hover:text-gray-200"
            >
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2022 Unicorn Market, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
