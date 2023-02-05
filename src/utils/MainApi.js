const MAIN_URL = 'https://api.filmopoisk.nomoredomains.club' || 'http://localhost:3001';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

class MainApi {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  login(email, password) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  register(email, password, name) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email, name }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  updateUserInfo(email, name) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ email, name }),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  addMovie(data) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId
      }),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  getMovies() {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  deleteMovie(_id) {
    return fetch(`${this._address}/movies/${_id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}

const mainApi = new MainApi({
  address: MAIN_URL,
  headers: HEADERS,
})

export default mainApi;