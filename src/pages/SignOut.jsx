import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerts from '../components/Alerts'
import axios from 'axios'
const urlServer = import.meta.env.VITE_BACKEND_URL;

const Registrar = () => {
	const [nombre, setNombre] = useState('')
	const [email, setEmail] = useState('')
	const [rol, setRol] = useState('')
	const [password, setPassword] = useState('')
	const [repetirPassword, setRepetirPassword] = useState('')
	const [alerta, setAlerta] = useState({})

	const handleSubmit = async e => {
		e.preventDefault();

		if([nombre, email, rol, password, repetirPassword].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true
			})
			return
		}

		if(password !== repetirPassword) {
			setAlerta({
				msg: 'Los passwords no son iguales',
				error: true
			})
			return
		}

		if(password < 6 ) {
			setAlerta({
				msg: 'El password debe tener al menos 6 caracteres',
				error: true
			})
			return
		}

		// Creando el usuario en la base de datos
		const urlApi = `${urlServer}/api/usuarios/adduser`;
		const dataToSent = {
			nombre: nombre,
			correo: email,
			password: password,
			rol: rol
		}
		
		axios.post(urlApi, dataToSent)
		.then(response => {
			setAlerta({
				msg: response.data.msg,
				error: false
			});
			setNombre('')
			setEmail('')
			setRol('')
			setPassword('')
			setRepetirPassword('')
		}).catch(error => {
			const responseError = error.response.data.errors[0].msg;
			setAlerta({
				msg: responseError.toLowerCase(),
				error: true
			});
		})
		setAlerta({});
	}

	const { msg } = alerta

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl md:flex md:justify-center'>Contabilito</h1>
			<h3 className='text-sky-500 font-black text-2xl md:flex md:justify-center'>Crear Usuario</h3>

			<form
				className='my-10 bg-white shadow rounded-lg px-10 py-5'
				onSubmit={handleSubmit}
			>
				<div className='my-5'>
					<label 
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='nombre'
						>Apellido y Nombres
					</label>
					<input
						id='nombre'
						type='text'
						placeholder='Escriba su Apellido y Nombres'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
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
						htmlFor='rol'
						>Rol
					</label>
					<select
						id='rol'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={rol}
						onChange={e => setRol(e.target.value)}
					>
						<option value=''>Seleccione un rol</option>
						<option value='ADMIN'>Administrador</option>
						<option value='RO'>Usuario consulta</option>
						<option value='RW'>Usuario carga de datos</option>
					</select>
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
						value={repetirPassword}
						onChange={e => setRepetirPassword(e.target.value)}
					/>
				</div>

				{ msg && <Alerts alerta={alerta} /> }

				<input
					type='submit'
					value='Guardar usuario'
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
					to='/forgot-password'
				>Forgot Password</Link>
			</nav>
		</>
	)
}

export default Registrar