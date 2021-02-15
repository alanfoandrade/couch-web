import React, { useEffect, useState } from 'react';

import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';

import api from '../../../apis/api';
import couchApi from '../../../apis/couchApi';
import LoadingPage from '../../../components/LoadingPage';
import { useAuth } from '../../../hooks/auth';

import { Container, Couch, Header, HeaderOption } from './styles';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IRatingsApiResponse {
  id: string;
  rating: number;
  user_id: string;
  couch_id: string;
  updated_at: Date;
  user: IUser;
}

interface IRating extends IRatingsApiResponse {
  rated_at?: string;
  couch?: ICouchApiResponse;
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

  const { signOut } = useAuth();

  const [ratings, setRatings] = useState<IRating[]>([]);
  const [couchs, setCouchs] = useState<ICouchApiResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadCouchs() {
      const { data } = await couchApi.get<ICouchApiResponse[]>('');

      setCouchs(data);
    }

    loadCouchs();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    async function loadRatings() {
      const { data } = await api.get<IRatingsApiResponse[]>('/ratings');

      const filteredRatings = data.filter((rating) => rating.rating !== 0);

      const ratingsPopulated = filteredRatings.map((rating) => ({
        ...rating,
        couch: couchs.find((findCouch) => findCouch.id === rating.couch_id),
        rated_at: rating.updated_at
          ? format(parseISO(String(rating.updated_at)), "dd/MM/yyyy 'às' HH:mm")
          : undefined,
      }));

      setRatings(ratingsPopulated);
    }

    loadRatings();
    setLoading(false);
  }, [couchs]);

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
        ratings.map((rating) => (
          <Couch key={rating.id}>
            <div>
              <img src={rating.couch?.urlImagem} alt="couch_image" />
            </div>

            <div className="couch-info">
              <strong>{rating.couch?.modelo}</strong>
              <span>{`Assentos: ${rating.couch?.numeroDeAssentos}`}</span>
              <span>{`Comprimento: ${rating.couch?.comprimento}m`}</span>
              <span>{`Largura: ${rating.couch?.largura}m`}</span>
              <span>{`Altura: ${rating.couch?.altura}m`}</span>
            </div>

            <div className="approver-info">
              {rating.rating === 1 && <h1>Aprovado</h1>}
              {rating.rating === 2 && (
                <h1 className="disapproved">Reprovado</h1>
              )}
              <strong>Avaliador:</strong>
              <strong>{rating.user.name}</strong>
              <span>{rating.rated_at}</span>
            </div>
          </Couch>
        ))) || <LoadingPage />}
    </Container>
  );
};

export default Rating;
