import {Geolocation} from "@capacitor/geolocation";

export const getLocation = async () => {
    ensureAuthorization()

   try {
       return await Geolocation.getCurrentPosition()
   } catch(e: any) {
       console.log(e.message)
   }
}

const ensureAuthorization = () => {
    Geolocation.checkPermissions().then((permissionStatus) => {
        console.log(permissionStatus)
        permissionStatus.location !== 'granted' && Geolocation.requestPermissions({
            permissions: ['location']
        }).then((permissionStatus) => {
            console.log(permissionStatus)
        })
    })
}