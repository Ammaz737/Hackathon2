import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2">
            <Image
              src="/Image/comforty.png"
              alt="Comforty Logo"
              width={80} // Specify width
              height={40} // Specify height
              className="w-20 h-auto"
            />
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas purus.
          </p>
          <div className="flex space-x-4 mt-4">
            {["facebook", "twitter", "instagram", "pinterest", "youtube"].map((icon) => (
              <a key={icon} href="#" className="text-gray-600 hover:text-gray-800">
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Category</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {["Sofa", "Armchair", "Wing Chair", "Desk Chair", "Wooden Chair", "Park Bench"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Support</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {["Help & Support", "Terms & Conditions", "Privacy Policy", "Help"].map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Newsletter</h3>
          <p className="text-gray-600 mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.
          </p>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 pt-4">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2024 Comforty. Designed & Developed by Muhammad Ammaz.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Image
              src="/paypal.png"
              alt="PayPal"
              width={40} // Specify width
              height={40} // Specify height
              className="h-6"
            />
            <Image
              src="/image/download.png"
              alt="Visa"
              width={40} // Specify width
              height={40} // Specify height
              className="h-6"
            />
            <Image
              src="/image/Mastercard_2019_logo.svg.png"
              alt="MasterCard"
              width={40} // Specify width
              height={40} // Specify height
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
