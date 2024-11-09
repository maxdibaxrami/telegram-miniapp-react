import React from "react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full border-small backgroundowhite px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
