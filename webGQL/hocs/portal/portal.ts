import { FC, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = 'root-portal', id }) => {
  const [container] = useState(document.createElement('div'));
  container.classList.add(...className.split(' '));
  container.setAttribute('id', id!);

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
