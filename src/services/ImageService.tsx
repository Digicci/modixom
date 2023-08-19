// Here a service is created to handle the image upload on the device
// This service is used in the ImageUpload component

import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

export const useImageService = () => {


    const takePicture = async () => {
        return await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        })
    }

    const pickImage = async () => {
        return await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos,
            quality: 100
        })
    }

    return {
        takePicture,
        pickImage
    }
}