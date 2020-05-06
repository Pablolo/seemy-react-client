import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_BACKEND_URI,
      withCredentials: true,
    });
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
}

const apiClient = new ApiClient();
export default apiClient;