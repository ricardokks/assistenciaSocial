import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white">
      {/* Tela principal */}
      <div className="h-[90%] w-[55%] flex-col items-center justify-between space-y-10 py-4 ">
        {/* Conteiner da imagem e textos */}
        <div className='flex w-full flex-col items-center justify-center space-y-5'>
          <img alt="" className='-translate-x-1' height={300} src={logoMassapeAzul} width={300} />
          <div className='flex w-2/4 flex-col items-center -space-y-2'>
            <h1 className='text-primary-800 font-outfit-bold text-[30px]'>SEJA BEM-VINDO(A)</h1>
            <h2 className='text-primary-800 font-satoshi-medium text-center text-[20px]'>Preencha os campos a seguir com suas informações</h2>
          </div>
        </div>
        {/* formulário */}
        <form className='flex w-full flex-col items-center justify-center space-y-3'>
          <div className="flex h-[70%] w-full flex-col items-center justify-center">
            {/* Nome */}
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">Nome Completo: </label>
              <div className='relative flex'>
                <svg className='absolute left-1 top-2' fill="none" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#194A99" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#194A99" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                </svg>
                <input
                  className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-[#194A99]"
                  placeholder="Digite seu nome"
                  type="text"
                />
              </div>
            </div>

             {/* CPF */}
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">CPF: </label>
              <div className='relative flex'>
                 <svg className='absolute left-1 top-2' fill="none" height="22" viewBox="0 0 27 28" width="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.375 11.75H23.625M7.875 17.375H9M13.5 17.375H14.625M6.75 21.875H20.25C21.1451 21.875 22.0036 21.5194 22.6365 20.8865C23.2694 20.2536 23.625 19.3951 23.625 18.5V9.5C23.625 8.60489 23.2694 7.74645 22.6365 7.11351C22.0036 6.48058 21.1451 6.125 20.25 6.125H6.75C5.85489 6.125 4.99645 6.48058 4.36351 7.11351C3.73058 7.74645 3.375 8.60489 3.375 9.5V18.5C3.375 19.3951 3.73058 20.2536 4.36351 20.8865C4.99645 21.5194 5.85489 21.875 6.75 21.875Z" stroke="#194A99" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" />
                </svg>
                <input
                  className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-[#194A99]"
                  placeholder="000.000.000"
                  type="text"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="relative h-full w-1/2" style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: "cover", }} />
    </div>
  )
}
