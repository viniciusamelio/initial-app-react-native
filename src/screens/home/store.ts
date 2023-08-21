import { create } from 'zustand'

type AddressForm = {
    cep?: string,
    street?: string,
    district?: string,
    city?: string,
    state?: string,
    country?: string
}

type AddressFormState = {
    address: AddressForm,
    setAddress: (address : AddressForm) => void;
}
export const useAddressStore = create<AddressFormState>((set) => ({
    address : {
        cep: '',
        street: '',
        district: '',
        city: '',
        state: '',
    },
    setAddress: (address: AddressForm) => set((state) => {
        state.address = {
            ...state.address,
            ...address
        }
        return {
            address
        }
    }),
}))


