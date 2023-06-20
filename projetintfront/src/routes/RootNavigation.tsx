import { Route, Routes } from 'react-router-dom';
import LoginView from '../View/LoginView/LoginView';
import HomeView from '../View/HomeView/HomeView';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import UsersView from '../View/UsersView/UsersView';
import Navbar from '../components/Navbar/Navbar';
import { Height } from '@mui/icons-material';
import CategoriesView from '../View/CategoriesView/CategoriesView';
import RegisterView from '../View/RegisterView/RegisterView';
import CourtsView from '../View/CourtsView/CourtsView';

const RootNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return isAuthenticated ? <AuthRoutes/> : <GuestRoutes/>
}

const GuestRoutes = () => {
    return (
        <Routes>
            <Route path='/register' element={<RegisterView/>}/>
            <Route path='/' element={<LoginView/>}/>
        </Routes>
    )
}

const AuthRoutes = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<HomeView/>}/>
                <Route path='/users' element={<UsersView/>}/>
                <Route path='/categories' element={<CategoriesView/>}></Route>
                <Route path='/courts' element={<CourtsView/>}></Route>
            </Routes>
        </div>
    )
}

export default RootNavigation