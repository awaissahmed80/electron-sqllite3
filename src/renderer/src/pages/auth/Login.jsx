import { useState, useEffect, Fragment, useRef } from 'react'
import { Icon, Spinner} from '../../ui-components'
import { Transition } from '@headlessui/react'
import { Input, Button } from '../../ui-components'
import Logo from '../../assets/hitech-logo.svg'
import { useToast } from '../../ui-components'
import { useAuth } from '../../hooks/useAuth'
const Login = () => {

    const toast = useToast(4000)
    const [ loading, setLoading ] = useState(false)
    const [ users, setUsers ] = useState(null)    
    const [ selected, setSelected ] = useState(null)
    const [ submitting, setSubmitting ] = useState(false)
    const [ show, setShow ] = useState(0)
    const { storeLogin } = useAuth()
    const inputRef = useRef(null);
    


    useEffect(() => {
        setLoading(true)
        window.api.getUsers()
        .then( ( res ) => {
            setUsers(res)
            setLoading(false)
        } )
        .catch( ( err ) => {
            console.log( "My Error", err )    
            setLoading(false)        
        })
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        // let formData = new FormData(e.currentTarget);

        var password = inputRef?.current?.value
        
        const { error, user, token } = await window.api.login({username: selected?.username, password})
        if(error){
            console.log("Error", error)
            toast('error', error)
        }else{
            storeLogin({user, token})            
        }
        setSubmitting(false)
    }

    if(loading){
        return(
            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-zinc-900">
                <Spinner size={10} />
            </div>
        )
    }
    
    console.log("Users", users)
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-300 dark:bg-zinc-900">
            <div className="prose  p-6 lg:p-8 rounded-lg w-full max-w-xl  lg:mx-10 mx-5">                
                <Transition appear show={show === 0 && !selected} as={Fragment}>
                    <div>
                        <Transition.Child                             
                            enter="ease-out duration-200"                        
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-300"
                            leaveTo="opacity-0"
                            >
                            <img className='mx-auto w-[92px] h-auto'  src={Logo} alt="Logo" />
                        </Transition.Child>
                        <Transition.Child                             
                            enter="ease-out duration-200"                        
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-300"
                            leaveTo="opacity-0"
                            >
                            <h2 className="text-lg dark:text-gray-400 font-semibold my-5 text-center">Select your Account</h2>
                        </Transition.Child>                        
                        <div className="my-10 flex gap-5 flex-wrap justify-center">
                        {
                            users?.map((user, u) =>
                                <Transition.Child
                                    key={u}
                                    // show={false}                        
                                    enter="transform transition duration-[300ms]"
                                    enterFrom="opacity-0  scale-50"
                                    enterTo="opacity-100 rotate-0 scale-100"
                                    leave="transform duration-300 transition ease-in-out"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-0"
                                    afterLeave={() => setShow(1)}
                                >
                                    <div key={u} onClick={() => setSelected(user)}>
                                        <img src={`${user.avatar || 'avatar.png'}`} className="w-24 h-24 my-0 rounded-full cursor-pointer" />
                                        <p className="text-center my-1 text-slate-400 dark:text-zinc-500">{user?.username}</p>
                                    </div>
                                    
                                </Transition.Child>
                            )
                        }
                        </div>  
                    </div>
                </Transition>   
                <Transition appear show={show === 1 && selected !== null} as={Fragment} enter="transform transition duration-[200ms]">
                    <div>
                    <Transition.Child                        
                        // show={false}                        
                        enter="transform transition duration-[200ms]"
                        enterFrom="opacity-0  scale-100"
                        enterTo="opacity-100 rotate-0 scale-100"
                        leave="transform duration-100 transition ease-in-out"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-100"
                        afterLeave={() => setShow(0)}
                        >
                        <img src={`${selected?.avatar}`} className="w-32 h-32 my-0 mx-auto rounded-full" />
                        <h2 className="my-5 text-center dark:text-zinc-200">{selected?.first_name } { selected?.last_name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full max-w-[350px] mx-auto">
                                <Input.Password
                                    ref={inputRef}
                                    name="password"
                                    placeholder="Enter your password..."                                
                                    addonRight={<Button  isLoading={submitting}  type="submit" className="bg-primary-600 rounded-none rounded-e-[3px]"><Icon name="arrow-right-line" /></Button>}
                                />
                            </div>
                        </form>
                        <div className='my-5 flex align-center justify-center cursor-pointer' >
                            <div  onClick={() => {setSelected(null) }}>Go Back</div>
                        </div>
                    </Transition.Child>
                    </div>
                </Transition>
            </div>
        </div>
    );
};

export default Login;
