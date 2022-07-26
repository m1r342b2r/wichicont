import axios from 'axios';
import { useState, useEffect, createContext } from 'react'
const AuthContext = createContext();
const serverUrl = import.meta.env.VITE_BACKEND_URL

const AuthProvider = ({children}) => {
	const [auth, setAuth] = useState({})
	const [cargando, setCargando] = useState(true)
	useEffect(() => {
		const autenticarUsuario = async () => {
			const token = localStorage.getItem('contabilitoToken');
			if(!token) {
				setCargando(false)
				return
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					'x-token': token
				}
			}

			try {
				const url = `${serverUrl}/api/usuarios/perfil`;
				const { data } = await axios(url, config);
				setAuth(data)
			} catch (error) {
				// setAuth({})
			}
			setCargando(false)
		}
		autenticarUsuario();
	}, [])
	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				cargando
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthProvider
}

export default AuthContext;