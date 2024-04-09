import { Navbar } from "@/components/nav/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container py-6">{children}</main>
    </>
  );
};
export default MainLayout;
