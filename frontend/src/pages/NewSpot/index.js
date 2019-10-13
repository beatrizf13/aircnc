import React, { useState, useMemo } from 'react';
import api from '~/services/api';

import Container from './styles';
import cam from '~/assets/img/cam.svg';

export default function NewSpot({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: {
        user_id,
      },
    });

    history.push('/dashboard');
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label
          id="thumbnail"
          htmlFor="file"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? 'has-thumbnail' : ''}
        >
          <input
            type="file"
            id="file"
            onChange={event => {
              setThumbnail(event.target.files[0]);
            }}
            required
          />
          <img src={cam} alt="Send" />
        </label>

        <label htmlFor="company">
          Company
          <input
            id="company"
            placeholder="Your awesome company"
            value={company}
            onChange={event => setCompany(event.target.value)}
            required
          />
        </label>

        <label htmlFor="techs">
          Techs <span>(comma separated)</span>
          <input
            id="techs"
            placeholder="What technologies use?"
            value={techs}
            onChange={event => setTechs(event.target.value)}
            required
          />
        </label>

        <label htmlFor="company">
          Daily Rate <span>(blank to free)</span>
          <input
            id="price"
            placeholder="$"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
        </label>

        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </Container>
  );
}
