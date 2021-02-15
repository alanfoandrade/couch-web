import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../apis/api';
import couchApi from '../../../apis/couchApi';
import LoadingPage from '../../../components/LoadingPage';
import { useAuth } from '../../../hooks/auth';

import { Container, Couch, Header, HeaderOption, RatingButton } from './styles';

interface IRatingsApiResponse {
  id: string;
  rating: number;
  user_id: string;
  couch_id: string;
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

interface ICouch {
  id: string;
  modelo: string;
  urlImagem: string;
  numeroDeAssentos: number;
  largura: number;
  altura: number;
  comprimento: number;
  rating?: IRatingsApiResponse;
}

const Dashboard: React.FC = () => {
  const { location } = useHistory();

  const { signOut, user } = useAuth();

  const [ratings, setRatings] = useState<IRatingsApiResponse[]>([]);
  const [couchs, setCouchs] = useState<ICouch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRatings() {
      const { data } = await api.get<IRatingsApiResponse[]>('/ratings');

      setRatings(data);
    }

    loadRatings();
  }, []);

  useEffect(() => {
    async function loadCouchs() {
      const { data } = await couchApi.get<ICouchApiResponse[]>('');

      const parsedCouchs = data.map((couch) => ({
        ...couch,
        comprimento: couch.comprimento / 100,
        largura: couch.largura / 100,
        altura: couch.altura / 100,
        rating: ratings.find(
          (rating) =>
            rating.couch_id === couch.id && rating.user_id === user.id,
        ),
      }));

      setCouchs(parsedCouchs);
    }

    loadCouchs();
  }, [ratings, user.id]);

  const handleApproved = useCallback(async (couch: ICouch) => {
    setLoading(true);
    if (!couch.rating) {
      const { data } = await api.post<IRatingsApiResponse>('/ratings', {
        couch_id: couch.id,
        rating: 1,
      });

      setRatings((prevState) => [...prevState, { ...data }]);
    } else {
      const { data } = await api.put<IRatingsApiResponse>(
        `/ratings/${couch.rating.id}`,
        {
          couch_id: couch.id,
          rating: couch.rating.rating === 1 ? 0 : 1,
        },
      );

      setRatings((prevState) =>
        prevState.map((stateRating) =>
          stateRating.id === data.id
            ? { ...stateRating, ...data }
            : stateRating,
        ),
      );
    }
    setLoading(false);
  }, []);

  console.log(ratings);

  const handleDisapproved = useCallback(async (couch: ICouch) => {
    setLoading(true);
    if (!couch.rating) {
      const { data } = await api.post<IRatingsApiResponse>('/ratings', {
        couch_id: couch.id,
        rating: 2,
      });

      setRatings((prevState) => [...prevState, { ...data }]);
    } else {
      const { data } = await api.put<IRatingsApiResponse>(
        `/ratings/${couch.rating.id}`,
        {
          couch_id: couch.id,
          rating: couch.rating.rating === 2 ? 0 : 2,
        },
      );

      setRatings((prevState) =>
        prevState.map((stateRating) =>
          stateRating.id === data.id
            ? { ...stateRating, ...data }
            : stateRating,
        ),
      );
    }
    setLoading(false);
  }, []);

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

      {(couchs.length &&
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

            <div>
              <RatingButton
                type="button"
                rating={couch.rating?.rating === 1 ? 1 : 0}
                onClick={() => handleApproved(couch)}
                disabled={loading}
              >
                Aprovado
              </RatingButton>
              <RatingButton
                type="button"
                rating={couch.rating?.rating === 2 ? 2 : 0}
                onClick={() => handleDisapproved(couch)}
                disabled={loading}
              >
                Reprovado
              </RatingButton>
            </div>
          </Couch>
        ))) || <LoadingPage />}
    </Container>
  );
};

export default Dashboard;
