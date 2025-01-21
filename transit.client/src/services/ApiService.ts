import axios, {AxiosInstance} from "axios";

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
    }
}