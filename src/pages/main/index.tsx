import ChatPage from '@/components/chat'
import NavBar from '@/components/NavBar/index'
import TopBar from '@/components/tobBar'
import { Page } from '@/components/Page.tsx';

const MainPage = () => {
    return <Page>
        <div style={{backgroundColor:"3fdf9fe"}}>
            <TopBar/>
            <NavBar/>
            <ChatPage/>
        </div>
    </Page>
    
}

export default MainPage