import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import Container, { RequestContainer } from './styles';

import api from '~/services/api';

export default function Dashboard({ history }) {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: { user_id },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }

  useEffect(() => {
    (async function loadSpots() {
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
  }, [history, user_id]);

  return (
    <>
      <RequestContainer>
        {requests && (
          <ul className="notifications">
            {requests.map(request => (
              <li key={request._id}>
                <p>
                  <strong>{request.user.email}</strong> is requesting a booking
                  in <strong>{request.spot.company}</strong> at date:{' '}
                  <strong>{request.date}</strong>
                </p>
                <button
                  type="button"
                  className="accept"
                  onClick={() => handleAccept(request._id)}
                >
                  accept
                </button>
                <button
                  type="button"
                  className="reject"
                  onClick={() => handleReject(request._id)}
                >
                  reject
                </button>
              </li>
            ))}
          </ul>
        )}
      </RequestContainer>
      <Container>
        {spots && (
          <ul>
            {spots.map(spot => (
              <li key={spot._id}>
                <header
                  style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
                />
                <strong>{spot.company}</strong>
                <span>{spot.price ? `R$ ${spot.price}/day` : 'Free'}</span>
              </li>
            ))}
          </ul>
        )}

        <Link to="new-spot">
          <button type="button" className="btn">
            New Spot
          </button>
        </Link>
      </Container>
    </>
  );
}
