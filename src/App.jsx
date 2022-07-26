import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import SignOut from './pages/SignOut'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './layouts/RutaProtegida'
import Home from './pages/Home'
import Empresas from './pages/Empresas'

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<Login />} />
						<Route path="signout" element={<SignOut />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
						<Route path="forgot-password/:token" element={<NewPassword />} />
						<Route path="confirmaccount/:id" element={<ConfirmAccount />} />
					</Route>

					<Route path="/main" element={<RutaProtegida />}>
						<Route index element={<Home />} />
						<Route path="/main/empresas" element={<Empresas />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
