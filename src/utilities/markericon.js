import blackIcon from '../images/marker-icon-black.png'
import blueIcon from '../images/marker-icon-blue.png'
import greenIcon from '../images/marker-icon-green.png'
import greyIcon from '../images/marker-icon-grey.png'
import redIcon from '../images/marker-icon-red.png'
import yellowIcon from '../images/marker-icon-yellow.png'
import orangeIcon from '../images/marker-icon-orange.png'
import violetIcon from '../images/marker-icon-violet.png'
import goldIcon from '../images/marker-icon-gold.png'
import homeIcon from '../images/home.png'
import cctvIcon from '../images/cctv.png'
import atmIcon from '../images/atm.png'
import footIcon from '../images/footprint.png'



export  function exportIcon(index)
{
        const greendot ='http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        const bluedot = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        const reddot = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        const iconArry = [blackIcon,blueIcon,greenIcon,greyIcon,redIcon,yellowIcon,orangeIcon,violetIcon,goldIcon,greendot,bluedot,reddot]
        return iconArry[index]
}

export function exportETC(type){
    let returnType
    switch (type) {
        case 'home':
            returnType = homeIcon
            break;
        case 'camera':
            returnType = cctvIcon
            break;
        case 'atm':
            returnType = atmIcon
            break;
        default:
            returnType = footIcon
            break;
    }
    return returnType
}