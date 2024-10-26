"use client";

import { createContext, useState } from "react";
import { Nav } from "./nav";

type UserContextValue = {
  user: null | { name: string };
  setUser: (user: null | { name: string }) => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | { name: string }>({
    name: "Cory",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Nav />
      <main className="p-4">{children}</main>
    </UserContext.Provider>
  );
}
