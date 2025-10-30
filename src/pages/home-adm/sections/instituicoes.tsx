import { HeaderDashboards } from '../../../components/header'


export function Instituicoes() {
  return (
    <main className="flex h-full w-[calc(100%-20%)] pr-4 flex-col items-start space-y-6 max-md:px-4 max-md:w-full">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao /> 
      </HeaderDashboards.root>


    </main>
  )}
