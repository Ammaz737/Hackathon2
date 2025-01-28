import Hero from "./component/Hero";
import { Hero2 } from "./component/Hero";
import { Hero3 } from "./component/Hero";
import { Hero4 } from "./component/Hero";
import React from "react";
import ProductCards from "./component/ProductListing";

function page() {
  return (
    <div className="container mx-auto px-4 sm:px-2 lg:px-8">

      <div className="space-y-4">
      </div>

     
      <div className="space-y-8">
    <Hero/>
    <Hero2/>
    <Hero3/>
    <Hero4/>
     <ProductCards/> 
      </div>
    </div>
  );
}

export default page;
