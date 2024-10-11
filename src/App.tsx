import Game from "./components/Game"
function App() {

  return (
    <div className='flex justify-center items-start p-6 bg-slate-900 h-screen text-white'>
      <div>
        <h1 className='text-3xl font-bold mb-5 text-center'>Morpion</h1>
        <Game />
      </div>
    </div>
  )
}

export default App
