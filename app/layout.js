
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Synergy",
};


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex justify-between p-4 bg-white">
        <div>
          <Image src="/logo.svg" alt="Synergy Logo" width={144} height={42} />
        </div>

        <nav className="flex items-center">
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>

          </ul>
        </nav>

      </header>
      <main className="bg-[#F1F0F3] flex-1">
        {children}
      </main>
      <footer className="p-4 bg-white grid place-content-center ">
        <p> &copy; 2024 Synergy</p>
      </footer>
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
