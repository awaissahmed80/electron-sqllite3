import { Spinner } from "./Spinner"
import PropTypes from 'prop-types'

const Button = ({ isLoading = false, className, children, ...rest }) => {

    let default_classes = 'text-sm font-semibold inline-flex items-center bg-primary-600 hover:bg-primary-800 hover:transition-all duration-300 text-white h-10 px-4 rounded focus:outline-none disabled:cursor-not-allowed disabled:opacity-30'
    

    let classes_array = default_classes?.split(' ') || []
    let custom_array = className?.split(' ') || []
    

    let joined_classes = [...classes_array, ...custom_array].join(' ');
    return(
        <button disabled={isLoading} className={joined_classes} {...rest}>
            {isLoading ? <div className="mr-0"><Spinner color="fill-primary-500" size={5} /></div> : children}
            
        </button>
    )
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.element,
    className: PropTypes.string
  };

export { Button }