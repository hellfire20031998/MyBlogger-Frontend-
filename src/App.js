import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import CreateUser from './component/CreateUser';
import CreateBlog from './component/CreateBlog';
import MyHomePage from './component/MyHomePage'
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import ReadBlog from './component/ReadBlog';
import UpdateBlog from './component/UpdateBlog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/myBlog' element={<MyHomePage />} />
        <Route path='/createUser' element={<CreateUser />} />
        <Route path='/createBlog' element={<CreateBlog />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/readblog/:id' element={<ReadBlog/>}/>
        <Route path="/updateBlog/:id" element={<UpdateBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
