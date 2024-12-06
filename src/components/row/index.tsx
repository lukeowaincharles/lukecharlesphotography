import styles from "./index.module.css";

type RowProps = {
  children: React.ReactNode;
};

export default function RowWrap({ children }: RowProps) {
  return (
    <div
      className={styles.row + " " + styles.rowCols1 + " " + styles.rowColsMd2}
    >
      {children}
    </div>
  );
}
