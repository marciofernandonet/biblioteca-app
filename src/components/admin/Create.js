import React from "react";
import api from '../../services/api';
import { MDBRow, MDBCol, MDBBtn, MDBContainer, MDBCard, MDBCardBody } from "mdbreact";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class BookCreate extends React.Component 
{  
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            autor: '',
            ano:''
        };
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    validateForm = () =>{
        const { titulo, autor, ano } = this.state;
        if(titulo && autor && ano) return true;
        return false;
    }

    handleChange = event =>{
        event.preventDefault();
        if(!this.validateForm()){
            event.target.className += " was-validated";
        }
        else
        {
            event.target.className = "needs-validation "
            const obj = {
                titulo: this.state.titulo,
                autor: this.state.autor,
                ano: this.state.ano
            };

            api.post('/livros', obj)
                .then(res=>{
                    NotificationManager.success('Cadastro realizado!', 'Sucessso', 2000);
                    this.setState({
                        titulo: '',
                        autor: '',
                        ano: ''
                    });
                })
                .catch(err=>{
                    NotificationManager.error('Erro ao cadastrar!', 'Erro', 2000);
                    console.log(err);
                });
        }       
    } 

    render() {
        return (
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="mx-auto col-sm-4">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBCard>
                                        <MDBCardBody>
                                            <form
                                            className="needs-validation"
                                            onSubmit={this.handleChange}
                                            noValidate
                                            >
                                            <p className="h4 text-center py-3">Adicionar Livro</p>
                                            <MDBRow>
                                                <MDBCol md="12" className="mb-3">
                                                <label
                                                    htmlFor="defaultFormRegisterTitle"
                                                    className="grey-text"
                                                >
                                                    Título
                                                </label>
                                                <input
                                                    value={this.state.titulo}
                                                    name="titulo"
                                                    onChange={this.changeHandler}
                                                    type="text"
                                                    id="defaultFormRegisterTitle"
                                                    className="form-control"
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Preencha este campo!
                                                </div>
                                                </MDBCol>
                                                <MDBCol md="12" className="mb-3">
                                                <label
                                                    htmlFor="defaultFormRegisterAuthor"
                                                    className="grey-text"
                                                >
                                                Autor
                                                </label>
                                                <input
                                                    value={this.state.autor}
                                                    name="autor"
                                                    onChange={this.changeHandler}
                                                    type="text"
                                                    id="defaultFormRegisterAuthor"
                                                    className="form-control"
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Preencha este campo!
                                                </div>
                                                </MDBCol>

                                                <MDBCol md="12" className="mb-3">
                                                <label
                                                    htmlFor="defaultFormRegisterYear"
                                                    className="grey-text"
                                                >
                                                    Ano
                                                </label>
                                                <input
                                                    value={this.state.ano}
                                                    name="ano"
                                                    onChange={this.changeHandler}
                                                    type="text"
                                                    id="defaultFormRegisterYear"
                                                    className="form-control"
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Preencha este campo!
                                                </div>
                                                </MDBCol>
                                            </MDBRow>         
                                            <MDBBtn color="primary" type="submit">
                                                Adicionar
                                            </MDBBtn>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}