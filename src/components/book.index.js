import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
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
    MDBIcon
}from "mdbreact";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { book: [] };
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

    delete = (id) => {
        let confirm = window.confirm('Confirmar?');
        if(confirm){
            api.delete(`/livros/${id}`)
                .then(res=>{
                    this.loadBooks();
                })
                .catch(err => console.log(err))
        }
    } 

    listBooks = ()=>{
        return this.state.book.map((object, i)=>{
            return (
                <tr key={i} >
                    <td>{ object.titulo }</td>
                    <td>{ object.autor }</td>
                    <td>{ object.ano }</td>
                    <td>            
                        <Link tag="a" className="nav-link Ripple-parent btn btn-outline-mdb-color btn-sm d-inline"  to={"/admin/editar/"+object._id}>
                            edit <MDBIcon icon="edit" className="mr-1" />
                        </Link>
                    </td>
                    <td>      
                        <MDBBtn tag="a" outline size="sm" color="deep-orange" onClick={()=>{this.delete(object._id)}} >
                            del <MDBIcon icon="trash-alt" className="mr-1" />
                        </MDBBtn>
                    </td>
                </tr>
            );
        });
    }

    render() {
      return (
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
        </MDBContainer>
      );
    }
}