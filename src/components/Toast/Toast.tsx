import styles from './Toast.module.scss'

/**
 * Props for the Toast component
 * @param message - The text message to display inside the toast.
 */
interface ToastProps {
  message: string
}

/**
 * Toast component
 * Displays a brief message to the user.
 */
const Toast = ({ message }: ToastProps) => {
  return <div className={styles.toast}>{message}</div>
}

export default Toast
