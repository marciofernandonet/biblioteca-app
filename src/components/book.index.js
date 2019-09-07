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
    MDBTableHead
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

    delete = event => {
        let confirm = window.confirm('Confirmar?');
        if(confirm){
            api.delete('/livros/'+event.target.value)
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
                        <Link to={"/admin/editar/"+object._id}>Editar</Link>
                    </td>
                    <td>      
                        <button className="btn btn-outline-primary btn-rounded waves-effect btn-sm" value={object._id} onClick={this.delete} >Deletar</button>
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