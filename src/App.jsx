import Tabs from "./components/Tabs/Tabs";
import Gallery from "./components/Gallery/Gallery";

export default function App() {
  return (
    <div className="min-h-screen flex bg-background text-white p-6 lg:p-12">
      {/* Left section (empty for now, responsive) */}
      <div className="flex-1 hidden lg:block"></div>

      {/* Right section (widgets) */}
      <div className="flex flex-col gap-6 w-full lg:w-[60%]">
        <Tabs />
        <Gallery />
      </div>
    </div>
  );
}
