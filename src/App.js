import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersTable from "./components/Users/UsersTable";
import ClientMasterTable from "./components/Clients/ClientMasterTable";
import ItemMasterTable from "./components/Items Master/ItemMasterTable";
import RMMasterTable from "./components/RM Items Master/RMMasterTable";
import Layout from "./components/Layout/Layout"; // Import Layout component

function App() {
  return (
    <div className="App">
      <Router>
        {/* Define routes for different pages */}
        <Routes>
          <Route
            path="/"
            element={
              
                <Home />
              
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <UsersTable />
              </Layout>
            }
          />
          <Route
            path="/clients"
            element={
              <Layout>
                <ClientMasterTable />
              </Layout>
            }
          />
          <Route
            path="/items-master"
            element={
              <Layout>
                <ItemMasterTable />
              </Layout>
            }
          />
          <Route
            path="/rm-master"
            element={
              <Layout>
                <RMMasterTable />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
