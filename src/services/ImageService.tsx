// Here a service is created to handle the image upload on the device
// This service is used in the ImageUpload component

import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

export const useImageService = () => {

    // Todo : On aimerait récupérer plus d'infos sur l'image, comme sa taille, son nom, etc...
    const pickImage = async () => {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 100,
            promptLabelCancel: 'Annuler',
            presentationStyle: 'popover',
            promptLabelPhoto: 'Gallery'
        })
        return image
    }

    return {
        pickImage
    }
}