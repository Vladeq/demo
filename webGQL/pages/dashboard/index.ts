import { checkAuth } from 'hocs';
import dynamic from 'next/dynamic';

const MyAds = dynamic(() => import('../../pagesComponents/MyAds/MyAds'), { ssr: false });

export default checkAuth(MyAds);
