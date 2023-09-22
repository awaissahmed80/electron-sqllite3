import { useEffect } from 'react'


function App() {
    useEffect( () => {
        // const getdata = async () => {
        //     let response = await window.api.getUsers()
        //     console.log("Response", response)    

        // }
        const getdata = () => {
            window.api.getUsers()
                .then( ( res ) => {
                    console.log( "Users", res )
                } )
                .catch( ( err ) => {
                    console.log( "My Error", err )
                    alert( err )
                } )
        }
        getdata()
    }, [] )

    return (
        <div className="flex flex-1">
            <p>Hello World</p>
        </div>
    )
}

export default App
