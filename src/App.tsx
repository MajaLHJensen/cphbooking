import React, { useState } from "react";
// Mantine Providers
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
// Router imports
import { RouterProvider, createRouter } from "@tanstack/react-router";
// Generated Routetree
import { routeTree } from "./routeTree.gen";
import { getSupabaseClient } from "./supabase/getSupabaseClient";

import './components/ButtonStyles.css';

export const router = createRouter({
  routeTree,
  context: {
    supabase: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [userInfo, setUserInfo] = useState(undefined);

  const context = {
    supabase: getSupabaseClient(),
    userInfo,
    setUserInfo,
  };
console.log("Hej");
  return (
    <MantineProvider>
      <ModalsProvider>
        <RouterProvider 
          router={router} 
          context={context} 
          basepath="/cphbooking" 

        />
      </ModalsProvider>
    </MantineProvider>
  );
}
