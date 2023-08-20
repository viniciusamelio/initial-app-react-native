type HttpServiceBaseConfig = {
    baseUrl?: string;
}

interface HttpService{
    init(config? : HttpServiceBaseConfig): Promise<void>;
    get<T>(url: string, headers?: object) : Promise<HttpResponse<T>>;
}

type HttpResponse<T> = {
    statusCode?: number;
    body?: T;
    headers?: Map<string,object>;
}


export { HttpResponse, HttpService, HttpServiceBaseConfig}