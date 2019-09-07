import React, { Component } from 'react';
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
    MDBNavbar, 
    MDBNavbarBrand,
    MDBBtn, MDBModal, 
    MDBModalBody, 
    MDBModalHeader, 
    MDBModalFooter,
    MDBInputGroup
} from "mdbreact";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            book: [], 
            book_id: null,
            book_title: null,
            modal: false 
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

    eModal = (id, title) => () => {
        this.setState({ 
            modal: !this.state.modal,
            book_id: id,
            book_title: title 
        });
    }

    listBooks = () => {
        return this.state.book.map((object, i)=>{
            return (
                <tr key={i} >
                    <td>{ object.titulo }</td>
                    <td>{ object.autor }</td>
                    <td>{ object.ano }</td>
                    <td>    
                        <button className="btn btn-outline-primary btn-rounded waves-effect btn-sm"  onClick={this.eModal(object._id, object.titulo)} >Avaliar</button>
                    </td>
                </tr>
            );
        });
    }

    modal = () => { 
        return(
            <MDBModal isOpen={this.state.modal} toggle={this.eModal()}>
                <MDBModalHeader toggle={this.eModal()}>Avalie</MDBModalHeader>
                <MDBModalBody>
                    {`Livro: ${ this.state.book_title || '' }`}
                    <div className="mb-3"></div>
                    <MDBInputGroup
                        containerClassName="mb-3"
                        prepend="Nota"
                        inputs={
                            <select ref="note" className="browser-default custom-select">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        }
                    />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.eModal()}>Fechar</MDBBtn>
                    <MDBBtn onClick={ this.addNote } color="primary">Avaliar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    } 

    addNote = () =>{
        const obj = { nota: this.refs.note.value };
        api.post( `/notas/${this.state.book_id}`, obj)
            .then(
                this.setState({ 
                    modal: !this.state.modal 
                })
            ).catch(err=>{
                console.log(err);
            });
    }

    render() {
      return (
        <div>
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                    Avaliar Livros
                </MDBNavbarBrand>
            </MDBNavbar>
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
                                            <th>Avaliar</th>
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
            { this.modal() }
        </div>
      );
    }
}