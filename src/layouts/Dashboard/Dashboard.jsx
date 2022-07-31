import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { logout } from '../../features/Auth/userSlice';

Dashboard.propTypes = {

};

function Dashboard(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        const action = logout(user);
        dispatch(action);

        navigate('/login');
    };

    return (
        <div>
            <Header onLogout={handleLogout} />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Dashboard;