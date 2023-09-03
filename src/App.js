import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import History from './Components/History';
import WordDetails from './Components/WordDetails';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/word/:word" component={WordDetails} /> {/* Dynamic route */}
      </Switch>
    </Router>
  
    
  );
};

export default App;


