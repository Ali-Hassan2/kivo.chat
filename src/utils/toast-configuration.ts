import { toast, ToastOptions } from 'react-toastify'

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 1500,
  pauseOnHover: true,
  closeOnClick: true,
  draggable: true,
  theme: 'colored',
  hideProgressBar: false,
}

const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'info',
) => {
  const customStyles = {
    backgroundColor: '#111',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '14px',
    borderRadius: '10px',
  }
  switch (type) {
    case 'success':
      toast.success(message, { ...defaultOptions, style: customStyles })
      break
    case 'error':
      toast.error(message, {
        ...defaultOptions,
        style: customStyles,
      })
      break
    case 'warning':
      toast.error(message, {
        ...defaultOptions,
        style: customStyles,
      })
      break
    case 'info':
      toast.info(message, {
        ...defaultOptions,
        style: customStyles,
      })
      break
  }
}

export { showToast }
