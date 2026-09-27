import "./globals.css";
import { PlanProvider } from "./component/planContext";
import Navbar from "./component/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./component/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />

          {children}
          <Toaster position="top-right" />
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}