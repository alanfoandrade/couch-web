import React, { FormEvent, useCallback, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { ButtonsWrapper, Container, Form, Header } from './styles';

import couchImg from '../../../assets/couch_image.png';
import api from '../../../apis/api';

const SignUp: React.FC = () => {
  const { goBack } = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        await api.post('/users', {
          name,
          email,
          password,
        });

        goBack();
      } catch (err) {
        alert('Falha no cadastro.');
      }
    },
    [email, goBack, name, password],
  );

  return (
    <Container>
      <Header>
        <div>
          <h1>Teste do sofá</h1>
          <strong>Faça seu cadastro</strong>
          <p>Cadastre-se e venha desfrutar do melhor conforto.</p>
        </div>
        <img src={couchImg} alt="couch_image" />
      </Header>

      <Form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <ButtonsWrapper>
          <button type="submit">
            <div className="button-icon">
              <FiLogIn size={24} color="#fff" />
            </div>
            <div className="button-text">Cadastrar</div>
          </button>

          <Link to="/">
            <div className="button-text">Voltar para o login</div>
          </Link>
        </ButtonsWrapper>
      </Form>
    </Container>
  );
};

export default SignUp;
