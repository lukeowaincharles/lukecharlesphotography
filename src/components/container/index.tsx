import styles from "./index.module.css"

type ContainerProps = {
  children: React.ReactNode;
};

export default function ContainerWrap({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
