import ChatPage from '@/components/chat'
import NavBar from '@/components/NavBar/index'
import TopBar from '@/components/tobBar'
import { Page } from '@/components/Page.tsx';

const MainPage = () => {
    return <Page>
    
            <TopBar/>
            <NavBar/>
            <ChatPage/>
    </Page>
    
}

export default MainPage