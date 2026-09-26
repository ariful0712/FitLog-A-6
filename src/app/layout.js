import "./globals.css";
import { PlanProvider } from "./component/planContext";
import Navbar from "./component/navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />

          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#181818",
                color: "#ffffff",
                border: "1px solid #ccff00",
              },
            }}
          />

        </PlanProvider>
      </body>
    </html>
  );
}