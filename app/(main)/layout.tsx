import { NavCards } from "@/components/nav/nav-cards";
import { Navbar } from "@/components/nav/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container max-w-[1180px] py-6 xl:grid xl:grid-cols-[255px,auto] xl:gap-8">
        <NavCards />
        {children}
      </main>
    </>
  );
};
export default MainLayout;
