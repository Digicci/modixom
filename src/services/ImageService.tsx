// Here a service is created to handle the image upload on the device
// This service is used in the ImageUpload component

import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

export const useImageService = () => {

    // Todo : On aimerait récupérer plus d'infos sur l'image, comme sa taille, son nom, etc...
    const pickImage = async () => {
        ensureGranted()
        try {
            const image = await Camera.getPhoto({
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos,
                presentationStyle: 'popover',
                promptLabelCancel: 'Annuler',
                quality: 100,
            })
            console.log(image)
            return image
        } catch(e) {
            console.log(e)
        }
    }

    const ensureGranted = () => {
        Camera.checkPermissions().then((permissionStatus) => {
            console.log(permissionStatus)
            permissionStatus.photos !== 'granted' && Camera.requestPermissions({
                permissions: ['photos']
            })
        })
    }

    return {
        pickImage
    }
}