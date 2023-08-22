import { ImagePickerService, PickedImageDto } from "../protocols/imagePickerService";

import * as ImagePicker from "expo-image-picker";

export default class ExpoImageService implements ImagePickerService{
    pickImage = async () : Promise <PickedImageDto|undefined>  => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
      
        if (!result.canceled && result.assets.length > 0) {
          return {
                uri: result.assets[0].uri
          }
        }
    }

}