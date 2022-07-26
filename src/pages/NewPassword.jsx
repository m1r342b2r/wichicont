import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alerts from '../components/Alerts'
const urlServer = import.meta.env.VITE_BACKEND_URL;

const NewPassword = () => {
	const params = useParams()
	const { token } = params
	const [tokenValido, setTokenValido] = useState(false)
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [passwordModificado, setPasswordModificado] = useState(false)
	const [ alerta, setAlerta] = useState({});
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				const urlApi = `${urlServer}/api/usuarios/confirmaccount/${token}`;
				await axios.get(urlApi);
				setTokenValido(true)
			} catch(error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true
				});
			}
		}
		comprobarToken();
	}, [])

	const handleSubmit = async e => {
		e.preventDefault();

		if(password.length < 6) {
			setAlerta({
				msg: 'El password debe tener al menos 6 caracteres',
				error: true
			})
			return 
		}

		if(password !== password2) {
			setAlerta({
				msg: 'Los password no sin iguales',
				error: true
			})
			return
		}

		try {
			const url = `${urlServer}/api/usuarios/forgot-password/${token}`
			const { data } = await axios.post(url, { password })
			setAlerta({
				msg: data.msg,
				error: false
			})
			setPasswordModificado(true)
		} catch (error) {
			console.log(`===> ${JSON.stringify(error.response)}`)
			setAlerta({
				msg: error.response.data.msg,
				error: true
			})
		}
	}

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl md:flex md:justify-center'>Contabilito</h1>
			<h3 className='text-sky-500 font-black text-2xl md:flex md:justify-center'>Restablecer Password</h3>

			{ msg && <Alerts alerta={alerta} /> }

			{ tokenValido && (
				<form
					className='my-10 bg-white shadow rounded-lg px-10 py-5'
					onSubmit={handleSubmit}
				>
					<div className='my-5'>
						<label 
							className='uppercase text-gray-600 block text-xl font-bold'
							htmlFor='password'
							>Nuevo Password
						</label>
						<input
							id='password'
							type='password'
							placeholder='Escribe tu Nuevo Password'
							className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className='my-5'>
						<label 
							className='uppercase text-gray-600 block text-xl font-bold'
							htmlFor='password2'
							>Repetir Password
						</label>
						<input
							id='password2'
							type='password'
							placeholder='Repetir tu Password'
							className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
							value={password2}
							onChange={e => setPassword2(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Guardar Nuevo Password'
						className='bg-sky-600 w-full py-3 mb-5 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-400 transition-colors'
					/>
				</form>
			) }

			{passwordModificado && (
				<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/'
				>Inicia sesión</Link>
			)}
		</>
	)
}

export default NewPassword