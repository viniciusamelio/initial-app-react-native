export type PickedImageDto = {
    uri: string,
    name?: string|undefined
}

export interface ImagePickerService{ 
    pickImage: () => Promise<PickedImageDto|undefined>
}