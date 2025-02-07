"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { HiShoppingCart } from "react-icons/hi";


interface Product {
  name: string;
  price: number;
}

interface Header1Props {
  cart: { product: Product; quantity: number }[];
}

const Logo: React.FC = () => (
  <Image src="/image/comforty.png" alt="Comforty Logo" className="w-32 h-auto" width={128} height={128} />
);

const Navigation: React.FC<{ links: { href: string; label: string }[] }> = ({ links }) => (
  <nav className="flex space-x-6">
    {links.map((link) => (
      <Link key={link.href} href={link.href} className="text-gray-700 hover:underline">
        {link.label}
      </Link>
    ))}
  </nav>
);

const CartIcon: React.FC<{ totalQuantity: number }> = ({ totalQuantity }) => (
  <Link href="/cartmenu" className="relative flex items-center">
    <ShoppingCart className="w-6 h-6 text-gray-800 hover:text-orange-500 cursor-pointer" />
    {totalQuantity > 0 && (
      <span className="absolute top-[-8px] left-4 bg-red-500 text-white text-xs rounded-full px-2 py-1">
        {totalQuantity}
      </span>
    )}
  </Link>
);

const AuthButtons: React.FC = () => (
  <div className="flex items-center space-x-4">
    <SignedOut>
      <SignInButton>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
          Sign In
        </button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
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
);

export const Header1: React.FC<Header1Props> = ({ cart }) => {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white text-gray-800 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Cart Icon on the Left */}
        <CartIcon totalQuantity={totalQuantity} />

        <Logo />
        <Navigation
          links={[
            { href: "/", label: "Home" },
            { href: "/wishlist", label: "Wishlist" },
          ]}
        />
        <AuthButtons />
      </div>
    </header>
  );
};


export const Header2: React.FC = () => {
  const totalQuantity = 0; // Define totalQuantity here

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-8 py-4 border-b border-gray-200">
      <Logo />
      <Navigation
        links={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { href: "/contact", label: "Contact" },
          { href: "/about", label: "About" },
        ]}
      />
      {/* Cart Icon on the Left */}
      <div className="flex items-center">
        <Link href="/cartmenu" className="relative flex items-center">
          <HiShoppingCart className="w-6 h-6 text-gray-800 hover:text-orange-500 cursor-pointer" />
          {totalQuantity > 0 && (
            <span className="absolute top-[-8px] left-4 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
      <div className="mt-4 sm:mt-0 text-center sm:text-right">
        <span className="text-gray-500">Contact:</span>{" "}
        <a href="tel:8085550111" className="text-gray-800 font-semibold">
          (808) 555-0111
        </a>
      </div>
    </header>
  );
};

export const Header: React.FC = () => (
  <div className="bg-[#000000] text-white text-sm">
    <div className="container mx-auto flex items-center justify-between px-6 py-2 flex-col sm:flex-row">
      <div className="mb-2 sm:mb-0">
        <p>📢 Free shipping on all orders over $50!</p>
      </div>
      <Navigation
        links={[
          { href: "/faq", label: "Eng" },
          { href: "/FAQ", label: "FAQs" },
          { href: "/contact", label: "Need help" },
        ]}
      />
    </div>
  </div>
);
