import { useEffect, useState  } from 'react'
import { ToastContainer, ToastProvider } from './ui-components'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

const { ipcRenderer } = window.electronApi

export default function App(){

    const [ mount, setMount ] = useState(false)

    useEffect(() => {       
        if(!mount){
            setMount(true)
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')            
            } else {
                document.documentElement.classList.remove('dark')
            }            
        }
    }, [])

    useEffect(() => {
        ipcRenderer.on('toggle-theme', () => {                        
            if(localStorage.theme === 'dark'){
                localStorage.theme = 'light'
                document.documentElement.classList.remove('dark')   
                window.api.toggleTheme('light')             
            }else{
                document.documentElement.classList.add('dark')                
                localStorage.theme = 'dark'
                window.api.toggleTheme('dark')             
                
            }
        });
    }, [])

    


    return(            
        <ToastProvider>
            <ToastContainer />
            <Router>
                <Routes />
            </Router>
        </ToastProvider>                
    )
}
