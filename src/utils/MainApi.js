import { BASE_URL } from '../utils/constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // headers
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    }
  };

  // Проверка ответа сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  // Авторизация
  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Регистрация
  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Аутентификация
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Данные пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Изменение данных пользователя
  updateUserInfo(email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ email, name }),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Добавляем фильмы в избранное
  likeMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country ?? '1',
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        nameEN: movie.nameEN ?? movie.nameRU,
        nameRU: movie.nameRU,
        trailerLink: movie.trailerLink,
        year: movie.year,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Получаем избранные фильмы
  getLikedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Удаляем фильм из избранного
  deleteLikedMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});


export default mainApi;