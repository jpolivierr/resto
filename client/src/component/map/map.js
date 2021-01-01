import React from "react"
import GoogleMapReact from "google-map-react"
// import useSupercluster from "use-supercluster"
import "./map.css"

const Marker = ({ children }) => children

function Map(props) {
  const result = props.addressResult.map((res) => {
    return {
      id: res.id,
      name: res.name,
      address: res.location.address,
      lat: parseFloat(res.location.latitude),
      lng: parseFloat(res.location.longitude),
    }
  })

  return (
    <div
      className="theMap"
      style={{
        height: "100%",
        width: "100%",
        zIndex: "-1",
        borderRadius: "var(--radius)",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{
          lat: result[0].lat,
          lng: result[0].lng,
        }}
        defaultZoom={9}
        yesIWantToUseGoogleMapApiInternals
      >
        {result.map((res) => (
          <Marker key={res.id} lat={res.lat} lng={res.lng}>
            <div className="marker">
              <div className="markerInfo">
                <h3>{res.name}</h3>
                <p>{res.address}</p>
              </div>
            </div>
          </Marker>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default React.memo(Map)
