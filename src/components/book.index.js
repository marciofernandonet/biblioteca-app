import React, { Component } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { 
    MDBJumbotron, 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBCardBody, 
    MDBTable, 
    MDBTableBody, 
    MDBTableHead,
    MDBBtn,
    MDBIcon,
    MDBModal, 
    MDBModalBody, 
    MDBModalHeader, 
    MDBModalFooter
}from "mdbreact";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            book: [],
            modal: false ,
            idBook: null
        };
    }
    
    componentDidMount(){
        this.loadBooks();
    }

    loadBooks = () => {
        api.get('/livros')
            .then(res=>{
                this.setState({ book: res.data });
            })
            .catch(err => {
                console.log(err);
        });
    }

    toggle = id => () => {  
        this.setState({
            modal: !this.state.modal,
            idBook: id
        });
    }

    deleteBook = () => {
        let id = this.state.idBook;
        api.delete(`/livros/${id}`)
            .then(res=>{
                this.setState({
                    modal: !this.state.modal,
                    idBook: null
                });
                NotificationManager.success('Exclusão realizada!', 'Sucessso', 2000);
                this.loadBooks();
            })
            .catch(err =>{
                console.log(err)
            });
    }
    
    listBooks = ()=>{
        return this.state.book.map((object, i)=>{
            return (
                <tr key={i} >
                    <td>{ object.titulo }</td>
                    <td>{ object.autor }</td>
                    <td>{ object.ano }</td>
                    <td>            
                        <Link className="btn btn-outline-mdb-color btn-sm d-inline" to={"/admin/editar/"+object._id}>
                            <MDBIcon icon="edit" />
                        </Link>
                    </td>
                    <td>      
                        <MDBBtn tag="a" outline size="sm" role="button" color="deep-orange" onClick={this.toggle(object._id)} >
                            <MDBIcon icon="trash-alt" />
                        </MDBBtn>
                    </td>
                </tr>
            );
        });
    }

    render() {
      return (        
        <div>
            <MDBContainer className="mt-5 text-center"> 
                <MDBRow>
                    <MDBCol>
                        <h4 className="grey-text">
                            <strong className="font-weight-bold">Lista de Livros</strong>
                        </h4>
                        <hr className="my-3" />
                        <MDBJumbotron>
                            <MDBCardBody>
                                <MDBTable responsive small>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Autor</th>
                                            <th>Ano</th>
                                            <th>Editar</th>
                                            <th>Deletar</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        { this.listBooks() }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(null)} size="sm">
                    <MDBModalHeader toggle={this.toggle(null)}>Deletar</MDBModalHeader>
                    <MDBModalBody>
                        Confirmar operação?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" size="sm" onClick={ this.toggle(null) }>Fechar</MDBBtn>
                        <MDBBtn color="danger" size="sm" onClick={ this.deleteBook } >Deletar</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <NotificationContainer/>
        </div>
      );
    }
}