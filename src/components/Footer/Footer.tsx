import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>&copy; {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;

