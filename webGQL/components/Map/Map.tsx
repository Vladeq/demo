import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { useClientSize, useWindowScroll } from 'hooks';
import { useDisableScrollBody } from 'hooks/useDisableScroll';
import { useRouter } from 'next/router';
import { FC, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Coords } from 'types/advert';
import { IconButton } from 'ui';
import { handleDivisionOnCategories } from 'utils';
import { mapSizeCalculation } from 'utils/map';

import { ArrowLeft, ArrowRight } from '../../../public/svg/components';
import SvgAdd from '../../../public/svg/components/Add';
import SvgMinus from '../../../public/svg/components/Minus';
import { ApartmentAdViewModel } from '../../__generated__/types';
import { Marker } from './components';

export const BASE_COORDINATE = { lat: 43.2567, lng: 76.9286 };

interface ResponsiveCardInSearchProps extends Partial<Omit<ApartmentAdViewModel, 'address'>> {
  rentType?: string;
  guestsNum?: string;
  id: string;
  pictureSrc: string;
  address: string;
  title: string;
  photo?: string;
  price: string;
  cost?: string;
  lat?: number;
  lng?: number;
  isFocus?: boolean;
}

type MapProps = {
  onSetMapRadius: (radius: number) => void;
  markers: Array<ResponsiveCardInSearchProps>;
  center: Coords;
  setCenter: (center: Coords) => void;
  isLoading?: boolean;
};

const DEFAULT_ZOOM = 11;
const Map: FC<MapProps> = ({ markers, onSetMapRadius, center, setCenter }) => {
  // eslint-disable-next-line no-undef
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const router = useRouter();
  const { getIsBreakpoint } = useClientSize();
  const isWidthSm = getIsBreakpoint('sm');
  const ref = useRef<HTMLDivElement>(null);
  const [isMapFullWidth, setIsMapFullWidth] = useState(false);
  useDisableScrollBody(isMapFullWidth);
  const { scrollY } = useWindowScroll();

  const handleCenterChange = useCallback(() => {
    if (map?.getCenter()?.lat()) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, lat: map?.getCenter()?.lat()!, lng: map?.getCenter()?.lng()! },
      });
      setCenter({
        lat: map?.getCenter()?.lat()!,
        lng: map?.getCenter()?.lng()!,
      });
    }
  }, [map, router]);

  // eslint-disable-next-line no-undef
  const onLoad = useCallback(
    // eslint-disable-next-line no-undef
    async (map: google.maps.Map) => {
      map.setZoom(zoom);
      setMap(map);
    },
    [],
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY!,
  });

  const calculateRadius = () => {
    const sw = map?.getBounds()?.getSouthWest();
    const ne = map?.getBounds()?.getNorthEast();
    const bounds = map?.getBounds();

    const areaBounds = {
      north: bounds?.getNorthEast().lat(),
      south: bounds?.getSouthWest().lat(),
      east: bounds?.getNorthEast().lng(),
      west: bounds?.getSouthWest().lng(),
    };

    const points = [
      { lat: areaBounds.south!, lng: areaBounds.west! },
      { lat: areaBounds.north!, lng: areaBounds.west! },
    ];
    const halfRadius =
      mapSizeCalculation({ lat: sw?.lat() || 0, lng: sw?.lng() || 0 }, { lat: ne?.lat() || 0, lng: ne?.lng() || 0 }) /
      2;
    const halfSide = mapSizeCalculation(points[0], points[1]) / 2;

    const resultSquare = halfRadius * halfRadius - halfSide * halfSide;

    const result = Math.sqrt(resultSquare);

    if (result !== 0 && result) {
      onSetMapRadius(result);
    }
  };

  const handleZoomChanged = useCallback(() => {
    if (map?.getCenter()?.lat()) {
      setCenter({
        lat: map?.getCenter()?.lat()!,
        lng: map?.getCenter()?.lng()!,
      });
    }

    calculateRadius();

    if (map?.getZoom()) {
      setZoom(map?.getZoom()!);
    }
  }, [map]);

  const handleMapFolding = () => {
    if (!isMapFullWidth) {
      ref!.current!.style.position = 'fixed';
    }

    setTimeout(() => {
      if (isMapFullWidth) {
        document.body.style.height = 'auto';
        document.body.style.overflow = 'unset';
        ref!.current!.style.position = 'sticky';
      }
    }, 700);

    setIsMapFullWidth(!isMapFullWidth);
  };

  const isScroll = scrollY > 0;

  return (
    <Root $isFullWidth={isMapFullWidth} $isScroll={isScroll} ref={ref} id="map">
      {isLoaded && (
        <GoogleMap
          zoom={zoom}
          onLoad={onLoad}
          clickableIcons={false}
          onDragEnd={handleCenterChange}
          onZoomChanged={handleZoomChanged}
          mapContainerStyle={mapStyles}
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
            {markers?.map((mark, index) => (
              <OverlayView
                key={index}
                mapPaneName="overlayMouseTarget"
                position={{ lat: mark?.lat || 0, lng: mark?.lng || 0 }}>
                <Marker
                  isFocus={mark.isFocus!}
                  imageUrl={mark?.photo || ''}
                  title={mark?.title}
                  price={handleDivisionOnCategories(String(mark?.cost || ''))}
                />
              </OverlayView>
            ))}
          </>
        </GoogleMap>
      )}
      {!isWidthSm && (
        <>
          <FullScreenButtonContainer>
            <IconButton onClick={handleMapFolding} IconComponent={isMapFullWidth ? ArrowRight : ArrowLeft} />
          </FullScreenButtonContainer>

          <MapsButtonsContainer>
            <IconButton type="button" IconComponent={SvgAdd} onClick={() => setZoom(zoom + 1)} />
            <IconButton type="button" IconComponent={SvgMinus} onClick={() => setZoom(zoom - 1)} />
          </MapsButtonsContainer>
        </>
      )}
    </Root>
  );
};

export default Map;

const mapStyles = { maxWidth: '100%', height: '100%', width: '100%' };

type RootProps = {
  $isScroll: boolean;
  $isFullWidth?: boolean;
};

const Root = styled.div<RootProps>`
  position: sticky;
  right: 0;
  top: ${({ $isScroll }) => ($isScroll ? '128px' : '177px')};
  display: flex;
  height: ${({ $isScroll }) => ($isScroll ? 'calc(100vh - 128px) !important' : 'calc(100vh - 177px) !important')};
  align-items: center;
  justify-content: center;
  background: grey;
  flex-shrink: 1;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100% !important' : 'unset')};
  transition: width 0.7s;

  height: 117vh !important;

  @media (min-width: ${BreakpointsEnum.s}px) {
    top: 177px;
  }
  @media (min-width: ${BreakpointsEnum.sm}px) {
    width: 600px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    height: calc(100vh - 184px) !important;
  }
  @media (min-width: ${BreakpointsEnum.md}px) {
    height: calc(100vh - 177px) !important;
    position: sticky;
    flex-shrink: 4;
    width: 696px;
  }
  @media (min-width: ${BreakpointsEnum.lg}px) {
    flex-shrink: 0;
    width: 696px;
  }
`;

const MapsButtonsContainer = styled.div`
  position: absolute;
  right: 24px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  top: 24px;
`;

const FullScreenButtonContainer = styled.div`
  position: absolute;
  left: 24px;
  top: 25px;
`;

// TODO z-index чинится абсолютом но карта щас не та
