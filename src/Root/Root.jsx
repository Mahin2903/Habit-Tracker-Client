import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;