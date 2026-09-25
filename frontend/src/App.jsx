
import './App.css'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <>
      <div className="min-h-screen bg-mechanic-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-mechanic-navy">
            Welcome to MechanicDost
          </h1>
          <p className="mt-3 text-mechanic-muted">Find a mechanic near you.</p>
          <button className="mt-6 rounded-lg bg-mechanic-primary px-6 py-3 font-semibold text-white hover:bg-mechanic-primary-dark">
            Request Mechanic
          </button>
        </main>
      </div>
    </>
  )
}

export default App
