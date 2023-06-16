import { Route, Routes } from 'react-router-dom';
import LoginView from '../View/LoginView/LoginView';
import HomeView from '../View/HomeView/HomeView';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import UsersView from '../View/UsersView/UsersView';
import Navbar from '../components/Navbar/Navbar';
import { Height } from '@mui/icons-material';
import RegisterView from '../View/RegisterView/RegisterView';

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
            </Routes>
        </div>
    )
}

export default RootNavigation