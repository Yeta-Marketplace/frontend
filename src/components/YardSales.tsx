import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

import { heights } from '../styles/heights';
import { ILocation } from '../interfaces/location';
import YardSalesMap from './YardSales/YardSalesMap';
import YardSaleHeader from './YardSales/YardSalesHeader';
import YardSalesCreate from './YardSales/YardSalesCreate';

type Props = {
    signedIn: boolean
}


function YardSales({ signedIn }: Props) {
    const [location, setLocation] = useState<ILocation | null>(null);
    const [lackingPermission, setLackingPermission] = useState(false);
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
                setStatus('Unable to retrieve your location. Please check your permissions');
                setLackingPermission(true);
            },
                // { enableHighAccuracy: true } // might slow things down
            );
        }
    }

    useEffect(() => {
        if (!lackingPermission && !location) {
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
                        <Container >
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <h1>This feature requires access to location (for now)</h1>
                                <Button
                                    onClick={getLocation}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    sx={{ m: 2 }}
                                >
                                    Get My Location
                                </Button>
                                {status && <p>Status: {status}</p>}
                            </Box>
                        </Container>
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