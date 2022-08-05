import type { Mini, Updates } from "@snapchat/minis-sdk";
import React from "react";

import { ChatUpdates } from "./ChatUpdates";
import { HappeningNowUpdates } from "./HappeningNowUpdates";

export const UpdatesSample = ({
  updates,
  mini,
}: {
  updates: Updates;
  mini: Mini;
}) => {
  return (
    <div>
      <ChatUpdates updates={updates} />
      <HappeningNowUpdates mini={mini} updates={updates} />
    </div>
  );
};
