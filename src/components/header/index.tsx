import { Container } from "react-bootstrap";
import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Container>
        <Link href="/">
          <p>Luke Charles Photography</p>
        </Link>
      </Container>
    </header>
  );
}
