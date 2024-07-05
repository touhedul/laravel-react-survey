
import { Link } from "react-router-dom";
import axiosCliient from "../axios";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
export default function Login() {

   const { setTokenToLocalStorage, setCurrentUser } = useStateContext();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({ __html: "" });
   const handleSubmit = (e) => {
      e.preventDefault();
      axiosCliient.post('/login', {
         email,
         password
      })
         .then(response => {
            if (response.data.data) {
               setTokenToLocalStorage(response.data.data.token);
               setCurrentUser(response.data.data.user);
            }
         })
         .catch(error => {
            if (error.response.data.message) {
               setErrors({ __html: error.response.data.message });
            }
            if (error.response.status == 422 && error.response.data.errors) {
               const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
               setErrors({ __html: finalErrors.join('<br/>') });
            }
         })
   }


   return (
      <>
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
         </h2>
         {errors.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={errors}>
         </div>)}
         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                     Email address
                  </label>
                  <div className="mt-2">
                     <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     />
                  </div>
               </div>

               <div>
                  <div className="flex items-center justify-between">
                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                     </label>
                  </div>
                  <div className="mt-2">
                     <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     />
                  </div>
               </div>

               <div>
                  <button
                     type="submit"
                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     Sign in
                  </button>
               </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
               Not a member?{' '}
               <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Sign up for free
               </Link>
            </p>
         </div>
      </>
   )
}
