import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';

const LoginForm = () => {
  // const [username, setUsername] = React.useState('');
  // const [password, setPassword] = React.useState('');

  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
  }, []);

  // console.log(password.value);

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   if (username.validate() && password.validate()) {
  //     const { url, options } = TOKEN_POST({
  //       username: username.value,
  //       password: password.value,
  //     });

  //     fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       // body: JSON.stringify({ username, password }),
  //       body: JSON.stringify(),
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         return response.json();
  //       })
  //       .then((json) => {
  //         console.log(json);
  //       });
  //   }
  // }

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    // console.log(json);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      const response = await fetch(url, options);
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      getUser(json.token);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button>Log in</Button>
      </form>
      <Link to="/login/create">Register</Link>
    </section>
  );
};

export default LoginForm;
