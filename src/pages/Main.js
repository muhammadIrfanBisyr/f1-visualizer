import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../style/index.css';

import MainLayout from '../component/global/layout/MainLayout';
import Detail from './Detail';
import Summary from './Summary';

export default function Main(){
    return(
        <Router>
            <MainLayout>   
                <Switch>
                    <Route path='/' exact component={Summary}/>
                    <Route path='/summary/:year?'component={Summary}/>
                    <Route path='/detail/:year?/:round?' component={Detail}/>
                </Switch>
            </MainLayout>
        </Router>
    )
}