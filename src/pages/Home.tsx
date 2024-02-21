import {Layout} from '@arco-design/web-react';
import {Outlet} from "react-router-dom";

const Sider = Layout.Sider;
const Content = Layout.Content;

const App = () => {
    return (
        <Layout>
            <Sider style={{height: '100vh'}}>Sider</Sider>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    );
};

export default App;
