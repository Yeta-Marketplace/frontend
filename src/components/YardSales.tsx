
import { useState } from 'react';
import styled from 'styled-components'

type Props = {}

const CenterDiv = styled.div`
  text-align: center;
`

function YardSales({ }: Props) {
    const [latitude, setLat] = useState<number | null>(null);
    const [longitude, setLng] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    return (
        <CenterDiv>
            <h1>YardSales</h1>
            <button onClick={getLocation}>Get My Location</button>
            {status && <p>Status: {status}</p>}
            {latitude && <p>Latitude: {latitude}</p>}
            {longitude && <p>Longitude: {longitude}</p>}
        </CenterDiv>
    )
}

export default YardSales