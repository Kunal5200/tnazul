import MessagesLayout from "@/components/layout/messagesLayout/Messages";
import React, { Suspense } from "react";

const MessagesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesLayout />
    </Suspense>
  );
};

export default MessagesPage;
