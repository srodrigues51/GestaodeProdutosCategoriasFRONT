import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Initial from './pages/InitialPage';
import Home from './pages/Home';
import ProductRegister from './pages/Product_register';
import CategoryRegister from './pages/Category_register';
//import Private from './components/private';


function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Initial />} />
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/Product_register' element={<ProductRegister />} />
                <Route exact path='/Category_register' element={<CategoryRegister />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;