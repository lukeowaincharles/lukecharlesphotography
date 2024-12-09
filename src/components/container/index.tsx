import { Container } from "react-bootstrap";

type ContainerProps = {
  children: React.ReactNode;
};

export default function ContainerWrap({ children }: ContainerProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
