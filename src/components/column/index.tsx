import { Col } from "react-bootstrap";

type ColProps = {
  children: React.ReactNode;
  layout: any;
  cols: any;
};

export default function ColWrap({ children, cols, layout }: ColProps) {
  const updateLayout = layout === true ? 'last' : undefined;
  
  return (
    <Col md={{ span: cols, order: updateLayout }}>
      {children}
    </Col>
  );
}
