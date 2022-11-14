import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../style/index.css'

import MainLayout from '../components/global/layout/MainLayout'

import Detail from './RaceDetail'
import Summary from './Summary'
import DriverMain from './driver/DriverMain'

export default function Main () {
  return (
        <Router basename='/f1-visualizer'>
            <MainLayout>
                <Switch>
                    <Route path='/' exact component={Summary}/>
                    <Route path='/summary/:year?'component={Summary}/>
                    <Route path='/detail/:year?/:round?' component={Detail}/>
                    <Route path='/driver/:driverId?' component={DriverMain}/>
                </Switch>
            </MainLayout>
        </Router>
  )
}
