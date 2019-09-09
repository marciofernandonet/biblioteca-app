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

import Index from './List';
import Create from './Create';
import Edit from './Edit';
import Avg from './Avg';

class MenuBar extends Component
{
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
                            <MDBNavItem >
                                <MDBNavLink to={'/admin'}>Home</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to={'/admin/novoLivro'} >Novo</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to={'/admin/media'} >Médias</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <Switch>
                    <Route exact path='/admin' component={ Index } />
                    <Route path='/admin/novoLivro' component={ Create } />
                    <Route path='/admin/editar/:id' component={ Edit } />
                    <Route path='/admin/media' component={ Avg } />
                </Switch>
            </Router>
        );
    }   
}

export default MenuBar;