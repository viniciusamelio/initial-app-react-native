import {injectable} from "tsyringe";
import { HttpResponse, HttpService, HttpServiceBaseConfig } from "../protocols/protocols";
import * as axios from 'axios';
type AxiosClient = axios.AxiosInstance;

@injectable()
class AxiosHttpService implements HttpService{

    constructor() {
        this.init();
    }
    
    private client !: AxiosClient;
    
    async init(config?: HttpServiceBaseConfig | undefined): Promise<void> {
        this.client = axios.default.create({
            baseURL: config?.baseUrl,
        });
    }
    async get<T>(url: string,headers?: object | undefined): Promise<HttpResponse<T>> {
        
        try {
            const result = await this.client.get(url, {
                headers: axios.AxiosHeaders.from(JSON.stringify(headers)).setContentType("application/json"),
            });
    
            return {
                statusCode: result.status,
                body: result.data as T,
            };
        } catch (error) {
            console.log(error)
            return {}
        }
    }

}

export default AxiosHttpService;