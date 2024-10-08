import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerts'
const urlServer = import.meta.env.VITE_BACKEND_URL;

const ConfirmAccount = () => {
	const params = useParams();
	const { id } = params;
	const [alerta, setAlerta] = useState({});
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
	useEffect(() => {
		const confirmarCuenta = async () => {
			try {
				const url = `${urlServer}/api/usuarios/confirmar/${id}`
				const { data } = await axios.get(url);
				console.log(data)
				setAlerta({
					msg: data.msg,
					error: false
				});
				setCuentaConfirmada(true);
			} catch(error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true
				});
			}
		}
		confirmarCuenta();
	}, []);

	const { msg } = alerta;
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl md:flex md:justify-center'>Contabilito</h1>
			<h3 className='text-sky-500 font-black text-2xl md:flex md:justify-center'>Confirmar tu cuenta</h3>

			<div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
				{msg && <Alerta alerta={alerta} />}

				{cuentaConfirmada && (
					<Link
						className='block text-center my-5 text-slate-500 uppercase text-sm'
						to='/'
					>Inicia sesión</Link>
				)}
			</div>
		</>
	)
}

export default ConfirmAccount