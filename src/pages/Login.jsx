import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerts from '../components/Alerts'
import axios from 'axios'
const serverUrl = import.meta.env.VITE_BACKEND_URL
import useAuth from '../hooks/useAuth'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alerta, setAlerta] = useState({})
	const { auth, setAuth, cargando } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		if([email, password].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true
			})
			return
		}

		if(password.length < 6) {
			setAlerta({
				msg: 'El password debe tener al menos 6 caracteres',
				error: true
			})
			return
		}

		try {
			const url = `${serverUrl}/api/auth/login`;
			console.log(url)
			const postData = { correo: email, password: password };
			const { data } = await axios.post(url, postData);
			setAlerta({})
			localStorage.setItem('contabilitoToken', data.token)
			localStorage.setItem('contabilitoUser', JSON.stringify(data.usuario))
			setAuth(data.usuario)
			navigate('/main');
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true
			})
		}
	}

	const { msg } = alerta

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl text-center'>Contabilito</h1>

			{msg && <Alerts alerta={alerta} />}

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
						onChange={e => setEmail(e.target.value)}
						/>
				</div>
				<div className='my-5'>
					<label 
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='password'
						>Password
					</label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<input
					type='submit'
					value='Iniciar sesión'
					className='bg-sky-600 w-full py-3 mb-5 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-400 transition-colors'
				/>
			</form>

			<nav className='lg:flex lg:justify-between'>
				<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/signout'
				>Solicitar usuario</Link>

				<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/forgot-password'
				>Forgot Password</Link>
			</nav>
		</>
	)
}

export default Login