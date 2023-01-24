import { checkAuth } from 'hocs';
import dynamic from 'next/dynamic';

const MyProfile = dynamic(() => import('../../pagesComponents/MyProfile/MyProfile'), {
  ssr: false,
});

export default checkAuth(MyProfile);
