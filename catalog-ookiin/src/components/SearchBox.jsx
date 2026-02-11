import { useEffect } from "react";
import { loadGoogleCSE } from "./googleCSE";

function SearchBox() {
    useEffect(() => {
        loadGoogleCSE();
    }, []);

    return null;
}

export default SearchBox;

