import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";

const LoginForm = () => {

    const username = useForm();
    const password = useForm();

    function handleSubmit(event){
        
        event.preventDefault();

        if(username.validate() && password.validate()){

            fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(),    
            }).then(response => {
                return response.json();    
            }).then((json) => {
                console.log(json);
            });
        
        }
    
    }

    return (
        <section>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <Input label="User" type="text" name="username" {...username} />
                <Input label="Password" type="password" name="password" {...password} />
                <Button>Entrar</Button>
                {/* <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
                <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
                <button>Entrar</button> */}
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    )
};

export default LoginForm;