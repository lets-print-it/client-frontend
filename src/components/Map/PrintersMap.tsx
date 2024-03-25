import React, { useEffect, useRef, useState } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { BottomSheet } from "react-spring-bottom-sheet";
import PrinterBottomSheet from "./PrinterBottomSheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getLocations, getOrder } from "../../api/printit";
import { getUserLocation } from "../../api/location";
import { Location, Order, Printer } from "../../models/printit";
import { useRecentOrdersStore } from "../../stores/useRecentOrdersStore";
import OrderCard from "../Orders/OrderCard";
import BottomNavigation from "../BottomNavigation";

export async function load(): Promise<Location[]> {
  return await getLocations();
}

function PrintersMap() {
  const [selection, setSelection] = useState<{
    printer: Printer;
    location: Location;
  } | null>(null);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [userLocation, setUserLocation] = useState([55.75, 37.57]);
  const [zoom, setZoom] = useState(9);

  const mapRef = useRef<any>(null);

  const locations = useLoaderData() as Location[];
  const navigate = useNavigate();

  const recentOrderIds = useRecentOrdersStore((state) => state.ordersId);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  function onPrintButtonClick() {
    navigate("/code_enter");
  }

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (revalidator.state === "idle") {
  //       revalidator.revalidate();
  //     }
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  async function getAndSetUserLocation() {
    try {
      let loc = await getUserLocation();
      setUserLocation(loc);
      setZoom(16);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadAndSetLastOrder() {
    if (recentOrderIds.length > 0) {
      setLastOrder(await getOrder(recentOrderIds[0]));
    }
  }

  useEffect(() => {
    getAndSetUserLocation().catch((e) => console.error(e));
    loadAndSetLastOrder();
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
            key={location.id}
            geometry={[location.latitude, location.longitude]}
            options={{
              preset: "islands#lightBlueIcon",
              iconColor: "#3b82f6",
            }}
            onClick={() => {
              setSelection({
                printer: location.printers[0],
                location: location,
              });
              setBottomSheet(true);
            }}
          />
        ))}
      </Map>
      <BottomNavigation />
      {/*<div className="fixed bottom-0 left-1/2 mb-14 -translate-x-1/2">*/}
      {/*  <button*/}
      {/*    className="h-12 w-32 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700"*/}
      {/*    onClick={onPrintButtonClick}*/}
      {/*  >*/}
      {/*    Print it!*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/* recent order floating card at top */}
      {lastOrder && (
        <div className="fixed left-1/2 top-0 mt-3 w-96 -translate-x-1/2 rounded-xl bg-white shadow">
          <OrderCard
            order={lastOrder}
            onClick={() => navigate(`/orders/${lastOrder.id}`)}
          />
        </div>
      )}
      <div className="max-w-lg">
        <BottomSheet open={bottomSheet} onDismiss={() => setBottomSheet(false)}>
          {selection && (
            <PrinterBottomSheet
              printer={selection.printer}
              location={selection.location}
              onPrintButtonClick={onPrintButtonClick}
            />
          )}
        </BottomSheet>
      </div>
    </>
  );
}

export default PrintersMap;
