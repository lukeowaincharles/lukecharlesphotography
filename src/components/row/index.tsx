import { Row } from "react-bootstrap";

type RowProps = {
  children: React.ReactNode;
};

export default function RowWrap({ children }: RowProps) {
  return (
    <Row xs={1} md={2}>
      {children}
    </Row>
  );
}
