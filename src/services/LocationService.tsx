import {Geolocation, Position} from "@capacitor/geolocation";

export const getLocation = async (): Promise<Position | boolean> => {
    const isActivated = await ensureAuthorization();
   try {
       return await Geolocation.getCurrentPosition();
   } catch(e: any) {
       return isActivated;
   }
}

const ensureAuthorization = async (): Promise<boolean> => {
    return Geolocation.checkPermissions().then((permissionStatus): Promise<boolean> | boolean => {
        return permissionStatus.location !== 'granted' ? Geolocation.requestPermissions({
            permissions: ['location']
        }).then((permissionStatus) => {
            return permissionStatus.location === "granted";
        }) : true
    })
}