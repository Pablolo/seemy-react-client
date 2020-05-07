import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  signup(body) {
    console.log('llega a signup')
    return this.apiClient.post('/signup', body);
  }

  login(body) {
    return this.apiClient.post('/login', body);
  }

  logout() {
    return this.apiClient.get('/logout');
  }

  whoami() {
    return this.apiClient.get('/whoami');
  }

  getProtected() {
    return this.apiClient.get("/protected");
  }

  test() {
    return this.apiClient.get('/test');
  }
}

const apiClient = new ApiClient();
export default apiClient;