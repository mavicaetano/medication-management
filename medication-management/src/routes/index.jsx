import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import { Map } from '../pages/map-page';
import { MedicineList } from '../pages/medicine-list';
import { NewMedicine } from '../pages/new-medicine';
import { NewPharmacy } from '../pages/new-pharmacy';
import { NotFound } from '../pages/404';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='/map-page' element={<Map/>}/>
                <Route path='/medicine-list' element={<MedicineList/>}/>
                <Route path='/new-medicine' element={<NewMedicine/>}/>
                <Route path='/new-pharmacy' element={<NewPharmacy/>}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}