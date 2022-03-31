import './App.css';
import Header from './components/Header';
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
// import "swiper/css/bundle";
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Company from './components/Company';
import ServiceRegistrationCompany from './components/ServiceRegistrationCompany.js';
import ServiceRegistrationRegisteredService from './components/ServiceRegistrationRegisteredServices';
import ServiceRegistrationServices from './components/ServiceRegistrationServices';
import Service from './components/Service';
import Salary  from './components/Salary';
import BuildingEmployee  from './components/BuildingEmployee';
import Floor from './components/Floor';
import RentedArea from './components/RentedArea';
import ContractCompany from './components/Contract_Companies';
import Statistics from './components/Statistics';
import StatisticsRentedAreas from './components/Statistics_RentedAreas';
import Employee from './components/Employee';
import MonthlyStatistics from './components/MonthlyStatistics';
import MonthlyStatisticDetails from './components/MonthlyStatisticsDetails';
import MonthlySalary from './components/MonthlySalary';
function App() {
    // const isAdmin = useSelector(state => state.login.isAdmin);
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/company/view-employees/:id">
                        <Employee />
                    </Route>
                    <Route path="/company">
                        <Company />
                    </Route>
                    <Route path="/service-management">
                        <Service />
                    </Route>
                    <Route path="/service-registration/companies">
                        <ServiceRegistrationCompany />
                    </Route>
                    <Route path="/service-registration/registered-services">
                        <ServiceRegistrationRegisteredService />
                    </Route>
                    <Route path="/service-registration/services">
                        <ServiceRegistrationServices />
                    </Route>
                    <Route path="/salary">
                        <Salary/>
                    </Route>
                    <Route path="/buildingemployee">
                        <BuildingEmployee/>
                    </Route>
                    <Route path="/floors">
                        <Floor />
                    </Route>
                    <Route path="/rented-areas">
                        <RentedArea />
                    </Route>
                    <Route path="/contract-registration">
                        <ContractCompany />
                    </Route>
                    <Route path="/monthly-fee-statistics/rented-areas-of-company">
                        <StatisticsRentedAreas/>
                    </Route>
                    <Route path="/monthly-fee-statistics">
                        <Statistics />
                    </Route>
                    <Route path="/monthly-statistics">
                        <MonthlyStatistics/>
                    </Route>
                    <Route path="/monthly-statistics-details">
                        <MonthlyStatisticDetails/>
                    </Route>
                    <Route path="/monthly-salary">
                        <MonthlySalary/>
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;