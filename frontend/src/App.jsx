import Sidebar from "./components/Sidebar";
import TopBar from "./components/TobBar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100">
        <div className="md:p-2">
          <TopBar />
        </div>
        <main className="flex-1 p-4 overflow-y-auto ">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
