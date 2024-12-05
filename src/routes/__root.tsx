import React from "react";  // Importerer React for at kunne bruge JSX
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";  // Importerer funktioner fra TanStack React Router
import { TanStackRouterDevtools } from "@tanstack/router-devtools";  // Importerer devtools til TanStack Router for at debugge ruter

// Interface for router context, som bruges til at gemme supabase-klienten
export interface RouterContext extends Record<any, any> {
  supabase: any;  // Definerer supabase som en værdi i routerens context
}

// Opretter en root route, som bruger et layout og en context (RouterContext)
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRouteWithLayout,  // Definerer komponenten til root-ruten
});

// Root route komponent med layout
function RootRouteWithLayout() {
  return (
    <>
      <Outlet />  {/* Outlet bruges til at render underordnede ruter */}
      <TanStackRouterDevtools />  {/* Indlæser devtools til TanStack Router for at debugge og se ruteændringer */}
    </>
  );
}
