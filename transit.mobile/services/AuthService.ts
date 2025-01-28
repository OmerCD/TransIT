import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {ApiService} from "./ApiService";
import {LoginResponseModel} from "../models/login-response-model";
import {BadRequestResponseModel} from "../models/bad-request-response-model";
import {LoginRequestModel} from "../models/login-request-model";
import {RegisterRequestModel} from "../models/register-request-model";
import {RegisterResponseModel} from "../models/register-response-model";

export interface AuthError {
    error: any;
    msg: string;
}

export class AuthService extends ApiService {
    createAuthAxiosClient(): AxiosInstance {
        const newAxiosClient = axios.create({
            baseURL: this.baseUrl + `/authentication`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        newAxiosClient.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 400){
                    const errorMessage = error.response.data as BadRequestResponseModel;
                    alert(errorMessage.errors[0]);
                }
            }
        );
        
        return newAxiosClient;
    }

    async login(username: string, password: string): Promise<LoginResponseModel | AuthError> {
        const authAxiosClient = this.createAuthAxiosClient();
        let response;
        try {
            response =
                await authAxiosClient.post<LoginResponseModel, AxiosResponse<LoginResponseModel | BadRequestResponseModel>, LoginRequestModel>('/login',
                    {
                        email: username,
                        password,
                    });
        }
        catch (e) {
            const error = e as AxiosError<BadRequestResponseModel>;
            response = error.response;
        }
        if (response && response.status === 400) {
            const badRequestResponse = response.data as BadRequestResponseModel;
            console.log(badRequestResponse);
            return {error: badRequestResponse.errors, msg: badRequestResponse.message};
        }
        
        const data = response!.data as LoginResponseModel;
        if (response!.status === 200) {
            this.setToken(data.token);
        }

        return data;
    }

    async register(info: RegisterRequestModel): Promise<RegisterResponseModel | AuthError> {
        const authAxiosClient = this.createAuthAxiosClient();
        let response;
        try {
            response =
                await authAxiosClient.post<RegisterResponseModel, AxiosResponse<RegisterResponseModel | BadRequestResponseModel>, RegisterRequestModel>('/register', info);
        } catch (e) {
            const error = e as AxiosError<BadRequestResponseModel>;
            response = error.response;
        }
        const data = response!.data;
        if (response!.status === 400) {
            const badRequestResponse = response!.data as BadRequestResponseModel;
            console.log(badRequestResponse);
            return {error: badRequestResponse.errors, msg: badRequestResponse.message};
        }

        return data as RegisterResponseModel;
    }

    logout() {
        this.axiosClient.defaults.headers['Authorization'] = '';
    }

    setToken(token: string) {
        this.axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    
    getAxiosClient() {
        return this.axiosClient;
    }
}

export const CheckAuthError = (error: any) => "error" in error;

const authService = new AuthService('http://192.168.0.46:5157/api');
export const useAuthService = () => authService;