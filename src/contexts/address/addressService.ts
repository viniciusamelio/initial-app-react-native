/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseException } from "../../core/exceptions/exceptions";
import { HttpService } from "../../core/protocols/protocols";
import {AddressDto} from "./address";

interface AddressService{
    get(cep: string) : Promise<AddressDto|BaseException>
}

class DefaultAddressService implements AddressService{

    constructor(private httpClient : HttpService){}

    async get(cep: string): Promise<AddressDto | BaseException> {
        try {
            const addressOrError = await this.httpClient.get<AddressDto>("https://viacep.com.br/ws/" + cep.replaceAll("-", "").replaceAll(".", "") + "/json/");
            const data : any = addressOrError.body;
            return {
                street : data.logradouro,
                city : data.localidade,
                state : data.uf,
                country : "BR",
            };
        } catch (error) {
            return new BaseException(
                 "CEP não encontrado",
                error,
            );
        }
    }

}


export { AddressService, DefaultAddressService};