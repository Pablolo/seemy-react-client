import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  signup(body) {
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

  cars() {
    return this.apiClient.get('/cars');
  }
  
  uniqueCar(id) {
    return this.apiClient.get(`/cars/${id}`);
  }

  addCar(body) {
    return this.apiClient.post('/cars', body)
  }

  getUserCars(id) {
    return this.apiClient.get(`/driver/${id}`);
  }
}

const apiClient = new ApiClient();
export default apiClient;