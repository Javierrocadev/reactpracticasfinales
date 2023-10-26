import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Global from './Global'
export default class Menu extends Component {
    state = {
        hospitales: [],
        stateLoad: false
    }
    loadHospitales = () => {
        var request = "api/Hospitales"
        var url = Global.urlApiEjemplos + request
        axios.get(url).then((response) => {
            this.setState({
                hospitales: response.data,
                stateLoad: true
            })
        })
    }
    componentDidMount = () => {
        this.loadHospitales()
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page"
                                        to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page"
                                        to="/createdepartamento">New Departamento</NavLink>
                                </li>
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hospitales
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.stateLoad == true &&
                                        (
                                            this.state.hospitales.map((hospital, index) => {
                                                return (
                                                    <li key={index}>
                                                        <NavLink
                                                            className="dropdown-item"
                                                            to={"/doctores/" + hospital.idhospital}>
                                                            {hospital.nombre}
                                                        </NavLink>
                                                    </li>
                                                )
                                            })
                                        )
                                    }
                                </ul>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
