import Footer from "@/components/ui/Footer";
import LeftSidebar from "@/components/ui/LeftSidebar";
import MobileNav from "@/components/ui/MobileNav";
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen">
      <div className="hidden md:flex">
        <LeftSidebar />
      </div>
      <main className="flex flex-1 flex-col md:ml-[270px] bg-blue-1">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <section className="flex flex-1 flex-col">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
              <div className="flex h-16 items-center justify-between md:hidden">
                <Image 
                  src="\logos\nameLogo.svg"
                  width={100}
                  height={100}
                  alt="menu icon"
                />
                <MobileNav />
              </div>
              <div className="flex flex-col flex-1 px-4 sm:px-14">
                {children}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
