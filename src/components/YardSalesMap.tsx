
import styled from 'styled-components'
import Map, { Marker, Popup } from 'react-map-gl';
import { MAPBOX_TOKEN } from '../env'
import { useEffect, useState } from 'react';
import { IYardSaleProfile } from '../interfaces/yardsale';
import { api } from '../services/api';
import YardSalesSelectedPopup from './YardSalesSelectedPopup';
import { ILocation } from '../interfaces/location';



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
    location: ILocation
}

function YardSalesMap({ location }: Props) {
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
                Longitude: {location.longitude} | Latitude: {location.latitude}
            </SidebarDiv>
            <StyledMap
                reuseMaps
                initialViewState={{
                    ...location,
                    zoom: 14
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {/* YOU ARE HERE */}
                <Marker latitude={location.latitude} longitude={location.longitude} color="red" />

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
                {selectedYardsale && YardSalesSelectedPopup({ selectedYardsale, setSelectedYardsale })}
            </StyledMap>
        </>
    )
}

export default YardSalesMap