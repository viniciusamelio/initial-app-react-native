import { container } from "tsyringe";
import AxiosHttpService from "./services/axiosHttpService";
import { DefaultAddressService } from "../contexts/address/addressService";
import ExpoImageService from "./services/expoImageService";
import { DefaultImagePickerController } from "./controllers/imagePickerController";
const injections = async () => {
    container.registerInstance('ImagePickerService', new ExpoImageService());
    container.registerInstance('HttpService', new AxiosHttpService());
    container.registerInstance('AddressService', new DefaultAddressService(container.resolve('HttpService'))); 
    container.registerInstance('ImagePickerController', new DefaultImagePickerController(container.resolve('ImagePickerService')));
}


export {injections};