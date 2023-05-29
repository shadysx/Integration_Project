import { Route, Routes } from 'react-router-dom';
import LoginView from '../View/LoginView/LoginView';
import HomeView from '../View/HomeView/HomeView';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import UserView from '../View/UserView/UserView';

const RootNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return isAuthenticated ? <AuthRoutes/> : <GuestRoutes/>
}

const GuestRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginView/>}/>
            {/* <Route path='*' element={<DefaultView/>} />             */}
        </Routes>
    )
}

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomeView/>}/>
            <Route path='/user' element={<UserView/>}/>
        </Routes>
    )
}

export default RootNavigation