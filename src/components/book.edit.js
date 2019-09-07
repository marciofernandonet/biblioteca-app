import React, { Component } from 'react';
import api from '../services/api';
import alert from './utilities/alerts';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

export default class BookEdit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            titulo: '',
            autor: '',
            ano:'',
            alertSuc: false
        }
    }

    componentDidMount() {
        api.get(`/livros/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ 
                    titulo: res.data.titulo, 
                    autor: res.data.autor,
                    ano: res.data.ano }
                );
            })
            .catch(err=>{
                console.log(err);
            });
    }

    validateForm = () =>{
        const { titulo, autor, ano } = this.state;
        if(titulo && autor && ano) return true;
        return false;
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = event => {
        event.preventDefault();
        
        if(!this.validateForm()){
            this.setState({ alertSuc: false })
            event.target.className += " was-validated"
        }
        else
        {
            const obj = {
                titulo: this.state.titulo,
                autor: this.state.autor,
                ano: this.state.ano
            };
            
            api.put('/livros/'+this.props.match.params.id, obj)
                .then(
                    this.setState({ alertSuc: true }),
                    event.target.className = "needs-validation"
                ).catch(err=>{
                    console.log(err);
                });
        }
    }   
 
    render() {
        return (
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="mx-auto col-sm-4">
                        { this.state.alertSuc && alert().success }
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Editar Livro</h4>
                            </div>
                            <div className="card-body">
                        
                                <form
                                className="needs-validation"
                                onSubmit={this.handleChange}
                                noValidate
                                >
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
                                    Editar
                                </MDBBtn>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}