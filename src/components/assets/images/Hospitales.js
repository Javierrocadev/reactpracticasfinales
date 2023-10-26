import React, { Component } from 'react'
import axios from 'axios'
import Globa from './Global'
export default class Hospitales extends Component {
    state = {
        hospitales: [],
        stateLoad: false
    }
    loadHospitales = () => {
        var request = "api/Hospitales"
        var url = Globa.urlApiEjemplos + request
        axios.get(url).then((response) => {
            this.setState({
                hospitales: response.data,
                stateLoad: true
            })
        })
    }
    render() {
        if (this.state.stateLoad == true) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>idHospital</th>
                            <th>nombre</th>
                            <th>direccion</th>
                            <th>telefono</th>
                            <th>camas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.hospitales.map((hospital, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{hospital.idHospital}</td>
                                        <td>{hospital.nombre}</td>
                                        <td>{hospital.direccion}</td>
                                        <td>{hospital.telefono}</td>
                                        <td>{hospital.camas}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    }
}
