import blackIcon from '../images/marker-icon-black.png'
import blueIcon from '../images/marker-icon-blue.png'
import greenIcon from '../images/marker-icon-green.png'
import greyIcon from '../images/marker-icon-grey.png'
import redIcon from '../images/marker-icon-red.png'
import yellowIcon from '../images/marker-icon-yellow.png'

export default function exportIcon(index)
{
    const iconArry = [blackIcon,blueIcon,greenIcon,greyIcon,redIcon,yellowIcon]
    return iconArry[index]
}

