import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../apis/api';
import couchApi from '../../../apis/couchApi';
import LoadingPage from '../../../components/LoadingPage';
import { useAuth } from '../../../hooks/auth';

import { Container, Couch, Header, HeaderOption } from './styles';

interface IRatingsApiResponse {
  id: string;
  rating: number;
  user_id: string;
  couch_id: string;
  created_at: Date;
  updated_at: Date;
}

interface ICouchApiResponse {
  id: string;
  modelo: string;
  urlImagem: string;
  numeroDeAssentos: number;
  largura: number;
  altura: number;
  comprimento: number;
}

const Rating: React.FC = () => {
  const { location } = useHistory();

  const { signOut, user } = useAuth();

  const [ratings, setRatings] = useState<IRatingsApiResponse[]>([]);
  const [couchs, setCouchs] = useState<ICouchApiResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadRatings() {
      const { data } = await api.get<IRatingsApiResponse[]>('/ratings');

      setRatings(data);
    }

    loadRatings();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    async function loadCouchs() {
      const { data } = await couchApi.get<ICouchApiResponse[]>('');

      const ratedCouchsId = ratings.map((rating) => rating.couch_id);

      const parsedCouchs = data.filter((couch) =>
        ratedCouchsId.includes(couch.id),
      );

      setCouchs(parsedCouchs);
    }

    loadCouchs();
    setLoading(false);
  }, [ratings]);

  return (
    <Container>
      <Header>
        <div>
          <HeaderOption
            active={location.pathname === '/Dashboard' ? 1 : 0}
            to="/Dashboard"
          >
            <span>Home</span>
          </HeaderOption>
          <HeaderOption
            active={location.pathname === '/Rating' ? 1 : 0}
            to="/Rating"
          >
            <span>Avaliações</span>
          </HeaderOption>
        </div>
        <button type="button" onClick={() => signOut()}>
          Sair
        </button>
      </Header>

      <strong className="rating-counter">{`Total de avaliações realizadas: ${ratings.length}`}</strong>

      {(!loading &&
        couchs.map((couch) => (
          <Couch key={couch.id}>
            <div>
              <img src={couch.urlImagem} alt="couch_image" />
            </div>

            <div className="couch-info">
              <strong>{couch.modelo}</strong>
              <span>{`Assentos: ${couch.numeroDeAssentos}`}</span>
              <span>{`Comprimento: ${couch.comprimento}m`}</span>
              <span>{`Largura: ${couch.largura}m`}</span>
              <span>{`Altura: ${couch.altura}m`}</span>
            </div>

            <div className="approver-info">
              <strong>Avaliador:</strong>
              <strong>{user.name}</strong>
            </div>
          </Couch>
        ))) || <LoadingPage />}
    </Container>
  );
};

export default Rating;