import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PlaceInfo from "../components/Products/PlaceInfo";
import { fetchMaps } from "../reducks/maps/operations";
import { fetchProducts } from "../reducks/products/operations";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 34.7066033,
  lng: 135.5016253,
};

const Map = () => {
  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchProducts())
      dispatch(fetchMaps())
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDQtkH5Jx5jDxdhfuMHFAGSdDKivP_lzmg'
        // ここにAPIキーを入力します。今回は.envに保存しています。
    });
    
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

return (
    
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
    >
      <PlaceInfo />
    </GoogleMap>
);
};

export default Map;