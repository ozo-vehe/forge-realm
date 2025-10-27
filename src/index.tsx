import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router/routes"
import { RouterProvider } from "react-router-dom";
import { PushChainProviders } from "./providers/PushChainProviders";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PushChainProviders>
      <RouterProvider router={router} />
    </PushChainProviders>
  </StrictMode>,
);
