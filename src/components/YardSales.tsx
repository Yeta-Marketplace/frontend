
import { useState } from 'react';
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css';
import { heights } from '../styles/heights';
import YardSalesMap from './YardSalesMap';
import { ILocation } from '../interfaces/location';


type Props = {}

const MainDiv = styled.div`
  text-align: center;
  height: ${heights.nonHeaderVH};
`


function YardSales({ }: Props) {
    const [location, setLocation] = useState<ILocation | null>(null);
    const [status, setStatus] = useState<string | null>(null);

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

    return (
        <MainDiv>
            <h1 style={{ 'margin': '0px', 'height': '3%' }}>YardSales</h1>
            {location
                ? <YardSalesMap location={location} />
                : (
                    <>
                        <button onClick={getLocation}>Get My Location</button>
                        {status && <p>Status: {status}</p>}
                    </>
                )
            }
        </MainDiv>
    )
}

export default YardSales