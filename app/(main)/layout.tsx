import { NavCards } from "@/components/nav/nav-cards";
import { Navbar } from "@/components/nav/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container py-6 xl:grid xl:grid-cols-[255px,1fr] xl:gap-8">
        <NavCards />
        {children}
      </main>
    </>
  );
};
export default MainLayout;
