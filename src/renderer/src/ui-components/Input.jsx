import { useState, forwardRef } from "react"
import { Icon } from "."
import PropTypes from 'prop-types'

const Input =  ({label, icon, error, ...rest}) => (
    <>
        <div className="block mb-4">
            <label className="block">
                { label && <span className="text-slate-500 text-sm font-semibold">{label}</span>}
                <div className="relative">
                    { icon && 
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                            <Icon name={icon} />
                        </div>
                    }
                    <input className={`border ${icon && 'pl-10'} ${error ? "border-red-600" : "border-slate-300"} h-10  placeholder-slate-400  transition-all duration-800 rounded w-full py-2 px-3 text-gray-700 focus:border-primary-500 leading-tight  focus:outline focus:ring-1 focus:ring-primary-500 focus:shadow-outline `}  {...rest} />   
                </div>
            </label>
            {
                error && 
                <p className="m-0 text-sm text-red-500">{error}</p>
            }
        </div>
    </>
)

const getPasswordStrength = (value) => {
    
        // Regular expressions for each criterion
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
        const lengthRegex = /^.{8,25}$/;
      
        // Calculate strength based on criteria
        let score = 0;
        let message = ""
        if (lowercaseRegex.test(value)) { 
            score++
        }else{
            message = "Password should contain lowercase letter"
        }

        if (uppercaseRegex.test(value)) {
            score++ 
        }else{
            message = "Password should contain uppercase letter"
        }
        if (digitRegex.test(value)){
            score++;
        }else{
            message = "Password should contain number"
        }        
        if (specialCharRegex.test(value)){
            score++;
        }else{
            message = "Password should contain at least one special character"
        }
        if (lengthRegex.test(value)){
            score++;
        }else{
            message = "Password must be between 8 - 25 characters"
        }
        if(score > 4){
            message = "Awesome! You have a seure password"
        }
        if(value?.length > 0)
            return {score, message};
        else{
            return { score: 0, message: ""}
        }
}
// forwardRef((props, ref) => {
const InputPassword = forwardRef( ({label, icon, error, showStrength, addonRight, ...rest}, ref) => {
    
    const [ show, setShow ] = useState(false)
    const [ strength, setStrength ] = useState({score: 0, message: ""})

    return(
        <>
            <div className="block mb-4 transition-all duration-500 ease-in">
                <label className="block">
                { label && <span className="text-slate-500 text-sm font-semibold ">{label}</span>}                            
                    <div className="relative">                    
                        { icon && 
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <Icon name={icon} />
                            </div>
                        }
                        <input ref={ref} {...showStrength && {onChange:(e) => setStrength(getPasswordStrength(e.target.value)) }} className={`border ${error && "border-red-500"} ${icon && 'pl-10'} h-10  placeholder-slate-400 border-slate-300 transition-all duration-800 rounded w-full py-2 px-3 text-gray-700 focus:border-primary-500 leading-tight  focus:outline focus:ring-1 focus:ring-primary-500 focus:shadow-outline dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:placeholder-zinc-600`} type={show ? "text" : "password"} {...rest} />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <button onClick={() => setShow(!show)} type="button" className={`px-4 font-semibold text-md ${show ? 'text-primary-500 hover:text-primary-600' : 'text-slate-400 hover:text-slate-600'} `}>
                                { show ? <Icon name="eye-fill" /> : <Icon name="eye-off-fill" /> }
                            </button>
                            { addonRight }
                        </div>
                    </div>
                    {
                        (showStrength && strength?.score > 0) &&                    
                        <div className="mt-2">                             
                            <div className="h-1 mb-1 rounded">                          
                                <div className={`h-full transition-all duration-500 rounded-full ${strength?.score < 3 && 'bg-red-500'} ${(strength?.score < 5 && strength?.score > 2) && 'bg-orange-500'} ${strength?.score >=5 && 'bg-green-600'} `} style={{ width: `${(strength?.score / 5) * 100}%` }}  />
                            </div>
                            <p className={`text-sm  ${strength?.score < 3 && 'text-red-500'} ${(strength?.score < 5 && strength?.score > 2) && 'text-orange-500'} ${strength?.score >=5 && 'text-green-600'}`}>
                                {strength?.message}
                            </p>
                        </div>
                    }
                </label>
                {
                    error && 
                    <p className="m-0 text-sm text-red-500">{error}</p>
                }
            </div>
            
        </>
    )
})

Input.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string
}

InputPassword.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string,
    showStrength: PropTypes.bool,
    addonRight: PropTypes.element
}

InputPassword.displayName = 'InputPassword';

Input.Password = InputPassword
export {Input}