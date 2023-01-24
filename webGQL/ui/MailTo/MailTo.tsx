import { FC, ReactNode } from 'react';

type MailToProps = {
  email: string;
  subject?: string;
  body?: string;
  children: ReactNode;
};

const MailTo: FC<MailToProps> = ({ email, subject = '', body = '', children }) => {
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>
      {children}
    </a>
  );
};

export default MailTo;
