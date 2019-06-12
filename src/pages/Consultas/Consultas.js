import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";
import './Consultas.css';

{/* <link href="https://fonts.googleapis.com/css?family=Rokkitt" rel="stylesheet"> */ }

export default class ListarCadastrarConsulta extends Component {
    constructor() {
        super();

        this.state = {
            idProntuario: "",
            idMedico: "",
            dataHoraConsulta: "",
            idSituacao: 1,
            descricao: "",
            listaConsultas: [],
            listaConsultasFiltrada: [],
            tabLista: true,
            inputBusca: ""
            //visivel: true //Quando uma consultar for "excluida", seu estado inativado para medicos e pacientes
        }

        this.AlterarEstado = this.AlterarEstado.bind(this);
    }

    logout() {
        localStorage.removeItem('usuario-spmedgroup');
        window.location.reload();
    }

    listarConsultas() {
        apiService
            .call("consultas")
            .getAll()
            .then(res => {
                const consultas = res.data;
                this.setState({ listaConsultas: consultas, listaConsultasFiltrada: consultas })
            })
    }

    componentDidMount() {
        this.listarConsultas();
    }

    // openPage(namePage) {
    //     var i;
    //     var x = document.getElementsByClassName("tabcontent");
    //     for (i = 0; i < x.length; i++) {
    //         x[i].style.display = "none";
    //     }
    //     document.getElementById(namePage).style.display = "flex";
    // }

    atualizaEstadoidProntuario(event) {
        this.setState({ idProntuario: event.target.value });
    }
    atualizaEstadoidMedico(event) {
        this.setState({ idMedico: event.target.value });
    }
    atualizaEstadoData(event) {
        this.setState({ dataHoraConsulta: event.target.value });
    }
    atualizaEstadoidSituacao(event) {
        this.setState({ idSituacao: event.target.value });
    }
    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
    }

    buscarConsultaItem() {

        let listaFiltrada = this.state.listaConsultas;

        if (this.state.inputBusca !== null && this.state.inputBusca !== "") {
            listaFiltrada = listaFiltrada.filter(x =>
                x.descricao.toLowerCase().includes(this.state.inputBusca.toLowerCase())
            );
        }

        this.setState({ listaConsultasFiltrada: listaFiltrada });
    }

    atualizaEstadoBusca(event) {
        this.setState({ inputBusca: event.target.value }, () => {
            this.buscarConsultaItem() //Serve para filtrar no mesmo momento que vai
        });
    }

    cadastrarConsulta(event) {
        event.preventDefault();

        // let consulta = {
        //     idProntuario: this.state.idProntuario,
        //     idMedico: this.state.idMedico,
        //     dataHoraConsulta: this.state.dataHoraConsulta,
        //     idSituacao: this.state.idSituacao,
        //     descricao: this.state.descricao
        // };

        // Axios.post('http://192.168.3.151:5000/api/consultas', consulta, {
        //     headers: {
        //         Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(res => {
        //         alert("Consulta cadastrada");
        //         this.listarConsultas();
        //     })
        //window.location.reload();

        // console.log(consulta);

        apiService
            .call("consultas")
            .create({
                idProntuario: this.state.idProntuario,
                idMedico: this.state.idMedico,
                dataHoraConsulta: this.state.dataHoraConsulta,
                idSituacao: 1,
                descricao: this.state.descricao
            })
            .then(res => {
                alert("Consulta cadastrada!");
                this.listarConsultas()
            })
    }

    AlterarEstado(event) { ///CONSERTAR MÉTODOS
        event.preventDefault();

        // if (window.confirm("Quer excluir mesmo?")) {
        //     apiService
        //         .call("consultas")
        //         //.row(event.target.id)
        //         .delete()
        //         .then(function () {
        //             alert("Consultas removida!")
        //         }).catch(function (error) {
        //             console.error("Erro ao remover: ", error);
        //         });
        // }

    }

    render() {
        return (
            <div>
                <div className="topo-consultas">
                    <div className="topo-consultas__quebra"></div>
                    <h1 className="topo-consultas__h1">Consultas</h1>
                    <div className="topo-consultas__quebra topo-consultas__quebra--modificado"></div>
                    <form onSubmit={this.buscarConsultaItem.bind(this)}>
                            <input
                                className="topo-consultas__label"
                                placeholder="Busque! - descrição..."
                                type="text"
                                value={this.state.inputBusca}
                                onChange={this.atualizaEstadoBusca.bind(this)}
                            />
                    </form>
                </div>
                <div>
                    <aside>
                        <div className="menu-consulta">
                            <h3 className="menu-consulta__titulo">Administrador</h3>
                            <img className="menu-consulta__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                            <div className="links-consulta">
                                <nav>
                                    <ul>
                                        {/* <!-- Páginas de médico e paciente terão menos links-consulta --> */}
                                        <li className="links-consulta__item"><a className="links-consulta__titulo" href="/prontuarios">Prontuários</a></li>
                                        <div className="links-consulta__quebra"></div>
                                        <li className="links-consulta__item links-consulta__titulo links-consulta__titulo--selecionado">Consultas</li>
                                        <div className="links-consulta__quebra"></div>
                                        <li className="links-consulta__item"><a className="links-consulta__titulo" href="/clinicas">Clínicas</a></li>
                                        <div className="links-consulta__quebra"></div>
                                        <li className="links-consulta__item"><a className="links-consulta__titulo" href="/medicos">Médicos</a></li>
                                        <div className="links-consulta__quebra"></div>
                                        <li className="links-consulta__item"><a className="links-consulta__titulo" href="/usuarios">Usuários</a></li>
                                        <div className="links-consulta__quebra"></div>
                                        <li className="links-consulta__item"><a className="links-consulta__titulo" href="/especialidades">Especialidades</a></li>
                                        <div className="links-consulta__quebra"></div>
                                    </ul>
                                </nav>
                            </div>
                            <a className="menu-consulta__link" onClick={this.logout.bind(this)} href="/">Sair</a>
                        </div>
                    </aside>
                    <main className="listas-consulta">
                        {/* <!-- Configuração Tab Html! -->
        <!-- (button)openPage("Nome") tem que ser igual (div/table)id="Nome" --> */}
                        <input type="button" className="listas-consulta__button listas-consulta__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)} />

                        <input type="button" className="listas-consulta__button listas-consulta__button--cadastrar tablink" value='Cadastrar+' onClick={this.alteraTabs.bind(this)} />

                        <div className="contorno">
                            <div id="Lista" className="tabela-consulta tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                                <table className="tabela-consulta__real">
                                    <thead className="tabela-consulta-head">
                                        <tr>
                                            <th className="tabela-consulta-head__titulo">Consulta(ID)</th>
                                            <th className="tabela-consulta-head__titulo">Paciente</th>
                                            <th className="tabela-consulta-head__titulo">Médico</th>
                                            <th className="tabela-consulta-head__titulo">Data da Consulta</th>
                                            <th className="tabela-consulta-head__titulo">Situação</th>
                                            <th className="tabela-consulta-head__titulo">Descrição</th>
                                            {/* <!-- <a href="#">Alterar</a> --> */}
                                        </tr>
                                    </thead>
                                    <tbody className="tabela-consulta-body">
                                        {this.state.listaConsultasFiltrada.map((element) => {
                                            return (
                                                <tr key={element.id}>
                                                    <td className="tabela-consulta-body_dado">{element.id}</td>
                                                    <td className="tabela-consulta-body_dado">{element.idProntuarioNavigation.idUsuarioNavigation.nome}</td>
                                                    <td className="tabela-consulta-body_dado">{element.idMedicoNavigation.idUsuarioNavigation.nome}</td>
                                                    <td className="tabela-consulta-body_dado">{element.dataHoraConsulta}</td>
                                                    <td className="tabela-consulta-body_dado">{element.idSituacaoNavigation.nome}</td>
                                                    {/* <td className="tabela-consulta-body_dado">{element.idSituacao ? element.idSituacao : 1}</td> */}
                                                    <td className="tabela-consulta-body_dado">{element.descricao}</td>
                                                    <div className="botoes-consulta">
                                                        <button className="botoes-consulta__item botoes-consulta__item--alterar">Alterar</button>
                                                        {/* Deletar: tipo da situação será Cancelada -> Rescrever linha?*/}

                                                    </div>
                                                    <button id={element.id}
                                                        onClick={this.AlterarEstado}
                                                        className="botoes-consulta__item botoes-consulta__item--deletar">Deletar</button>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <form onSubmit={this.cadastrarConsulta.bind(this)} noValidate>
                                <div id="Cadastrar" className="formulario-consulta tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                                    <label htmlFor=""><input className="formulario-consulta__item" type="text" value={this.state.idProntuario} onChange={this.atualizaEstadoidProntuario.bind(this)} placeholder="Nome do Paciente" /></label>
                                    {/* <!-- <label htmlFor=""><input className="formulario-consulta__item" type="text" placeholder="ID do Paciente" /></label> --> */}
                                    {/* <!-- FAZER UMA COIXA DE SELEÇÃO? --> */}
                                    <label htmlFor=""><input className="formulario-consulta__item" type="text" value={this.state.idMedico} onChange={this.atualizaEstadoidMedico.bind(this)} placeholder="Nome do Médico" /></label>
                                    {/* <!-- <label htmlFor=""><input className="formulario-consulta__item" type="text" placeholder="ID do Médico" /></label> --> */}
                                    <label htmlFor=""><input className="formulario-consulta__item" type="date" value={this.state.dataHoraConsulta} onChange={this.atualizaEstadoData.bind(this)} placeholder="Data da Consulta" /></label>
                                    <label htmlFor=""><input className="formulario-consulta__item" disabled placeholder="Situação = AGENDADA  " /></label>
                                    <label htmlFor=""><input className="formulario-consulta__item" type="text" value={this.state.descricao} onChange={this.atualizaEstadoDescricao.bind(this)} required placeholder="Descrição" /></label>
                                    <button className="formulario-consulta__button" type="submit">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}