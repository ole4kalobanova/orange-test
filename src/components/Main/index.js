import React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Card } from 'react-bootstrap';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Main() {
  const [users, setUsers] = useState([]);

  // Получаем 10 пользователей
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();
      setUsers(data.slice(0, 10));
    })()
  }, []);

  return (
    <>
      {users && users.map((el) => (
        <Card className={styles.cards} key={el.id} >
          <Card.Header>Логин: {el.login}</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={6} md={4}>
                <Image src={el.avatar_url} className={styles.image} roundedCircle />
              </Col>
              <Col xs={6} md={4}>
                <Card.Title>Special title treatment</Card.Title>
              </Col>
              <Col xs={6} md={4}>
                {/* <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
    </Card.Text> */}
                <Link to={`/${el.login}`}>
                  <Button variant="primary">Узнать больше</Button>
                </Link>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      ))}
    </>
  );
}
