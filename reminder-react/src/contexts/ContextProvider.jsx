import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    toke: null,
    setUser: () => {},
    setToken: () => {},
});

// localStorage.getItem("ACESS_TOKEN")

export const ContextProvide = ({ children }) => {
    const [user, setUser] = useState({
        name: "Chrystian",
    });
    const [token, _setToken] = useState(1);
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACESS_TOKEN");
        }
    };
    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
