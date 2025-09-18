import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <svg className={styles.svg} viewBox="25 25 50 50">
      <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
    </svg>
  );
};
