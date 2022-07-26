import React, { Component } from 'react';
import axios from 'axios';

class Municipios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            municipios: {},
            status: null
        };
    }

    componentDidMount() {
        this.getMunicipios();
    }

    getMunicipios = (nombreProvincia) => {
        let config = {
            method: 'get',
            url: `http://localhost:8080/api/custom/getMunicipios?nombreProvincia=${this.props.provincia}`,
            headers: { 
              'x-token': localStorage.getItem("contabilitoToken")
            }
        };
        // const url = `http://localhost:8080/getMunicipios?nombreProvincia=${this.props.provincia}`;
        axios(config)
        .then(response => {
            this.setState({
                municipios: response.data,
                status: 'success'
            });
        });
    }
    
    render() {
        let municipios = this.state.municipios;
        if(municipios.length > 0) {
            return(
                <select className="form-select" name={this.props.fieldName}  required disabled>
                    <option value="">Seleccione un municipio</option>
                    {
                        municipios.map((municipio) => {
                            return <option key={municipio._id} value={municipio._id}>{municipio.nombre}</option>
                        })
                    }
                </select>
            )
        } else if(!this.state.municipios && this.state.status === 'success') {
            return(
                <div className="center">
                    <label>No hay municipios cargados aún</label>
                </div>
            )
        } else {
            return(
                <div className="center">
                    <label>No hay municipios cargados aún</label>
                </div>
            )
        }
        
    }
}

export default Municipios;