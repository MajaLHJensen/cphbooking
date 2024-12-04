import React, { useState, useEffect } from "react";
import { MantineProvider, Loader, } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider, createRouter } from "@tanstack/react-router";
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
    setUserInfo
  };

  return (
    <div>
        <MantineProvider>
          <ModalsProvider>
            <RouterProvider 
              router={router} 
              context={context} 
              basepath="/cphbooking" 
            />
          </ModalsProvider>
        </MantineProvider>
    </div>
  );
}