import Game from "./components/Game"
function App() {

  return (
    <div className='flex justify-center items-start p-6 bg-slate-100 h-screen'>
      <div>
        <h1 className='text-3xl font-bold mb-5 text-center'>Tic Tac Toe</h1>
        <Game />
      </div>
    </div>
  )
}

export default App
