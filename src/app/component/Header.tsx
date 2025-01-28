import * as React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";


interface Header1Props {
  cart: { product: Product; quantity: number }[]; // Cart structure
}



const Header: React.FC = () => {
  return (
    <div className="bg-[#000000] text-white text-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-2 flex-col sm:flex-row">
       
        <div className="mb-2 sm:mb-0">
          <p>📢 Free shipping on all orders over $50!</p>
        </div>

        
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
          <Link href="/faq">
            <span className="hover:underline cursor-pointer">Eng</span>
          </Link>
          <Link href="/FAQ">
            <span className="hover:underline cursor-pointer">FAQs</span>
          </Link>
          <Link href="/contact">
            <span className="hover:underline cursor-pointer">Need help</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
interface Header1Props {
  cart: { product: Product; quantity: number }[]; // Cart structure
}

export const Header1: React.FC<Header1Props> = ({ cart }) => {
  // Calculate total quantity in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white text-gray-800 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/Image/comforty.png"
            alt="Comforty Logo"
            className="w-32 h-auto"
            width={128}
            height={128}
          />
        </div>

        {/* Navigation */}
        <nav className="space-x-4 sm:space-x-6">
          <Link href="/" className="hover:underline text-gray-800">
            Home
          </Link>
          <Link href="/cartmenu" className="hover:underline text-gray-800 relative">
            <span className="text-gray-800 hover:text-orange-500 cursor-pointer">
              🛒 Cart
            </span>
            {/* Cart Item Count Badge */}
            {totalQuantity > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            {/* If the user is not signed in, show the Sign In button */}
            <SignInButton>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* If the user is signed in, show the User Button and Sign Out button */}
            <div className="flex items-center space-x-4">
              <UserButton />
              <SignOutButton>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};



export const Header2: React.FC = () => {
 
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-8 py-4 border-b border-gray-200">
     
      <nav className="flex flex-col sm:flex-row items-center sm:ml-[150px] space-y-4 sm:space-y-0 sm:space-x-6">
        <Link href="/" className="text-teal-500 hover:underline">
          Home
        </Link>
        <Link href="/shop" className="text-gray-700 hover:underline">
          Shop
        </Link>
        <Link href="/Products" className="text-gray-700 hover:underline">
          Products
        </Link>
        <Link href="/contact" className="text-gray-700 hover:underline">
          Contact
        </Link>
        <Link href="/about" className="text-gray-700 hover:underline">
          About
        </Link>
      </nav>

      
      <div className="mt-4 sm:mt-0 text-center sm:text-right">
        <span className="text-gray-500">Contact:</span>{' '}
        <a href="tel:8085550111" className="text-gray-800 font-semibold">
          (808) 555-0111
        </a>
      </div>
    </header>
  );
};
