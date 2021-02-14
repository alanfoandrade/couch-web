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

interface ICouch {
  id: string;
  modelo: string;
  urlImagem: string;
  numeroDeAssentos: number;
  largura: number;
  altura: number;
  comprimento: number;
  rated: boolean;
}

const Dashboard: React.FC = () => {
  const { location } = useHistory();

  const { signOut, user } = useAuth();

  const [ratings, setRatings] = useState<IRatingsApiResponse[]>([]);
  const [couchs, setCouchs] = useState<ICouch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRatings() {
      const { data } = await api.get('/ratings');

      setRatings(data);
    }

    loadRatings();
  }, []);

  useEffect(() => {
    async function loadCouchs() {
      const { data } = await couchApi.get<ICouchApiResponse[]>('');

      const ratedCouchsId = ratings.map((rating) => rating.couch_id);

      const parsedCouchs = data.map((couch) => ({
        ...couch,
        comprimento: couch.comprimento / 100,
        largura: couch.largura / 100,
        altura: couch.altura / 100,
        rated: ratedCouchsId.includes(couch.id),
      }));

      setCouchs(parsedCouchs);
    }

    loadCouchs();
  }, [ratings]);

  const handleRating = useCallback(
    async (couch: ICouch) => {
      if (!couch.rated) {
        try {
          setLoading(true);
          await api.post('/ratings', { couch_id: couch.id, rating: 10 });

          setCouchs((prevState) =>
            prevState.map((stateCouch) =>
              stateCouch.id === couch.id
                ? { ...couch, rated: true }
                : stateCouch,
            ),
          );
        } catch (err) {
          alert('Falha ao atualizar availiação.');
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const findRating = ratings.find(
            (rating) =>
              rating.couch_id === couch.id && rating.user_id === user.id,
          );

          if (findRating) {
            await api.delete(`/ratings/${findRating.id}`);
          }

          setCouchs((prevState) =>
            prevState.map((stateCouch) =>
              stateCouch.id === couch.id
                ? { ...couch, rated: false }
                : stateCouch,
            ),
          );
        } catch (err) {
          alert('Falha ao atualizar availiação.');
        } finally {
          setLoading(false);
        }
      }
    },
    [ratings, user.id],
  );

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

            <RatingButton
              disabled={loading}
              rated={couch.rated}
              type="button"
              onClick={() => handleRating(couch)}
            >
              Aprovado
            </RatingButton>
          </Couch>
        ))) || <LoadingPage />}
    </Container>
  );
};

export default Dashboard;
