import styles from "./DashBoardCard.module.css";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  percentage: number;
  color?: string;
  icon: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  color,
  icon,
}: DashboardCardProps) {
  return (
    <div className={`${styles.card} ${color ? styles.purple : ""}`}>
      <h3>{title}</h3>
      <div className={styles.values}>
        <p className={styles.value}>{value}</p>
        <div className={styles.icon}>{icon}</div>
      </div>
    </div>
  );
}
