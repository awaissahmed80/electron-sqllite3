import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

export const  OTPInput = ({ digits = 6, onChange }) => {
    
    const [ otp, setOTP ] = useState(Array.from({length: digits}, () => ''));
    const [ error, setError ] = useState(null)
    const inputRefs = useRef([])

    const handleInputChange = ( index, value ) => {
        const newOTP = [ ...otp ];
        newOTP[ index ] = value;
        setError(null)
        setOTP( newOTP );        
        onChange(newOTP.join(''))
        let totalRefs = inputRefs?.current?.length || 0        
        if ( index < totalRefs - 1 && value !== '' ) {            
            inputRefs?.current[ index + 1 ].focus();
        }
    };

    const handleKeyDown = ( index, e ) => {
        setError(null)
        if ( e.key === 'Backspace' && index > 0 && otp[ index ] === '' ) {
            inputRefs?.current[ index - 1 ].focus();
        }
    };
    
    const handlePaste = (e) => {
        e.preventDefault(); // Prevent the default paste behavior
        setError(null)
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData('text');        
        const otpRegex = new RegExp(`^\\d{${digits}}$`)

        if (otpRegex.test(pastedText)) {
            const otpArray = pastedText.split('');
            let pastedOtp = [];
            otpArray.forEach((digit, index) => {            
                if (inputRefs?.current[index] && inputRefs?.current[index]) {
                    inputRefs.current[index].value = digit;
                    pastedOtp.push(digit)
                }
            });
            setOTP(pastedOtp)
        }else{
            setError('Invalid OTP Format')
        }
    }


    return (
        <div>
            <div className="flex">
                { otp.map( ( digit, index ) => (
                    <input
                        key={ index }
                        type="text"
                        className="w-12 h-12 mx-1 text-center border-slate-300 border rounded"
                        maxLength="1"
                        value={ digit }
                        onChange={ ( e ) => handleInputChange( index, e.target.value ) }
                        onKeyDown={ ( e ) => handleKeyDown( index, e ) }                    
                        ref={input => inputRefs.current[index] = input}
                        onPaste={handlePaste}                        
                    />
                ) ) }
            </div>
            {
                error && <p className="text-sm text-center my-2 text-red-500">{error}</p>
            }
        </div>
    );
}

OTPInput.propTypes = {
    digits: PropTypes.number,    
    onChange: PropTypes.func
}
