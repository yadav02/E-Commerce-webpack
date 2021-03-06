import React from 'react';
import 'regenerator-runtime/runtime';
import classes from '../App.module.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import {Header} from '../components/Header/Header';
import {HomePage} from '../containers/Homepage/HomePage';
import {Details} from '../containers/Details/Details';
import {Checkout} from '../containers/Checkout/Checkout';
import {Thank} from '../containers/Thank/Thank';
import {Footer} from '../components/Footer/Footer';

import { endpoints } from '../utils/routerEndpoints';


const AppRouter = () =>{
    const clothes = React.createRef();
    const accessories = React.createRef();

    return(

<BrowserRouter>
      <div className={classes.App}>
        <Header clothes={clothes} accessories={accessories} />
        <main>
          <Switch>
          <Route 
              exact path={endpoints.HOMEPAGE} 
              render={(props) => (<HomePage clothes={clothes} accessories={accessories} {...props} />)} 
            />
            <Route exact path={`${endpoints.DETAILS}:productId`} component={Details} />
            <Route exact path={endpoints.CHECKOUT} component={Checkout} />
            <Route exact path={`${endpoints.THANK}`} component={Thank} />
          </Switch>
        </main>
        <Footer />

        <img className={classes.EdYodaLogo} src="" alt=""></img>

      </div>
    </BrowserRouter>
    );

}
export default AppRouter;