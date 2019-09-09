import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="container">
        <section className="text-center my-12">
            <h2 className="h1-responsive font-weight-bold my-5">
                Página não encontrada
            </h2>
            <p style={{textAlign:"center"}}>
                <Link to="/">Ir para a página inicial</Link>
            </p>
            
        </section>
    </div>
);

export default NotFound;