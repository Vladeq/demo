import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useClientSize } from 'hooks';
import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Coords } from 'types/advert';
import { IconButton } from 'ui';

import SvgAdd from '../../../../../public/svg/components/Add';
import SvgMinus from '../../../../../public/svg/components/Minus';
import SvgResize from '../../../../../public/svg/components/Resize';
// eslint-disable-next-line no-undef

type MapTypes = {
  currentMarker: Coords;
  center: Coords;
  isFullWidth?: boolean;
  withResizeButton?: boolean;
  onOpenFullScreenMap: () => void;
};

const DEFAULT_ZOOM = 12;

const Map: FC<MapTypes> = ({
  currentMarker,
  center: defaultCenter,
  onOpenFullScreenMap,
  isFullWidth,
  withResizeButton,
}) => {
  // eslint-disable-next-line no-undef
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState(defaultCenter);
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

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY!,
  });

  const isWidthSm = getIsBreakpoint('sm');

  const mapStyles = isFullWidth
    ? { maxWidth: '848px', height: '100%', width: '100%' }
    : { maxWidth: '848px', height: '287px', width: '100%' };
  const mapResponsiveStyles = isFullWidth
    ? { maxWidth: '100%', height: '100%', width: '100%' }
    : { maxWidth: '100%', height: '287px', width: '100%' };

  return (
    <MapContainer $isFullWidth={isFullWidth}>
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
          <>{currentMarker && <Marker draggable icon="/svg/origin/map-pin.svg" position={{ ...currentMarker }} />}</>
        </GoogleMap>
      )}
      {withResizeButton && (
        <ResizeButtonContainer>
          <IconButton type="button" IconComponent={SvgResize} onClick={onOpenFullScreenMap} />
        </ResizeButtonContainer>
      )}
      <MapsButtonsContainer>
        <IconButton type="button" IconComponent={SvgAdd} onClick={() => setZoom(zoom + 1)} />
        <IconButton type="button" IconComponent={SvgMinus} onClick={() => setZoom(zoom - 1)} />
      </MapsButtonsContainer>
    </MapContainer>
  );
};

export default Map;

const MapContainer = styled.div<{ $isFullWidth?: boolean }>`
  width: 100%;
  max-width: 848px;
  height: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : '287px')};
  border-radius: ${({ $isFullWidth }) => ($isFullWidth ? '0' : '12px')};
  margin-top: ${({ $isFullWidth }) => ($isFullWidth ? '0' : '24px')};
  overflow: hidden;
  position: relative;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    height: ${({ $isFullWidth }) => ($isFullWidth ? 'calc(100vh - 60px)' : 'auto')};
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

const ResizeButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  @media (min-width: ${BreakpointsEnum.s}px) {
    display: none;
  }
`;
