import React, { FormEvent, useCallback, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ButtonsWrapper, Container, Form, Header } from './styles';

import frogImg from '../../../assets/frog.png';

import { useAuth } from '../../../hooks/auth';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        await signIn({
          email,
          password,
        });
      } catch (err) {
        alert('Falha na autenticação.');
      }
    },
    [email, password, signIn],
  );

  return (
    <Container>
      <Header>
        <div>
          <h1>Teste do sofá</h1>
          <strong>Garantindo o seu conforto</strong>
          <p>
            Ajudamos pessoas a se sentirem confortáveis em seus momentos de
            lazer e descanso.
          </p>
        </div>
        <img src={frogImg} alt="couch_image" />
      </Header>

      <Form onSubmit={handleSubmit}>
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
            <div className="button-text">Entrar</div>
          </button>

          <Link to="signup">
            <div className="button-icon">
              <FiLogIn size={24} color="#fff" />
            </div>
            <div className="button-text">Cadastrar</div>
          </Link>
        </ButtonsWrapper>
      </Form>
    </Container>
  );
};

export default SignIn;
