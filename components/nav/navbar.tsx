import { Sidebar } from "./sidebar";

export const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between bg-gradient-to-tr from-sky-500 to-pink-500 px-6 py-4 text-white">
        <div>
          <h1 className="text-[15px] font-bold">Frontend Mentor</h1>
          <p className="text-[13px] text-opacity-75">Feedback Board</p>
        </div>
        <Sidebar />
      </nav>
    </header>
  );
};
