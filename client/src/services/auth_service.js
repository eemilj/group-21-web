import { Api } from '@/Api'

const API_URL = '/users/'

class AuthService {
  login(user) {
    return Api
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return Api.post(API_URL, {
      username: user.username,
      password: user.password
    })
  }
}

export default new AuthService()
