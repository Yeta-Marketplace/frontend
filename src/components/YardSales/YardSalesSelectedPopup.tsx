import { Popup } from 'react-map-gl';
import { IYardSale } from '../../interfaces/yardsale'

type Props = {
    selectedYardsale: IYardSale,
    setSelectedYardsale: Function
}

function YardSalesSelectedPopup({ selectedYardsale, setSelectedYardsale }: Props) {
    return (
        <Popup
            latitude={selectedYardsale.latitude}
            longitude={selectedYardsale.longitude}
            closeOnClick={false} // TODO: This definitely needs to be looked at
            onClose={() => setSelectedYardsale(null)}
        >
            <div>
                <h2>{selectedYardsale.description}</h2>
                <p>Start Date: {selectedYardsale.start_date.toString()}</p>
                <p>End Date: {selectedYardsale.end_date.toString()}</p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.google.com/maps/search/?api=1&query=" + selectedYardsale.latitude.toString() + "%2C" + selectedYardsale.longitude.toString()}
                >
                    Open in Google Maps
                </a>
            </div>
        </Popup>
    )
}

export default YardSalesSelectedPopup