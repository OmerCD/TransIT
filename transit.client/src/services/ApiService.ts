import axios, {AxiosInstance, AxiosResponse} from "axios";
import {LoginResponseModel} from "../models/login-response-model";
import {LoginRequestModel} from "../models/login-request-model";

class ApiService {
    protected baseUrl: string;
    protected axiosClient: AxiosInstance;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.axiosClient = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

class AuthService extends ApiService {
    createAuthAxiosClient(): AxiosInstance {
        return axios.create({
            baseURL: this.baseUrl + `/authentication`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async login(username: string, password: string): Promise<LoginResponseModel | null> {
        const authAxiosClient = this.createAuthAxiosClient();
        const response = await authAxiosClient.post<LoginResponseModel, AxiosResponse<LoginResponseModel>, LoginRequestModel>('/login', {
            email: username,
            password,
        });

        if (response.status === 200) {
            this.axiosClient.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
        }

        return response.data;
    }
}

export const useAuthService = () => new AuthService('http://192.168.0.46:5157/api');