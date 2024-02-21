import {Routes, Route} from 'react-router-dom'
import Home from "../pages/Home";
import Btn from "../pages/test/Btn";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path='test' element={<Btn/>}/>
            </Route>
        </Routes>
    )
}

export default Routers
