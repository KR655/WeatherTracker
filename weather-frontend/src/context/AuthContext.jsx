import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(
        localStorage.getItem("access")
    );

    const login = (access, refresh) => {

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        setUser(access);
    };

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}