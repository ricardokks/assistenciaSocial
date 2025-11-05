import { useParams } from 'react-router-dom'

export function Config() {
  const { id } = useParams()

  return (
    <main className="flex h-screen w-screen flex-col items-center ">
      <div className="bg-primary-800  mt-0 flex h-24 w-full items-center space-x-4 pl-5">
        <svg
          fill="none"
          height="22"
          viewBox="0 0 19 34"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 32L2 17L17 2"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
          />
        </svg>
        <h1 className="font-satoshi text-xl font-bold text-white">Configurações Gerais</h1>
      </div>
      <h1>oi</h1>
    </main>
  )
}
