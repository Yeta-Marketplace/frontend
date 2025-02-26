import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWarehouse as YardSaleIcon,
    faSackDollar as AuctionIcon,
    faGhost as HalloweenIcon,
    faLemon as LemonadeStandIcon,
    // faEllipsis as OtherIcon
} from '@fortawesome/free-solid-svg-icons'

import { blueGrey, blue, purple } from '@mui/material/colors';

export const events = [
    { key: 'yardsales', name: 'Yard Sale', icon: <FontAwesomeIcon icon={YardSaleIcon} size='xl' /> },
    { key: 'auction', name: 'Auction', icon: <FontAwesomeIcon icon={AuctionIcon} size='xl' /> },
    // { key: 'lemonade_stands', name: 'Lemonade', icon: <FontAwesomeIcon icon={LemonadeStandIcon} size='xl' /> },
    // { key: 'halloween', name: 'Halloween', icon: <FontAwesomeIcon icon={HalloweenIcon} size='xl' /> },
    // {
    //     key: 'christmas', name: 'Christmas', icon:
    //         <SvgIcon>
    //             <path d="M22.56 11.39C22.36 10.59 21.82 9.85 21.05 9.44L20.63 7.74C21.11 7.58 21.57 7.41 22 7.23V5C20 6.07 16.53 7.03 12 7.03S4 6.07 2 5V7.23C2.43 7.41 2.89 7.58 3.37 7.74L2.95 9.44C2.18 9.85 1.64 10.59 1.44 11.39C.905 13.57 .385 17.31 2.92 17.93C4 18.2 6 17.89 7.27 12.82C7.46 12 7.33 11.12 6.84 10.39L7.26 8.67C8.14 8.81 9.05 8.9 10 8.96V10.74C9.35 11.33 9 12.17 9 13C9 15.24 9.39 19 12 19C13.12 19 15 18.22 15 13C15 12.17 14.65 11.33 14 10.74V8.96C14.95 8.9 15.86 8.81 16.74 8.67L17.16 10.39C16.67 11.12 16.54 12 16.73 12.82C18 17.89 20 18.2 21.08 17.93C23.61 17.31 23.09 13.57 22.56 11.39M5.81 12.47C5.81 12.47 4.74 16.84 3.28 16.5C1.82 16.12 2.9 11.75 2.9 11.75S3.26 10.29 4.71 10.65 5.81 12.47 5.81 12.47M12 17.5C10.5 17.5 10.5 13 10.5 13S10.5 11.5 12 11.5 13.5 13 13.5 13 13.5 17.5 12 17.5M20.72 16.5C19.27 16.84 18.19 12.47 18.19 12.47S17.83 11 19.29 10.65 21.1 11.75 21.1 11.75 22.18 16.12 20.72 16.5Z" />
    //         </SvgIcon>
    // },
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
