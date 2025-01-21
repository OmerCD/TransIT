import axios, {AxiosInstance, AxiosResponse} from "axios";
import {LoginResponseModel} from "../models/login-response-model";
import {BadRequestResponseModel} from "../models/bad-request-response-model";
import {LoginRequestModel} from "../models/login-request-model";
import {ApiService} from "./ApiService";
import {RegisterRequestModel} from "../models/register-request-model";
import {RegisterResponseModel} from "../models/register-response-model";

export class AuthService extends ApiService {
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
        const response =
            await authAxiosClient.post<LoginResponseModel, AxiosResponse<LoginResponseModel | BadRequestResponseModel>, LoginRequestModel>('/login',
                {
                    email: username,
                    password,
                });
        if (response.status === 400) {
            const badRequestResponse = response.data as BadRequestResponseModel;
            console.log(badRequestResponse);
            return null;
        }
        const data = response.data as LoginResponseModel;
        if (response.status === 200) {
            this.axiosClient.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        }

        return data;
    }

    async register(info: RegisterRequestModel): Promise<RegisterResponseModel | null> {
        const authAxiosClient = this.createAuthAxiosClient();
        const response = 
            await authAxiosClient.post<RegisterResponseModel, AxiosResponse<RegisterResponseModel | BadRequestResponseModel>, RegisterRequestModel>('/register', info);
        const data = response.data;
        if (response.status === 400) {
            const badRequestResponse = response.data as BadRequestResponseModel;
            console.log(badRequestResponse);
            return null;
        }
        
        return data as RegisterResponseModel;
    }
}

export const useAuthService = () => new AuthService('http://192.168.0.46:5157/api');