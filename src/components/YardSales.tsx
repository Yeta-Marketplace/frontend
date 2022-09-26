
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import 'mapbox-gl/dist/mapbox-gl.css';

import { heights } from '../styles/heights';
import YardSalesMap from './YardSalesMap';
import { ILocation } from '../interfaces/location';
import YardSaleHeader from './YardSalesHeader';
import YardSalesCreate from './YardSalesCreate';

type Props = {
    signedIn: boolean
}


function YardSales({ signedIn }: Props) {
    const [location, setLocation] = useState<ILocation | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [showCreateFrom, setShowCreateForm] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            }, () => {
                setStatus('Unable to retrieve your location');
            },
                { enableHighAccuracy: true } // might slow things down
            );
        }
    }

    useEffect(() => {
        if (!location) {
            getLocation();
        }
    })

    const mapColumns = (showCreateFrom ? 6 : 12);
    const headerHeight = 10;
    const bodyHeight = 100 - headerHeight;

    return (
        <Grid container sx={{ height: heights.nonHeaderVH }} rowSpacing={0}>
            <Grid xs={12} sx={{ height: `${headerHeight}%`, }}>
                <YardSaleHeader isLocated={!!location} showCreateFrom={showCreateFrom} setShowCreateForm={setShowCreateForm} />
            </Grid>
            <Grid xs={mapColumns} sx={{ height: `${bodyHeight}%` }}>
                {location
                    ? <YardSalesMap location={location} setLocation={setLocation} />
                    : (
                        <>
                            <button onClick={getLocation}>Get My Location</button>
                            {status && <p>Status: {status}</p>}
                        </>
                    )
                }
            </Grid>
            {showCreateFrom && location && (
                <Grid xs={12 - mapColumns} sx={{ height: `${bodyHeight}%` }}>
                    <YardSalesCreate location={location} />
                </Grid>
            )}
        </Grid >
    )
}

export default YardSales