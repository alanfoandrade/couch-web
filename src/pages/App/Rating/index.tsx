import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../apis/api';
import LoadingPage from '../../../components/LoadingPage';
import { useAuth } from '../../../hooks/auth';

import { Container, Header, HeaderOption } from './styles';

interface IRatingsResponse {
  id: string;
  modelo: string;
  urlImagem: string;
  numeroDeAssentos: number;
  largura: number;
  altura: number;
  comprimento: number;
  dataCriacao: string;
  dataAtualizacao: string;
}

const Rating: React.FC = () => {
  const { location } = useHistory();

  const { signOut } = useAuth();

  const [ratings, setRatings] = useState<IRatingsResponse[]>([]);

  useEffect(() => {
    async function loadRatings() {
      const { data } = await api.get('/ratings');

      setRatings(data);
    }

    loadRatings();
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <HeaderOption
            active={location.pathname === '/Dashboard'}
            to="/Dashboard"
          >
            <span>Home</span>
          </HeaderOption>
          <HeaderOption active={location.pathname === '/Rating'} to="/Rating">
            <span>Avaliações</span>
          </HeaderOption>
        </div>
        <button type="button" onClick={() => signOut()}>
          Sair
        </button>
      </Header>

      {(ratings.length && (
        <strong>
          Total de avaliações realizadas:
          {ratings.length}
        </strong>
      )) || <LoadingPage />}
    </Container>
  );
};

export default Rating;
