import { X, Camera, Trash2 } from 'lucide-react'
import { Modal } from '../../ui/modal'
import { toast } from 'sonner'

type ModalSelecionarFotoProps = {
  openModalFoto: boolean
  fotoPreview: string | null
  setFotoPreview: React.Dispatch<React.SetStateAction<string | null>>
  setFotoFile: React.Dispatch<React.SetStateAction<File | null>>
  close: () => void
  onSalvar: () => void
}

export function ModalSelecionarFoto({
  openModalFoto,
  fotoPreview,
  setFotoPreview,
  setFotoFile,
  close,
  onSalvar,
}: ModalSelecionarFotoProps) {
  return (
    <Modal open={openModalFoto} close={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-[92%] max-w-sm
          rounded-2xl bg-white p-6 sm:p-7
          shadow-xl ${openModalFoto ? 'scale-100 opacity-100 duration-500' : 'scale-125 opacity-0 duration-500'}`}
      >
        {/* Botão fechar */}
        <button
          onClick={close}
          className="
            absolute right-4 top-4 rounded-full p-1
            text-gray-400 transition duration-300 cursor-pointer
            hover:bg-gray-100 hover:text-red-500
            active:bg-red-500 active:text-white
          "
        >
          <X size={20} />
        </button>

        {/* Cabeçalho */}
        <div className="mb-5 text-center">
          <h2 className="text-primary-800 text-lg font-semibold font-outfit sm:text-xl">
            Foto de perfil
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-satoshi">
            Escolha uma imagem para personalizar seu perfil
          </p>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col items-center gap-4">
          {/* Upload visual */}
          <label
            htmlFor="upload-foto"
            className="
              group relative flex h-28 w-28 sm:h-32 sm:w-32
              cursor-pointer items-center justify-center
              overflow-hidden
              rounded-full border-2 border-dashed border-primary-800
              transition-all duration-500
              hover:scale-105
            "
          >
            {fotoPreview ? (
              <>
                <img
                  src={fotoPreview}
                  alt="Preview da foto"
                  className="h-full w-full object-cover"
                />

                {/* Botão remover foto */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    setFotoPreview(null)
                    setFotoFile(null)

                    toast.info('Foto removida')
                  }}
                  className="
                    absolute right-1 top-1
                    rounded-full bg-black/60 p-1.5
                    text-white opacity-0
                    transition-all duration-300
                    hover:bg-red-500
                    group-hover:opacity-100
                  "
                >
                  <Trash2 size={14} className="
                    absolute left-1 top-1
                    rounded-full bg-black/60 p-1.5
                    text-white opacity-0
                    transition-all duration-300
                    hover:bg-red-500
                    group-hover:opacity-100
                  " />
                </button>
              </>
            ) : (
              <>
                <Camera
                  size={36}
                  className="text-primary-800 transition-transform duration-500 group-hover:scale-110"
                />
                <span
                  className="
                    absolute inset-0 rounded-full
                    animate-pulse
                    bg-primary-800/5
                  "
                />
              </>
            )}
          </label>

          <input
            id="upload-foto"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return

              setFotoFile(file)
              setFotoPreview(URL.createObjectURL(file))
            }}
          />

          <p className="text-center font-satoshi text-sm text-gray-600">
            Toque para adicionar uma foto <br />
            <span className="text-xs text-gray-400">(opcional)</span>
          </p>

          {/* Ações */}
          <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={close}
              className="
                w-full flex-1 rounded-lg border border-gray-300 py-2 text-sm
                text-gray-600 transition-all duration-500 cursor-pointer
                hover:bg-gray-200 hover:scale-[1.02]
                active:bg-gray-200
              "
            >
              Agora não
            </button>

            <button
              type="button"
              onClick={() => {
                if (!fotoPreview){
                    toast.error("Selecione uma foto")
                    return
                }
                onSalvar()
                toast.success('Sua foto foi salva com sucesso!')
                close()
              }}
              className={` w-full flex-1 rounded-lg py-2 text-sm
                transition-all duration-500 cursor-pointer hover:scale-[1.02]
                 ${fotoPreview ? "bg-primary-800 text-white hover:bg-blue-700" : "bg-gray-300"}`}
            >
              Salvar
            </button>
          </div>
        </div>

        {/* Keyframes */}
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px) scale(0.97);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}
        </style>
      </div>
    </Modal>
  )
}
