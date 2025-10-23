import { imagemAvatar } from "../../assets/image";

export function HeaderDashboardPerfil() {
  return (
    <div className="flex font-outfit-bold items-center justify-center gap-4">
      {/* container de foto */}
      <div className="bg-primary-800 w-16 h-16 rounded-full">
        <img src={imagemAvatar} className="w-full h-full" alt="" />
      </div>

      {/* container nome e tipo de usuario  */}
      <div className="flex flex-col items-start justify-center leading-6">
        <h3 className="text-primary-800 text-[1.4rem]">Pedro Lucas</h3>
        <p className="font-outfit text-primary-800 text-[1.1rem]">Funcionário</p>
      </div>
    </div>
  )
}
