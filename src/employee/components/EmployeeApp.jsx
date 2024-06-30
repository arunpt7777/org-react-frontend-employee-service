
import '../../index.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import ListOfEmployeesComponent from './ListOfEmployeesComponent.jsx';
import ListOfAddressComponent from '../../address/components/ListOfAddressComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import LoginComponent from './LoginComponent.jsx';
import AuthProvider, { useAuth } from './security/AuthContext.js';
import FooterComponent from './FooterComponent.jsx';
import EmployeeComponent from './EmployeeComponent.jsx';


function AuthenticatedRoute({children}) {
    const authContext  = useAuth();
    if(authContext.isAuthenticated) return children

    return <Navigate to="/"/>
    
}

export default function EmployeeApp(){
    return (
    <div className='EmployeeApp'>
        <AuthProvider>
            <BrowserRouter>
            <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>} />
                    <Route path='/login' element={<LoginComponent/>} />
                    
                    <Route path='/welcome/:username' element={ <AuthenticatedRoute> <WelcomeComponent/> </AuthenticatedRoute> } />
                    
                    <Route path='*' element={ <ErrorComponent/> } />
                    <Route path='/employees' element={ <AuthenticatedRoute> <ListOfEmployeesComponent/> </AuthenticatedRoute> } />
                    <Route path='/logout' element={ <AuthenticatedRoute> <LogoutComponent/> </AuthenticatedRoute> } />
                    <Route path='/employees/:id' element={ <EmployeeComponent/> } />

                    <Route path='/addresses' element={ <AuthenticatedRoute> <ListOfAddressComponent/> </AuthenticatedRoute> } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
            <FooterComponent/>
        
    </div>
    )
}











