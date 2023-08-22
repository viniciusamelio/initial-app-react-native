import { ImagePickerService, PickedImageDto } from "../protocols/imagePickerService";

export interface ImagePickerController{
    pickImage: () => Promise<PickedImageDto | undefined>;
}

export class DefaultImagePickerController implements ImagePickerController{
    constructor(private imagePickerService: ImagePickerService) {}
    pickImage = async() =>{
        const result = await this.imagePickerService.pickImage();
        return result;
    };
}