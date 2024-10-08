import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert } from '../../components/Alerts'
// import { useLocalStorage } from 'react-storage-complete';
import Cookies from 'js-cookie';

export const SingIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ruta, setRuta] = useState('');
    const navigate = useNavigate();
    const [alert, setAlert] = useState({});
    // const [ Item, setItem ] = useLocalStorage('ID'); 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (email === '' || password === '') {
        setAlert({
          msg: "Todos los campos son obligatorios",
          error: true,
          isVisible: true,
        });
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:3000/usuarios/validateUser', {email,password});
      
        const {data}  = response;
        const type = data.type;
       
        if (type) {
          // setItem(data.token);
          Cookies.set('ID', data.token, {expires:7})
  
          setAlert({
            msg: `Has iniciado sesión correctamente`,
            error: false,
            isVisible: true,
          });
        }
  
        // Redirección según el tipo de usuario
        switch (type) {
          case 'Organizador':
            setRuta(`/organizador`);
            break;
          case 'Secretaria':
            setRuta(`/secretaria`);
            break;
          case 'Empleado':
            setRuta(`/empleado`);
            break;
          default:
            console.log('Credenciales inválidas');
        }
  
        navigate(ruta);
      } catch (error) {
        console.log(error);
      }
    };
  

  return (
    <aside className="bg-gradient-to-r from-slate-300 to-slate-100 h-screen flex">
    <div className='mt-36 ml-9'>
    <h1 className='bg-gradient-to-l from-lime-100 via-lime-900 to-lime-500 bg-clip-text text-transparent text-3xl'>¡Bienvenido a Globant!</h1> 
<p className='text-2xl mt-5'>
    Por favor, inicia sesión para acceder a tus<br/> herramientas  y recursos.
    Estamos encantados <br/> de  tenerte aquí y esperamos que tengas una <br/> experiencia
     productiva y exitosa.
</p>
<h1 className='mt-5'>
¡Adelante y comienza tu jornada en Globant!
</h1>
</div>
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-slate-50 lg:max-w-xl">
            <Alert alert={alert}/>
            <h1 className="text-3xl font-semibold text-center bg-gradient-to-l from-lime-900 via-lime-500 to-lime-900 bg-clip-text text-transparent uppercase">
                Sign in
            </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Email
                    </label>
                    <input
                        type="email"
                        className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Password
                    </label>
                    <input
                        type="password"
                        className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        />
                </div>
                <a
                    href="#"
                    className="text-xs text-sky-700 hover:underline"
                    >
                    Forget Password?
                </a>
                <div className="mt-6">
                    <button 
                    className="ml-2 px-60 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-600 rounded-md hover:bg-sky-800 focus:outline-none focus:bg-green-600 "    
                    type='submit'                
                    >Login</button>
                    
                </div>
            </form>
            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                <div className="absolute px-5 bg-white">Or</div>
            </div>
            <div className="flex mt-4 gap-x-2">
                <button
                    type="button"
                    className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 fill-current"
                        >
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>
                <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 fill-current"
                        >
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                    </svg>
                </button>
                <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 fill-current"
                        >
                        <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                    </svg>
                </button>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <a
                    href="#"
                    className="font-medium text-sky-700 hover:underline"
                    >
                    Sign up
                </a>
            </p>
        </div>
                    </aside>
  )
}
