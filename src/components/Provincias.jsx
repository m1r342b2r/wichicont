import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

class Provincias extends Component {
	constructor(props) {
		super(props);
		this.state = {
			provincias: {},
			status: null
		};
	}

	componentDidMount() {
		this.getProvincias();
	}

	getProvincias = () => {
		let config = {
			method: 'get',
			url: 'http://localhost:8080/api/custom/getprovincias',
			headers: { 
			  'x-token': localStorage.getItem("contabilitoToken")
			}
		};
		axios(config)
		.then(response => {
			let pcias = response.data.sort();
			this.setState({
				provincias: pcias,
				status: 'success'
			});
		}).catch(error => {
			console.error(error);
		});

	}
	
	render() {
		let provincias = this.state.provincias;
		if(provincias.length > 0) {
			return(
				provincias.map((provincia) => {
					return (<option key={provincia._id} value={provincia._id}>{provincia.nombre}</option>)
				})
			)
		} else if(!this.state.provincias && this.state.status === 'success') {
			return(<option key="" value="">No hay provincias cargadas aún</option>)
		} else {
			return(<option key="" value="">No hay provincias cargadas aún</option>)
		}
		
	}
}

export default Provincias;
