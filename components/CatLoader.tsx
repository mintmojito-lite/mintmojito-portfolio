import styles from './CatLoader.module.css';

export default function CatLoader() {
    return (
        <div className={styles['cat-loader']}>
            <svg id="cat-gnd" className={styles['cat-gnd']} width="200" height="40" viewBox="0 0 200 40">
                <ellipse cx="100" cy="20" rx="80" ry="15" fill="black" />
            </svg>

            <svg className={`${styles['cat-leg']} ${styles['leg-back-right']}`} width="20" height="40">
                <rect width="16" height="35" rx="8" />
            </svg>
            <svg className={`${styles['cat-leg']} ${styles['leg-front-right']}`} width="20" height="40">
                <rect width="16" height="35" rx="8" />
            </svg>

            <svg className={styles['cat-tail']} width="60" height="40">
                <path d="M0,10 Q30,-10 50,20" fill="none" />
            </svg>

            <div className={styles['cat-torso-group']}>
                <svg className={styles['cat-body']} width="120" height="60" viewBox="0 0 120 60">
                    <rect width="120" height="60" rx="30" />
                </svg>
                <svg className={styles['cat-belly']} width="80" height="40" viewBox="0 0 80 40">
                    <rect width="80" height="30" rx="15" />
                </svg>

                <svg className={styles['cat-head']} width="50" height="50" viewBox="0 0 50 50">
                    <polygon points="0,15 15,0 30,15" />
                    <polygon points="20,15 35,0 50,15" />
                    <circle cx="25" cy="30" r="20" />
                </svg>
                <svg className={styles['cat-face']} width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="32" r="3" fill="pink" />
                    <circle cx="18" cy="26" r="3" fill="#333" />
                    <circle cx="32" cy="26" r="3" fill="#333" />
                </svg>
            </div>

            <svg className={`${styles['cat-leg']} ${styles['leg-back-left']}`} width="20" height="40">
                <rect width="16" height="35" rx="8" />
            </svg>
            <svg className={`${styles['cat-leg']} ${styles['leg-front-left']}`} width="20" height="40">
                <rect width="16" height="35" rx="8" />
            </svg>
        </div>
    );
}
