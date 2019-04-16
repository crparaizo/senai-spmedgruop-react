import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App'; //Mudar a rota

import ListarCadastrarClinica from './pages/Clinicas/Clinicas';
import Login from './pages/Login/Login';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';

import ListarCadastrarEspecialidade from './pages/Especialidades/Especialidades';
// import ListarCadastrarUsuario from './pages/Usuarios/Usuarios';
// import ListarCadastrarMedico from './pages/Medicos/Medicos';
// import ListarCadastrarProntuario from './pages/Prontuarios/Prontuarios';
import ListarCadastrarConsulta from './pages/Consultas/Consultas';

import { usuarioAutenticado } from './services/auth';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
// {/*css modules, styled components, BEM */ }

const Permissao = ({ component: Component }) => (
    //convertendo que se está acessando (component do Switch)           
    <Route
        render={props => usuarioAutenticado() ? //Operador ternário
            (<Component {...props} />) :
            (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        }
    />
);

const rotas = (
    <Router>
        <div>
            <Switch>
                {/*Permissao*/}
                <Route exact path="/" component={App} />
                <Route path="/clinicas" component={ListarCadastrarClinica} />
                <Route path="/login" component={Login} />
                <Route path="/especialidades" component={ListarCadastrarEspecialidade} />
                {/* <Route path="/usuarios" component={ListarCadastrarUsuario} />
                <Route path="/medicos" component={ListarCadastrarMedico} />
                <Route path="/prontuarios" component={ListarCadastrarProntuario} /> */}
                <Route path="/consultas" component={ListarCadastrarConsulta} />
                <Route component={NaoEncontrada} /> {/* Esse é o default do Switch, nenhuma outra Route será lida dps disso */}
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root')); // Acrescentar "rotas" aqui!

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
