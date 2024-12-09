import React, { useState, useEffect } from "react";
import { MantineProvider, Loader, } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getSupabaseClient } from "./supabase/getSupabaseClient";
import './components/ButtonStyles.css';

const hashHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  context: {
    supabase: undefined!,
    userInfo: undefined!,
    setUserInfo: undefined!
  },
  history: hashHistory
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log("fra App.tsx", userInfo)
  }, [userInfo])

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
              context={{
                userInfo,
                supabase: getSupabaseClient(),
                setUserInfo
              }} 
              basepath="/cphbooking" 
            />
          </ModalsProvider>
        </MantineProvider>
    </div>
  );
}