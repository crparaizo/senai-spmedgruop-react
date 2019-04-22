import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";

export default class ListarCadastrarMedico extends Component {
    constructor() {
        super();

        this.state = {
            idUsuario: "",
            crm: "",
            listaCrm: [], //Caixa de seleção -> Fazer um filter?
            listaMedicos: [], //Puxar informações da tabela Médicos para mostrar (com "inner join") 
            idEspecialidade: "",
            listaEspecialidade: [],
            idClinica: "",
            listaClinicas: [],
            listaConsultas: [] //Listar todas as consultas de determinada pessoa
        }
    }

    componentDidMount() {
        apiService
            .call("consultas")
            .getAll()
            .then(data => {
                this.setState({ listaConsultas: data.data });
            });

        apiService
            .call("especialidades")
            .getAll()
            .then(data => {
                this.setState({ listaEspecialidade: data.data });
            });

        apiService
            .call("clinicas")
            .getAll()
            .then(data => {
                this.setState({ listaClinicas: data.data });
            });

        apiService
            .call("medicos")
            .getAll()
            .then(data => {
                this.setState({ listaMedicos: data.data });
            });
    }

    atualizaEstadoidUsuario(event) {
        this.setState({ idUsuario: event.target.value });
    }
    atualizaEstadoCrm(event) {
        this.setState({ crm: event.target.value });

        // this.state.listaCrm.forEach(element => {
        //     console.log(element.nome);
        //     console.log(event.target.value);

        //     if (element.nome == event.target.value)
        //     {
        //         this.setState({ categoriaId : element.id });
        //     }
        // });

    }
    atualizaEstadoidEspecialidade(event) { //??
        this.setState({ idEspecialidade: event.target.value });
    }

    atualizaEstadoidClinica(event) {
        this.setState({ idClinica: event.target.value });
    }


    cadastrarMedico(event) {
        event.preventDefault();

        let medico = {
            idUsuario: this.state.idUsuario,
            crm: this.state.crm,
            idEspecialidade: this.state.idEspecialidade,
            idClinica: this.state.idClinica
        };

        Axios.post('http://localhost:5000/api/medicos', medico, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }

            
        })
        .then(res => {
            this.call("medicos")
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID - Médico</th>
                            <th>ID - Usuário</th>
                            <th>CRM</th>
                            <th>ID - Especialidade</th>
                            <th>ID- Clínica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaMedicos.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.idUsuario}</td>
                                    <td>{element.crm}</td>
                                    <td>{element.idEspecialidade}</td>
                                    <td>{element.idClinica}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <form onSubmit={this.cadastrarMedico.bind(this)} noValidate>
                    <input type="text" value={this.state.idUsuario} onChange={this.atualizaEstadoidUsuario.bind(this)} placeholder="ID -usuário" required />
                    <input type="text" value={this.state.crm} onChange={this.atualizaEstadoCrm.bind(this)} placeholder="crm" required />
                    <input type="text" value={this.state.idEspecialidade} onChange={this.atualizaEstadoidEspecialidade.bind(this)} placeholder="ID - especialidade" required />
                    <input type="text" value={this.state.idClinica} onChange={this.atualizaEstadoidClinica.bind(this)} placeholder="Id - clinica" required />
                    <button type="submit"> Cadastrar </button>
                </form>
            </div>
        )
    }
}