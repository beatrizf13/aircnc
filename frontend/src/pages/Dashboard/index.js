import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './styles';

import api from '~/services/api';

export default function Dashboard({ history }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    (async function loadSpots() {
      const user_id = localStorage.getItem('user');

      if (!user_id) {
        history.push('/');
      }

      const response = await api.get('/dashboard', {
        headers: {
          user_id,
        },
      });

      setSpots(response.data);
    })();
  }, [history]);

  return (
    <Container>
      <ul>
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}/day` : 'Free'}</span>
          </li>
        ))}
      </ul>

      <Link to="new-spot">
        <button type="button" className="btn">
          New Spot
        </button>
      </Link>
    </Container>
  );
}
