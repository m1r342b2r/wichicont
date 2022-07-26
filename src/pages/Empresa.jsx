import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Provincias from '../components/Provincias';
import Municipios from '../components/Municipios';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';``
import * as Yup from 'yup';
import { values } from 'lodash';
const urlServer = 'http://localhost:8080';

const Empresa = (empresa, SetEmpresa, pacientes, setPacientes) => {
	let navigate = useNavigate();
	const [error, setError] = useState(false);
	const empresaSchema = Yup.object().shape({
		razonSocial: Yup.string().required('El campo es obligatorio'),
		cuit : Yup.string().required('El campo es obligatorio'),
		domicilioLegal : Yup.string().required('El campo es obligatorio'),
		cpLegal : Yup.string().required('El campo es obligatorio'),
		provinciaDomicilioLegal : Yup.string().required('El campo es obligatorio'),
		municipioDomicilioLegal : Yup.string(),
		domicilioPago : Yup.string(),
		cpPago : Yup.string(),
		provinciaDePago : Yup.string(),
		municipioDePago: Yup.string()
	})

	const handleSubmit = async (valores) => {
		try {
			const urlApi = `${urlServer}/api/empresas/setEmpresa`;
			let nuevaEmpresa = {
				razonSocial: valores.razonSocial,
				cuit: valores.cuit,
				domicilioLegal: valores.domicilioLegal,
				cpDomicilioLegal: valores.cpLegal || null,
				provinciaDomicilioLegal: valores.provinciaDomicilioLegal,
				municipioDomicilioLegal: valores.municipioDomicilioLegal || null,
				domicilioDePago: valores.domicilioPago || null,
				cpDomicilioDePago: valores.cpPago || null,
				provinciaDomicilioDePago: valores.provinciaDePago || null,
				municipioDomicilioDePago: valores.municipioDePago || null
			}
			
			axios({
				method: 'post',
				url: urlApi,
				data: nuevaEmpresa,
				headers: { 'content-type': 'application/json', 'x-token': localStorage.getItem('contabilitoToken') }
			})
			.then(response => {
				let usuarioCreado = response.data;
				console.log(`Usuario creado: ${JSON.stringify(usuarioCreado)}`);
				// navigate('/main');
			}).catch(error => {
				console.log(error);
			});
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = event => {
		setValues(values => ({
		  ...values,
		  // we use the name to tell Formik which key of `values` to update
		  [event.target.provinciaDomicilioLegal]: event.target.value
		}))
	  }

	return (
		<Formik
			initialValues ={{
				razonSocial: '',
				cuit : '',
				domicilioLegal : '',
				cpLegal : '',
				provinciaDomicilioLegal : '',
				municipioDomicilioLegal : '',
				domicilioPago : '',
				cpPago : '',
				provinciaDePago : '',
				municipioDePago: ''
			}}
			onSubmit = {
				async(values, { resetForm }) => {
					console.log(`Provincia: ${values.provinciaDomicilioLegal}`)
					handleSubmit(values)
					resetForm()
				}
			}

			onChange = {
				async(values) => {
					alert(values.provinciaDomicilioLegal)
				}
			}
			
			validationSchema = {empresaSchema}
		>
			{({errors, touched}) => {
				return(
					<div className="md:w-1/2 ld:w-2/5 px-5 py-10">
						<h2 className='font-black text-3xl text-center mb-5'>Alta de Empresa</h2>
						<Form className='bg-blue-100 shadow-md rounded-lg py-10 px-5 mb-5'>

							<label htmlFor="razonSocial">Razón Social</label>
							<Field
								id="razonSocial"
								name="razonSocial"
								type="text"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
								placeholder="Nombre de la empresa"
							/>

							{ errors.razonSocial && touched.razonSocial ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.razonSocial}
								</div>
							) : null }


							<label htmlFor="cuit">CUIT</label>
							<Field
								id="cuit"
								name="cuit"
								type="text"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
								placeholder="CUIT de la empresa"
							/>

							{ errors.cuit && touched.cuit ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.cuit}
								</div>
							) : null }


							<label htmlFor="domicilioLegal">Domicilio Legal</label>
							<Field
								id="domicilioLegal"
								name="domicilioLegal"
								type="text"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
								placeholder="Domicilio legal de la empresa"
							/>

							{ errors.domicilioLegal && touched.domicilioLegal ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.domicilioLegal}
								</div>
							) : null }


							<label htmlFor="cpLegal">CP Domicilio Legal</label>
							<Field
								id="cpLegal"
								name="cpLegal"
								type="text"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
								placeholder="Código postal domicilio legal"
							/>

							{ errors.cpLegal && touched.cpLegal ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.cpLegal}
								</div>
							) : null }


							<label htmlFor="provinciaDomicilioLegal">Provincia Domicilio Legal</label>
							<Field
								id="provinciaDomicilioLegal"
								name="provinciaDomicilioLegal"
								as="select"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
							>
								<option value="">Seleccione une provincia</option>
								<Provincias />
							</Field>
							
							{ errors.provinciaDomicilioLegal && touched.provinciaDomicilioLegal ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.provinciaDomicilioLegal}
								</div>
							) : null }


							<label htmlFor="municipioDomicilioLegal">Municipio Domicilio Legal</label>
							<Field
								id="municipioDomicilioLegal"
								name="municipioDomicilioLegal"
								as="select"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
							>
								<option value="">Seleccione un municipio</option>
							</Field>

							{ errors.municipioDomicilioLegal && touched.municipioDomicilioLegal ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.municipioDomicilioLegal}
								</div>
							) : null }


							<label htmlFor="domicilioPago">Domicilio de Pago</label>
							<Field
								id="domicilioPago"
								name="domicilioPago"
								type="text"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
								placeholder="Domicilio de pago de la empresa"
							/>

							{ errors.domicilioPago && touched.domicilioPago ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.domicilioPago}
								</div>
							) : null }


							<label htmlFor="cpPago">CP Domicilio de Pago</label>
							<Field
								id="cpPago"
								name="cpPago"
								type="text"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
								placeholder="Código postal domicilio de pago"
							/>

							{ errors.cpPago && touched.cpPago ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.cpPago}
								</div>
							) : null }


							<label htmlFor="provinciaDePago">Provincia Domicilio de Pago</label>
							<Field
								id="provinciaDePago"
								name="provinciaDePago"
								as="select"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
							>
								<option value="">Seleccione une provincia</option>
								<Provincias />
							</Field>

							{ errors.provinciaDePago && touched.provinciaDePago ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.provinciaDePago}
								</div>
							) : null }


							<label htmlFor="municipioDePago">Municipio Domicilio de Pago</label>
							<Field
								id="municipioDePago"
								name="municipioDePago"
								as="select"
								className="mt-2 mb-4 block w-full p-3 bg-gray-50 rounded-md"
							>
								<option value="">Seleccione un municipio</option>
							</Field>

							{ errors.municipioDePago && touched.municipioDePago ? (
								<div
									className="text-center text-red-600 font-bold p-3 uppercase"
								>
									{errors.municipioDePago}
								</div>
							) : null }

							<input
								type="submit"
								value="Agregar empresa"
								className="mt-10 w-full bg-blue-500 p-3 text-white uppercase font-bold text-lg rounded-md"
							/>
						</Form>
					</div>
				)
			}}
		</Formik>
	)
}

export default Empresa;