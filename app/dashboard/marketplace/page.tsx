import React, { Suspense } from "react";
import MarketplaceLayout from "@/components/layout/marketplaceLayout/Marketplace";

const MarketplacePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketplaceLayout />
    </Suspense>
  );
};

export default MarketplacePage;
