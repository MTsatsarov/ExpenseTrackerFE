import { useEffect, useMemo, useState } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import styles from './GoogleMaps.module.css';

interface IGoogleMapsProps {
	getStore: Function
}

const GoogleMaps = (props: IGoogleMapsProps) => {
	const key = 'AIzaSyBxwKuEue-m3aHKReAygzEMqWjXUfFu4Cw';
	const { isLoaded } = useLoadScript({ googleMapsApiKey: key })

	const [latitute, setLatite] = useState<number>(42)
	const [longitute, setLongitute] = useState<number>(27)
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLatite(position.coords.latitude)
			setLongitute(position.coords.longitude)
		})
	}, [])

	const click = async (e: any) => {
		var locationName;
		setTimeout(() => {
			locationName = document.getElementsByClassName("title full-width")[0]
			props.getStore(locationName.textContent)
		}, 100)
	}
	if (!isLoaded) return <h2>WROOOOOOOOOOOOONG</h2>;
	return (
		<GoogleMap zoom={16} center={{ lat: latitute, lng: longitute }} mapContainerClassName={styles.mapContainer} onClick={(e) => click(e)} ><Marker position={{ lat: latitute, lng: longitute }} /></GoogleMap>
	)
}


export default GoogleMaps