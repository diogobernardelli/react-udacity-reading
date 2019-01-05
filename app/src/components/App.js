import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Index from '../views/Index';
import PostDetail from '../views/PostDetail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render() {
        return (
          <MuiThemeProvider>
            <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/:category" component={Index} />
                  <Route path="/:category/:postId" component={PostDetail} />
              </Switch>
            </BrowserRouter>
          </MuiThemeProvider>
        )
    }
}
export default App