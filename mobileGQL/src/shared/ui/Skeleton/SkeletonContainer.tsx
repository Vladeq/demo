import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'shared/styles';

interface SkeletonContainerProps {
  children: JSX.Element | JSX.Element[];
}

const SkeletonContainer = ({ children }: SkeletonContainerProps) => {
  return <SkeletonPlaceholder backgroundColor={colors.grayscale[20]}>{children}</SkeletonPlaceholder>;
};

export default SkeletonContainer;
