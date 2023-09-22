import { Fragment } from 'react'
import { useToastDispatchContext, useToastStateContext } from './toast.context' 
import { Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

export const  Toast = ({ type, message, id }) => {
	const dispatch = useToastDispatchContext();
	return (
		<>
			{type == "success" && (
				<div className="rounded-md bg-green-50 p-4 m-3">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-green-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-green-800">{message}</p>
						</div>
						<div className="ml-auto pl-3">
							<div className="-mx-1.5 -my-1.5">
								<button
									onClick={() => {
										dispatch({ type: "DELETE_TOAST", id });
									}}
									className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
								>
									<span className="sr-only">Dismiss</span>

									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{type == "error" && (
				<div className="rounded-md bg-red-500 p-4 m-3">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-red-100"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-red-100">{message}</p>
						</div>
						<div className="ml-5 pl-5">
							<div className="-mx-1.5 -my-1.5">
								<button
									onClick={() => {
										dispatch({ type: "DELETE_TOAST", id });
									}}
									className="inline-flex rounded-md p-1.5 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-red-600"
								>
									<span className="sr-only">Dismiss</span>

									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

Toast.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    id: PropTypes.string
}

export const  ToastContainer = () =>{
	const { toasts } = useToastStateContext();

	return (
        <Transition appear show={toasts?.length > 0} as={Fragment}>
            <div className="absolute top-5 left-[50%] w-fit z-50 translate-x-[-50%]">
                <div className="max-w-xl mx-auto">
                    {toasts &&
                        toasts.map((toast) => 
                        <Transition.Child
                            key={toast.id}
                            // show={true}                        
                            enter="ease-out duration-200"                        
                            enterFrom="opacity-0 translate-y-[-100%]"                        
                            enterTo="opacity-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-300"
                            leaveTo="opacity-0"
                            >
                            <Toast id={toast.id} key={toast.id} type={toast.type} message={toast.message} />
                        </Transition.Child>
                        )}
                </div>
            </div>
        </Transition>
	);
}


export const useToast = (delay) => {
	const dispatch = useToastDispatchContext();

	function toast(type, message="") {
		const id = Math.random().toString(36).substr(2, 9);
		dispatch({
			type: "ADD_TOAST",
			toast: {
				type,
				message,
				id,
			},
		});

		setTimeout(() => {
			dispatch({ type: "DELETE_TOAST", id });
		}, delay);
	}

	return toast;
}