import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Index from '../views/Index';
import PostDetail from '../views/PostDetail';
import Error404 from '../views/Error404';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {
      return (
        <MuiThemeProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path='/erro404' component={Error404}/>
              <Route exact path="/" component={Index} />
              <Route exact path="/:category" component={Index} />
              <Route exact path="/:category/:postId" component={PostDetail} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      )
}
export default App