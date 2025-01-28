import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersTable from "./components/Users/UsersTable";
import ClientMasterTable from "./components/Clients/ClientMasterTable";
import ItemMasterTable from "./components/Items Master/ItemMasterTable";
import RMMasterTable from "./components/RM Items Master/RMMasterTable";
import Layout from "./components/Layout/Layout"; // Import Layout component
import LoginPage from "./components/Authentication/LoginPage";
import MillingPlantOutput from "./components/Milling Back Output/MillingPlantOutput";
import RiceProdctionPage from "./components/Rice Production Plantation/RiceProdctionPage";
import MillingPlantFront from "./components/Milling Front Output/MillingPlantFront";
import QCLabReport from "./components/QC Report/QCLabReport";
import SortexOutput from "./components/Sortex Output/SortexOutput";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
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
          <Route
            path="/riceproduction"
            element={
              <Layout>
                <RiceProdctionPage />
              </Layout>
            }
          />
          <Route
            path="/milling/output"
            element={
              <Layout>
                <MillingPlantOutput />
              </Layout>
            }
          />
          <Route
            path="/milling/front"
            element={
              <Layout>
                <MillingPlantFront />
              </Layout>
            }
          />
          <Route
            path="/milling/Qclab-report"
            element={
              <Layout>
                <QCLabReport />
              </Layout>
            }
          />
          <Route
            path="/milling/sortex/output"
            element={
              <Layout>
                <SortexOutput />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
