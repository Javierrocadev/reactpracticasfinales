import React, { Component } from 'react'
import Swal from 'sweetalert2'
import Global from './Global'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
export default class Home extends Component {
    state = {
        hospitales: [],
        empleados: [],
        stateLoadHospital: false,
        stateLoadEmpleados: false,
        idHospital: 0
    }
    loadHospitales = () => {
        var request = "api/Hospitales"
        var url = Global.urlApiEjemplos + request
        axios.get(url).then((response) => {
            this.setState({
                hospitales: response.data,
                stateLoadHospital: true
            })
        })
    }
    loadEmpleados = (idhospital) => {

        this.setState({
            idHospital: idhospital
        })
        var request = "api/Trabajadores/TrabajadoresHospital/" + idhospital

        var url = Global.urlApiEjemplos + request
        console.log(url)
        axios.get(url).then((response) => {
            this.setState({
                empleados: response.data,
                stateLoadEmpleados: true
            })
        })
        console.log(idhospital)
    }
    subirSalario = (idHospital) => {
        alert(idHospital)
        Swal.fire({
            title: 'Submit your Github username',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (incremento) => {
                //(`https://apiejemplos.azurewebsites.net/api/Trabajadores/UpdateSalarioTrabajadoresHospitales?incremento=${incremento}&idhospital=${idHospital}`)
                return fetch(`https://apiejemplos.azurewebsites.net/api/Trabajadores/UpdateSalarioTrabajadoresHospitales?incremento=${incremento}&idhospital=${idHospital}`, {
                    method: 'PUT'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        // Verificar si la respuesta contiene datos antes de analizarla
                        if (response.status !== 204) { // Puedes ajustar este código de estado según la API
                            return response.json();
                        } else {
                            return null;
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `actualizado`
                })
            }
        })
    }
    componentDidMount = () => {
        this.loadHospitales()
    }

    render() {
        if (this.state.stateLoadHospital == true) {
            return (
                <>
                    <h1>Hospitales generales</h1>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>idHospital</th>
                                <th>nombre</th>
                                <th>direccion</th>
                                <th>telefono</th>
                                <th>camas</th>
                                <th>enlace</th>
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
                                            <td><button onClick={() => this.loadEmpleados(hospital.idHospital)} className="btn btn-info" >Ver empleados</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        this.state.stateLoadEmpleados == true && (
                            <>
                                <h1>empleados hospital{this.state.idHospital}</h1>
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>idTrabajador</th>
                                            <th>apellido</th>
                                            <th>oficio</th>
                                            <th>salario</th>
                                            <th>idHospital</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.empleados.map((empleado, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{empleado.idTrabajador}</td>
                                                        <td>{empleado.apellido}</td>
                                                        <td>{empleado.oficio}</td>
                                                        <td>{empleado.salario}</td>
                                                        <td>{empleado.idHospital}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button onClick={() => this.subirSalario(this.state.idHospital)} className="btn btn-primary" >subir salario</button>
                            </>
                        )
                    }
                </>
            )
        }
    }
}