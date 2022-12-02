import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWarehouse as YardSaleIcon,
    faGhost as HalloweenIcon,
    faLemon as LemonadeStandIcon,
    faSackDollar as AuctionIcon,
    // faEllipsis as OtherIcon
} from '@fortawesome/free-solid-svg-icons'

import { blueGrey, blue, purple } from '@mui/material/colors';

export const events = [
    { key: 'yardsales', name: 'Yard Sale', icon: <FontAwesomeIcon icon={YardSaleIcon} size='xl' /> },
    { key: 'auction', name: 'Auction', icon: <FontAwesomeIcon icon={AuctionIcon} size='xl' /> },
    { key: 'lemonade_stands', name: 'Lemonade', icon: <FontAwesomeIcon icon={LemonadeStandIcon} size='xl' /> },
    { key: 'halloween', name: 'Halloween', icon: <FontAwesomeIcon icon={HalloweenIcon} size='xl' /> },
    // { key: 'other', name: 'Other', icon: <FontAwesomeIcon icon={OtherIcon} size='xl' /> },
];

export const times = [
    { key: 'today', name: 'Today', },
    { key: 'this_week', name: 'This Week', },
];


export const timeColors = {
    'past': blueGrey[300],
    'present': '#f66200',  // secondary.man
    'future': purple[600],
}
