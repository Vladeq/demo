import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useClientSize } from 'hooks';
import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Coords } from 'types/advert';
import { IconButton } from 'ui';

import SvgAdd from '../../../../../public/svg/components/Add';
import SvgMinus from '../../../../../public/svg/components/Minus';
// eslint-disable-next-line no-undef
import MapMouseEvent = google.maps.MapMouseEvent;

type MapTypes = {
  currentMarker: Coords;
  center: Coords;
  onChangeCoordsToDrag: (address: Coords) => void;
  setCenter: (center: Coords) => void;
};

const DEFAULT_ZOOM = 12;

const Map: FC<MapTypes> = ({ setCenter, currentMarker, center, onChangeCoordsToDrag }) => {
  // eslint-disable-next-line no-undef
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const { getIsBreakpoint } = useClientSize();

  // eslint-disable-next-line no-undef
  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const handleCenterChange = useCallback(() => {
    setCenter({
      lat: map?.getCenter()?.lat()!,
      lng: map?.getCenter()?.lng()!,
    });
  }, []);

  const handleZoomChanged = useCallback(() => {
    if (map?.getZoom()) {
      setZoom(map?.getZoom()!);
    }
  }, []);

  const handleDragEnd = (newCoordinates: MapMouseEvent) => {
    onChangeCoordsToDrag({ lat: newCoordinates?.latLng?.lat()!, lng: newCoordinates?.latLng?.lng()! });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY!,
  });

  const isWidthSm = getIsBreakpoint('sm');

  return (
    <MapContainer>
      {isLoaded && (
        <GoogleMap
          zoom={zoom}
          onLoad={onLoad}
          onDragEnd={handleCenterChange}
          onZoomChanged={handleZoomChanged}
          mapContainerStyle={isWidthSm ? mapResponsiveStyles : mapStyles}
          options={{
            fullscreenControl: false,
            panControl: false,
            mapTypeControl: false,
            disableDefaultUI: true,
            keyboardShortcuts: false,
            zoomControl: false,
          }}
          center={{ ...center }}>
          <>
            {currentMarker && (
              <Marker
                draggable
                onDragEnd={handleDragEnd}
                icon="/svg/origin/map-pin.svg"
                position={{ ...currentMarker }}
              />
            )}
          </>
        </GoogleMap>
      )}
      <MapsButtonsContainer>
        <IconButton type="button" IconComponent={SvgAdd} onClick={() => setZoom(zoom + 1)} />
        <IconButton type="button" IconComponent={SvgMinus} onClick={() => setZoom(zoom - 1)} />
      </MapsButtonsContainer>
    </MapContainer>
  );
};

export default Map;

const mapStyles = { maxWidth: '739px', height: '344px', width: '100%' };
const mapResponsiveStyles = { maxWidth: '739px', height: '432px', width: '100%' };

const MapContainer = styled.div`
  width: 100%;
  height: 344px;
  max-width: 739px;
  border-radius: 12px;
  margin-top: 24px;
  overflow: hidden;
  position: relative;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    height: 432px;
  }
`;

const MapsButtonsContainer = styled.div`
  position: absolute;
  right: 16px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  bottom: 16px;
`;
