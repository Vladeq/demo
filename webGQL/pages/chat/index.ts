import { checkAuth } from 'hocs';
import dynamic from 'next/dynamic';

const ChatPage = dynamic(() => import('../../pagesComponents/ChatPage/ChatPage'), { ssr: false });

export default checkAuth(ChatPage);
