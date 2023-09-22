import { useState } from 'react'

const initial_data = {
    user: null,
    token: null
}

export const useAuth = ( initialValue = initial_data ) => {
    const [ auth, setAuthValue ] = useState( () => {
        try {
            const value = localStorage.getItem( 'auth' );            
            if ( value && value !== 'null' ) {                
                return JSON.parse( value );
            } else {
                window.localStorage.setItem( 'auth', JSON.stringify( initialValue ) );
                return initialValue;
            }

            
        } catch ( err ) {
            return initialValue;
        }
    } );

    const storeLogin = newValue => {

        window.localStorage.setItem( 'auth', JSON.stringify( newValue ) );
        setAuthValue( newValue );
    };

    const logout = () => {
        window.localStorage.removeItem( 'auth' );
        setAuthValue( null );
    };

    return { auth, storeLogin, logout };
};