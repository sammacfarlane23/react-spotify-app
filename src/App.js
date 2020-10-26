import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/App.scss';
import { useConstructor } from './hooks/hooks';
import LoginPage from './components/LoginPage';
import HeaderButtons from './components/HeaderButtons';
import ItemList from './components/ItemList';

const spotifyApi = new SpotifyWebApi();

const App = () => {
  let token = '';
  useConstructor(() => {
    const params = getHashParams();
    token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  });
  const [isTopTracks, setIsTopTracks] = useState(false);
  const [loggedIn] = useState(token ? true : false);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [timeFrameMessage, setTimeFrameMessage] = useState('');

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  const getTopArtists = (timeFrame) => {
    setIsTopTracks(false);
    switch (timeFrame) {
      case 'short_term':
        setTimeFrameMessage('Your Top Artists From Last Four Weeks');
        break;
      case 'medium_term':
        setTimeFrameMessage('Your Top Artists From Last Six Months');
        break;
      case 'long_term':
        setTimeFrameMessage('Your Top Artists of All Time');
        break;
      default:
        setTimeFrameMessage('Top Artists');
    }
    spotifyApi.getMyTopArtists({ time_range: timeFrame }).then(
      (response) => {
        const data = response.items;
        setTopArtists(data);
      },
      () => {
        console.log('unfortunately that request failed');
      }
    );
  };

  const getTopTracks = (timeFrame) => {
    setIsTopTracks(true);
    switch (timeFrame) {
      case 'short_term':
        setTimeFrameMessage('Your Top Tracks From Last Four Weeks');
        break;
      case 'medium_term':
        setTimeFrameMessage('Your Top Tracks From Last Six Months');
        break;
      case 'long_term':
        setTimeFrameMessage('Your Top Tracks of All Time');
        break;
      default:
        setTimeFrameMessage('Top Tracks');
    }
    spotifyApi.getMyTopTracks({ time_range: timeFrame }).then(
      (response) => {
        const data = response.items;
        setTopTracks(data);
      },
      () => {
        console.log('unfortunately that request failed');
      }
    );
  };

  useEffect(() => {
    if (loggedIn) {
      isTopTracks ? getTopTracks('short_term') : getTopArtists('short_term');
    }
  }, []);

  return loggedIn ? (
    <Container>
      <Row className='justify-content-center flex-column'>
        <Col xs={12} md={12} className='py-5'>
          <HeaderButtons
            isTopTracks={isTopTracks}
            getTopTracks={getTopTracks}
            getTopArtists={getTopArtists}
          />
          {timeFrameMessage && <h1 className='my-3'>{timeFrameMessage}</h1>}
          <ItemList topList={isTopTracks ? topTracks : topArtists} />
        </Col>
      </Row>
    </Container>
  ) : (
    <LoginPage />
  );
};

export default App;
