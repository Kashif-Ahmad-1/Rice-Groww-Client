
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersTable from './components/Users/UsersTable';
import ClientMasterTable from './components/Clients/ClientMasterTable';
import ItemMasterTable from './components/Items Master/ItemMasterTable';
import RMMasterTable from './components/RM Items Master/RMMasterTable';
function App() {
  return (
    <div className="App">
    

     <Router>
        {/* Define routes for different pages */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/clients" element={<ClientMasterTable />} />
          <Route path="/items-master" element={<ItemMasterTable />} />
          <Route path="/rm-master" element={<RMMasterTable />} />
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
