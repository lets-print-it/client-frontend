import React, { useEffect, useRef, useState } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { BottomSheet } from "react-spring-bottom-sheet";
import PrinterBottomSheet from "./PrinterBottomSheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useLoaderData } from "react-router-dom";
import { getLocations } from "./api/printit";

export async function load() {
  return getLocations();
}

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

function PrintersMap() {
  const [selectedPrinterAndLocation, setSelectedPrinterAndLocation] = useState({
    printer: null,
    location: null,
  });
  const [bottomSheet, setBottomSheet] = useState(false);
  const [userLocation, setUserLocation] = useState([55.75, 37.57]);
  const [zoom, setZoom] = useState(9);

  const mapRef = useRef(null);

  const locations = useLoaderData();

  const getAndSetUserLocation = async () => {
    try {
      let loc = await getUserLocation();
      setUserLocation(loc);
      setZoom(16);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAndSetUserLocation();
  }, []);

  return (
    <>
      <Map
        instanceRef={mapRef}
        width="100%"
        height="100%"
        defaultState={{
          controls: ["zoomControl"],
          center: userLocation,
          zoom: zoom,
        }}
        current={{ center: userLocation, zoom: zoom }}
        modules={["control.ZoomControl"]}
      >
        {locations.map((location) => (
          <Placemark
            geometry={[location.latitude, location.longitude]}
            options={{
              preset: "islands#lightBlueIcon",
              iconColor: "#3b82f6",
            }}
            onClick={() => {
              setSelectedPrinterAndLocation({
                printer: location.printers[0],
                location: location,
              });
              setBottomSheet(true);
            }}
          />
        ))}
      </Map>
      <div className="fixed bottom-0 left-1/2 mb-14 -translate-x-1/2">
        <button className="h-12 w-32 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Print It!
        </button>
      </div>
      <div className="max-w-lg">
        <BottomSheet open={bottomSheet} onDismiss={() => setBottomSheet(false)}>
          <PrinterBottomSheet
            printer={selectedPrinterAndLocation.printer}
            location={selectedPrinterAndLocation.location}
          />
        </BottomSheet>
      </div>
    </>
  );
}

export default PrintersMap;
