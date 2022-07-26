import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alerts'
import axios from 'axios'
const urlServer = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();

		if(email === '' || email.length < 6) {
			setAlerta({
				msg: 'El email es obligatorio',
				error: true
			});
			return
		}

		try {
			const urlApi = `${urlServer}/api/usuarios/forgot-password`;
			const dataToSent = { email: email };
			const { data } = await axios.post(urlApi, dataToSent);
			setAlerta({
				msg: data.msg,
				error: false
			});
		} catch(error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true
			});
		}
	}

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl md:flex md:justify-center'>Contabilito</h1>
			<h3 className='text-sky-500 font-black text-2xl md:flex md:justify-center'>Restaurar password</h3>

			{ msg && <Alert alerta={alerta} /> }

			<form
				className='my-10 bg-white shadow rounded-lg px-10 py-5'
				onSubmit={handleSubmit}
			>
				<div className='my-5'>
					<label 
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='email'
						>Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={email}
						onChange={ e => setEmail(e.target.value) }
					/>
				</div>
				
				<input
					type='submit'
					value='Solicitar cambio de clave'
					className='bg-sky-600 w-full py-3 mb-5 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-400 transition-colors'
				/>
			</form>

			<nav className='lg:flex lg:justify-between'>
				<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/'
				>Si tienes cuenta inicia sesión</Link>

<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/signout'
				>Solicitar usuario</Link>
			</nav>
		</>
	)
}

export default ForgotPassword