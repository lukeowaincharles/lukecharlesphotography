import styles from "./index.module.css"

type ColProps = {
  children: React.ReactNode;
  layout: any;
  cols: any;
};

export default function ColWrap({ children, cols, layout }: ColProps) {
  const updateLayout = layout === true ? styles.ordermdlast : '';
  
  return (
    <div className={styles.col + ' ' + styles.colmd6 + ' ' + updateLayout}>
      {children}
    </div>
  );
}
