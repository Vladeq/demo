import Image from 'next/image';
import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { Avatar20, Avatar40, Avatar48, Avatar64, Avatar88 } from '../../../public/svg/components';

type AvatarProps = {
  avatar?: string;
  size?: AvatarSize;
  className?: string;
};

const Avatar: FC<AvatarProps> = ({ avatar, size = AvatarSize.size64, className }) => {
  const DefaultAvatarMapping = useMemo(
    () => ({
      [AvatarSize.size20]: <Avatar20 />,
      [AvatarSize.size40]: <Avatar40 />,
      [AvatarSize.size48]: <Avatar48 />,
      [AvatarSize.size64]: <Avatar64 />,
      [AvatarSize.size88]: <Avatar88 />,
    }),
    [size],
  );

  return (
    <Root $size={size} className={className}>
      {avatar ? <AvatarImage layout="fill" src={avatar} /> : DefaultAvatarMapping[size]}
    </Root>
  );
};

export default Avatar;

export enum AvatarSize {
  size20 = 20,
  size40 = 40,
  size48 = 48,
  size64 = 64,
  size88 = 88,
}

const Root = styled.div<{ $size: number }>`
  ${({ $size }) => css`
    width: ${$size}px;
    min-width: ${$size}px;
    height: ${$size}px;

    position: relative;
    border-radius: 50%;
    overflow: hidden;
  `}
`;

const AvatarImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
