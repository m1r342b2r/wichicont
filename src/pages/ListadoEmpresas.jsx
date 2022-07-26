import Empresa from './Empresa';

export const ListadoEmpresas = ({empresas, setEmpresa}) => {
	return (
		<div className="md:w-1/2 ld:w-2/5 px-5 py-10 md:h-screen overflow-y-scroll">
            <h2 className='font-black text-3xl text-center'>Listado Empresas</h2>
			{ empresas && empresas.length ? 
			(
				<>
					<p className='text-xl mb-5 text-center'>
							Empresas
					</p>

					{ empresas.map( empresa => (
						<Empresa
							key={empresa.id}
							empresa={empresa}
							setEmpresa={setEmpresa}
						/>
					)) }
				</>
			) : (
				<>
					<p className='text-xl mt-5 mb-10 text-center'>
                        No hay empresas cargadas
					</p>
				</>
			) }
				
		</div>
	)
}

export default ListadoEmpresas;