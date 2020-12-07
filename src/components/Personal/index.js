import React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useParams } from 'react-router-dom';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Personal() {
  const params = useParams();
  const [user, setUser] = useState();
  const [repositories, setRepositories] = useState();

  // Запрашиваем подробную инфу на пользователя
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/users/${params.login}`);
      const data = await response.json();
      setUser(data);
    })()
  }, [params.login]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/users/${params.login}/repos`);
      const data = await response.json();
      setRepositories(data);
    })()
  }, [params.login]);
  console.log(repositories);


  return (
    <>
      <Image src={user?.avatar_url} roundedCircle />
      Логин: {user?.login}
      <br />
      Имя: {user?.name}
      <br />
      Сайт: {user?.blog}
      <br />
      {user?.bio}
      <br />
      Местоположение: {user?.location}
      {/* <br />
      {user?.repos_url} */}
      <br />
      Компания: {user?.company}
      {repositories && repositories.map((el) => (
        <Card className={styles.cards} key={el.id} >
          <Card.Header>Название: {el.name}</Card.Header>
          <Card.Body>
            {/* <Row> */}
            {/* <Col xs={6} md={4}>
                <Card.Title>Special title treatment</Card.Title>
              </Col>
              <Col xs={6} md={4}> */}
            <Card.Text>
              {el.description}
            </Card.Text>
            <Link to={`/${el.login}`}>
              <Button variant="primary">Узнать больше</Button>
            </Link>
            {/* </Col> */}
            {/* </Row> */}
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      ))
      }
    </>
  );
}
