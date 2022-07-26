import React, { Component } from 'react';

class Error extends Component {
    render() {
        return(
            <section id="content">
                <h2 className="subheader">P&aacute;gina no encontrada</h2>
                <p>La P&aacute;gina a la que intentas acceder no existe en esta aplicaci&oacute;n</p>
            </section>
        )
    }
}

export default Error;