import { useState } from 'react';
import Empresa from './Empresa';
import ListadoEmpresas from './ListadoEmpresas';

const Empresas = () => {

	const [empresas, setEmpresas] = useState([]);
	const [empresa, setEmpresa] = useState([]);

	return (
		<div className="container mx-auto mt-12">
			<div className="mt-12 md:flex">
				<Empresa
					empresas={empresas}
					setEmpresas={setEmpresas}
					empresa={empresa}
					setEmpresa={setEmpresa}
				/>
				<ListadoEmpresas
					empresas={empresas}
					setEmpresas={setEmpresas}
				/>
			</div>
		</div>
	)
}

export default Empresas