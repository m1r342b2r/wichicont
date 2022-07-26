import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Head from './Head';
import Home from '../pages/Home';

const RutaProtegida = () => {
	const token = localStorage.getItem('contabilitoToken');
	const { auth, cargando } = useAuth()
	
	if(cargando) return 'Cargando ...'
	return (
		<>
			{auth.uid ? (
				<div>
					<Head />
					<div>
						<main>
							<Outlet />
						</main>
					</div>
				</div>
			) : <Navigate to="/" />}
		</>
	)
}

export default RutaProtegida