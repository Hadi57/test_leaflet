import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom";


import Test1 from "./Test1";

export default function App(){
    return(
            <BrowserRouter>
                <Routes >
                    <Route path="/Test1" element={<Test1/>} />
                    <Route path='/' element = {<h1> Home </h1>}/>
                    
                    <Route path='*' element={<h1> 404 </h1>} />
                    <Route path="*" element={<Navigate to='/404' />} />
                </Routes >
            </BrowserRouter>
);
}

