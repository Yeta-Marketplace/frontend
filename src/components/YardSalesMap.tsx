
import styled from 'styled-components'
import Map, { Marker, Popup } from 'react-map-gl';
import { MAPBOX_TOKEN } from '../env'
import { useEffect, useState } from 'react';
import { IYardSaleProfile } from '../interfaces/yardsale';
import { api } from '../services/api';


const SidebarDiv = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: '10vh';
    left: '2vw';
    margin: 12px;
    border-radius: 4px;
`

const StyledMap = styled(Map)`
    width: '100vw'; 
    height: '97%';
`


type Props = {
    longitude: number,
    latitude: number
}

function YardSalesMap({ longitude, latitude }: Props) {
    const [yardsales, setYardsales] = useState<IYardSaleProfile[]>([]);
    const [selectedYardsale, setSelectedYardsale] = useState<IYardSaleProfile | null>(null);

    useEffect(() => {
        async function getYardsales() {
            const newYardsales = await api.getYardSales({ skip: 0, limit: 100 }).then(response => response.data);
            setYardsales(newYardsales);
        }
        getYardsales();
    }, []);

    return (
        <>
            <SidebarDiv>
                Longitude: {longitude} | Latitude: {latitude}
                {/* | Zoom: {zoom} */}
            </SidebarDiv>
            <StyledMap
                reuseMaps
                initialViewState={{
                    latitude: latitude,
                    longitude: longitude,
                    zoom: 14
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {/* YOU ARE HERE */}
                <Marker latitude={latitude} longitude={longitude} color="red" />

                {/* YARD SALES AROUND YOU */}
                {yardsales.map(yardsale => (
                    <Marker
                        key={yardsale.id}
                        latitude={yardsale.latitude}
                        longitude={yardsale.longitude}
                        color="blue"
                        onClick={e => {
                            setSelectedYardsale(yardsale);
                        }}
                    />
                ))}

                {/* SELECTED YARD SALE */}
                {selectedYardsale ? (
                    <Popup
                        latitude={selectedYardsale.latitude}
                        longitude={selectedYardsale.longitude}
                        closeOnClick={false} // TODO: This definitely needs to be looked at
                        onClose={() => setSelectedYardsale(null)}
                    >
                        <div>
                            <h2>{selectedYardsale.description}</h2>
                            <h3>Start Date: {selectedYardsale.start_date.toString()}</h3>
                            <h3>End Date: {selectedYardsale.end_date.toString()}</h3>
                        </div>
                    </Popup>
                ) : null}
            </StyledMap>
        </>
    )
}

export default YardSalesMap