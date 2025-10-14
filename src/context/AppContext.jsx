import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItem } from "../service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [auth, setAuth] = useState({
        token: null,
        role: null
    });

    // Hook
    useEffect(() => {
        async function loadData() {
            const response = await fetchCategories();
            const itemResponse = await fetchItem();

            setCategories(response.data);
            setItems(itemResponse.data);
        }

        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({ token, role });
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        items,
        setItems
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}