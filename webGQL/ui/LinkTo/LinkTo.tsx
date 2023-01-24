import Link, { LinkProps } from 'next/link';
import React, { FC } from 'react';

type LinkToProps = {
  text: string;
  className?: string;
} & Omit<LinkProps, 'children'>;

const LinkTo: FC<LinkToProps> = ({ text, className, ...props }) => (
  <Link {...props}>
    <a className={className}>{text}</a>
  </Link>
);

export default LinkTo;
