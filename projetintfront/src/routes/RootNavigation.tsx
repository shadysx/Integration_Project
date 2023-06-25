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
import ReservationsView from '../View/ReservationView/ReservationsView';
import UserProfileView from '../View/UsersView/UserProfileView';



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
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Navbar isAdmin={user.isAdmin}/>
            <Routes>
                <Route path='/' element={<HomeView/>}/>
                <Route path='/users' element={<UsersView/>}/>
                <Route path='/reservations' element={<ReservationsView/>}></Route>
                <Route path='/profile' element={<UserProfileView/>}></Route>
                {user.isAdmin && (
                    AdminRoutes()
                )}
            </Routes>
        </div>
    )
}

const AdminRoutes = () => {
    return (
        <>
            <Route path='/' element={<HomeView/>}/>

            <Route path='/categories' element={<CategoriesView/>}></Route>
            <Route path='/courts' element={<CourtsView/>}></Route>
        </>

    )
}

export default RootNavigation