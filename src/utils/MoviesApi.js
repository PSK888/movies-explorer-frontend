const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies' || 'http://localhost:3001';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  // Проверка ответа сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  // Получаем фильмы
  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }
};

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;