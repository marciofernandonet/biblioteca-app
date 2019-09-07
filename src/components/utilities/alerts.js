import React from 'react'
import { MDBAlert } from 'mdbreact';

const AlertPage = () => ({
    success: <MDBAlert  color="success" >
                Operação realizada com sucesso!
            </MDBAlert>,
    error: <MDBAlert color="danger" >
                Erro ao realizar operação!
            </MDBAlert>
});
  
export default AlertPage;