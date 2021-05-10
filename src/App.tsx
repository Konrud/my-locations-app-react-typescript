import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Categories from './Pages/Categories/categories';
import CreateCategoryPage from './Pages/CreateCategory/createCategory';
import EditCategory from './Pages/EditCategory/editCategory';
import ViewCategory from './Pages/ViewCategory/viewCategory';
import Toolbar from './Components/Toolbar/toolbar';
import AlertContextProvider from './Contexts/AlertContextProvider/AlertContextProvider';
import Alert from './Components/Alert/Alert';
import ToolbarContextProvider from './Contexts/ToolbarContextProvider/ToolbarContextProvider';
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <AlertContextProvider>
      <BrowserRouter>
        <ToolbarContextProvider>
          <Navbar />
          <Toolbar />
          <div className="c-container">
            <Alert />
            <Switch>
              <Route path="/" exact component={Categories} />
              <Route path="/create" component={CreateCategoryPage} />
              <Route path="/edit/:id" component={EditCategory} />
              <Route path="/view/:id" component={ViewCategory} />
            </Switch>
          </div>
        </ToolbarContextProvider>
      </BrowserRouter>
    </AlertContextProvider>
  );
}

export default App;
