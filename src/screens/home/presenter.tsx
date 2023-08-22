import Toast from "react-native-root-toast";
import { AddressService } from "../../contexts/address/address";
import { BaseException } from "../../core/exceptions/exceptions";
import { AddressFormState } from "./store";

interface AddressPresenter{
  handleForm : (key: string, value: string) => void;
  handleCep : (value: string)=> Promise<void>;
  store: AddressFormState;
}

export class AddressController implements AddressPresenter {
    constructor(private addressService: AddressService, public store: AddressFormState) { }

    handleForm = (key: string, value: string) => {
        this.store.setAddress({ ...this.store.address, [key]: value });
        if (key == "cep") this.handleCep(value);
    }

    handleCep = async(value: string) => {
        if (value.length == 8) {
            const addressOrError = await this.addressService.get(value);
            if (
              addressOrError instanceof BaseException ||
              addressOrError.city == null ||
              addressOrError.state == null
            ) {
              Toast.show("Endereço não encontrado", {
                duration: Toast.durations.LONG,
                textColor: "#FF2EAB",
              });
              return;
            }
            Toast.show("Endereço encontrado", {
              duration: Toast.durations.SHORT,
              textColor: "#1cffa0",
            });
            this.store.setAddress({
              ...addressOrError,
              country: "BR",
              cep: this.store.address.cep,
            });
          }
    }
}
