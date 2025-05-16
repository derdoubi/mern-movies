import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" 
import Navigation from "./pages/Auth/Navigation"

const App = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  )
}

export default App
