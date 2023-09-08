import {Geolocation, Geoposition} from "@ionic-native/geolocation";

export const getLocation = async () => {

    const authorization = Geolocation
    console.log(authorization)

   try {
       const position: Geoposition = await Geolocation.getCurrentPosition()
       return position
   } catch(e: any) {
       console.log(e.message)
   }
}