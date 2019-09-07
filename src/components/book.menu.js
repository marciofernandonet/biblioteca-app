import React, {Component} from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
    MDBNavbar, 
    MDBNavbarBrand, 
    MDBNavbarNav, 
    MDBNavItem, 
    MDBNavLink, 
    MDBNavbarToggler, 
    MDBCollapse
} from "mdbreact";

import Create from './book.create';
import Edit from './book.edit';
import Index from './book.index';
import BookAvg from './book.avg';

class MenuAdmin extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render(){
        return(
            <Router>
                <MDBNavbar color="indigo" dark expand="md">
                    <MDBNavbarBrand>
                        <Link to={'/admin'} className="navbar-brand">Livraria</Link>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active >
                                <MDBNavLink to={'/admin'}>Home</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to={'/admin/novo_livro'} >Novo</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to={'/admin/media_notas'} >Médias</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <Switch>
                    <Route path='/admin/novo_livro' component={ Create } />
                    <Route path='/admin/editar/:id' component={ Edit } />
                    <Route path='/admin/media_notas' component={ BookAvg } />
                    <Route exact path='/admin' component={ Index } />
                </Switch>
            </Router>
        );
    }   
}

export default MenuAdmin;