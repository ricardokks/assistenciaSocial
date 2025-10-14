import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex justify-between items-center bg-white overflow-hidden">
      {/* Tela principal */}
      <div className="w-[55%] h-[90%] flex-col items-center justify-between py-4 space-y-10 ">
        {/* Conteiner da imagem e textos */}
        <div className='w-full flex flex-col space-y-5 items-center justify-center'>
          <img width={300} height={300} className='-translate-x-1' src={logoMassapeAzul} alt="" />
          <div className='flex flex-col w-2/4 items-center -space-y-2'>
            <h1 className='text-[30px] text-primary-800 font-outfit-bold'>SEJA BEM-VINDO(A)</h1>
            <h2 className='text-[20px] text-primary-800 font-satoshi-medium text-center'>Preencha os campos a seguir com suas informações</h2>
          </div>
        </div>
        {/* formulário */}
        <form className='w-full flex flex-col space-y-3 items-center justify-center'>
          <div className="w-full h-[70%] flex items-center justify-center flex-col">
            {/* Nome */}
            <div className="w-3/5 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">Nome Completo: </label>
              <div className='flex relative'>
                <svg className='absolute top-2 left-1' width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#194A99" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#194A99" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input
                  className="outline-none border border-gray-300 text-[#194A99] w-full pl-7 rounded-2xl py-2 placeholder:text-[#194A99] text-[15px] font-outfit font-medium"
                  placeholder="Digite seu nome"
                  type="text"
                />
              </div>
            </div>

             {/* CPF */}
            <div className="w-3/5 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">CPF: </label>
              <div className='flex relative'>
                 <svg className='absolute top-2 left-1' width="22" height="22" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.375 11.75H23.625M7.875 17.375H9M13.5 17.375H14.625M6.75 21.875H20.25C21.1451 21.875 22.0036 21.5194 22.6365 20.8865C23.2694 20.2536 23.625 19.3951 23.625 18.5V9.5C23.625 8.60489 23.2694 7.74645 22.6365 7.11351C22.0036 6.48058 21.1451 6.125 20.25 6.125H6.75C5.85489 6.125 4.99645 6.48058 4.36351 7.11351C3.73058 7.74645 3.375 8.60489 3.375 9.5V18.5C3.375 19.3951 3.73058 20.2536 4.36351 20.8865C4.99645 21.5194 5.85489 21.875 6.75 21.875Z" stroke="#194A99" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input
                  className="outline-none border border-gray-300 text-[#194A99] w-full pl-7 rounded-2xl py-2 placeholder:text-[#194A99] text-[15px] font-outfit font-medium"
                  placeholder="000.000.000"
                  type="text"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: "cover", }} className="w-1/2 h-full relative" />
    </div>
  )
}
