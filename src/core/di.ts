import { container } from "tsyringe";
import AxiosHttpService from "./services/axiosHttpService";
import { DefaultAddressService } from "../contexts/address/addressService";
const injections = async () => {
    container.registerInstance('HttpService', new AxiosHttpService());
    container.registerInstance('AddressService', new DefaultAddressService(container.resolve('HttpService'))); 
}


export {injections};