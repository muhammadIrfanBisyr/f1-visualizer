import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../style/index.css';

import MainLayout from '../component/global/layout/MainLayout';
import Detail from './Detail';
import Summary from './Summary';

export default function Main(){
    return(
        <Router>
            <MainLayout>   
                <Routes>
                    <Route path='/' element={<Summary/>}/>
                    <Route path='/detail' element={<Detail/>}/>
                    <Route path='/summary' element={<Summary/>}/>
                </Routes>
            </MainLayout>
        </Router>
    )
}