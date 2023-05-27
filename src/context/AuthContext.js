import { createContext, useState } from "react";

const AuthContext = createContext();


const AuthProvider = ({children})=>{
    const data={}
    const [saludo, setSaludo]= useState('Hola Mundo');
    return <AuthContext.Provider value={{data,saludo, setSaludo}}>{children}</AuthContext.Provider>

}

export {AuthProvider};
export default AuthContext;