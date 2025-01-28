import axios, {AxiosInstance} from "axios";
import {BadRequestResponseModel} from "../models/bad-request-response-model";

export class ApiService {
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
        
        this.axiosClient.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 400){
                    const errorMessage = error.response.data as BadRequestResponseModel;
                    alert(errorMessage.errors[0]);
                }
            }
        );
    }
}