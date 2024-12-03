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
  // const [isLoading, setIsLoading] = useState(true); // Tilstand for loading

  // useEffect(() => {
  //   // Simulerer en loading-periode på 2 sekunder
  //   const timer = setTimeout(() => setIsLoading(false), 2000);
  //   return () => clearTimeout(timer); // Rydder op efter timeout
  // }, []);

  const context = {
    supabase: getSupabaseClient(),
    userInfo,
    setUserInfo,
  };

  return (
    <div>
      {/* {isLoading ? ( // Hvis loading er sand, vis Loader
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Loader color="blue" />
        </div>
      ) : ( // Når loading er færdig, vis applikationen */}
        <MantineProvider>
          <ModalsProvider>
            <RouterProvider 
              router={router} 
              context={context} 
              basepath="/cphbooking" 
            />
          </ModalsProvider>
        </MantineProvider>
      {/* )} */}
    </div>
  );
}