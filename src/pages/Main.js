import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../style/index.css';

import MainSidebar from '../component/global/sidebar/MainSidebar';
import Detail from './Detail';
import Summary from './Summary';

export default function Main(){
    return(
        <Router>
            <MainSidebar>   
                <Routes>
                    <Route path='/' element={<Detail/>}/>
                    <Route path='/detail' element={<Detail/>}/>
                    <Route path='/summary' element={<Summary/>}/>
                </Routes>
            </MainSidebar>
        </Router>

    )
}