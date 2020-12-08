import React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useParams } from 'react-router-dom';
import { Button, Col, Image, Row, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import github from '../../icons/github.png';

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
      <Card
        bg='dark'
        text='white'
        className={styles.personal}
      >
        <Card.Header>
          <Card.Title className={styles.login}>Логин: {user?.login}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className={styles.bio}>
            <div className={styles.info}>
              <Card.Text>
                Имя: {user?.name || "---"}
              </Card.Text>
              <Card.Text>
                Сайт: {user?.blog || "---"}
              </Card.Text>
              <Card.Text>
                О себе: {user?.bio || "---"}
              </Card.Text>
              <Card.Text>
                Местоположение: {user?.location || "---"}
              </Card.Text>
              <Card.Text>
                Компания: {user?.company || "---"}
              </Card.Text>
            </div>
            <Image src={user?.avatar_url} className={styles.avatar} roundedCircle />
          </div>
        </Card.Body>
      </Card>

      <div className={styles.flex}>
        {repositories && repositories.map((el) => (
          <Card
            bg='dark'
            text='white'
            style={{ width: '18rem' }}
            className={styles.cards}
            key={el.id}
          >
            <Card.Header>{el.full_name}</Card.Header>
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>
                {el.description}
              </Card.Text>
              <Card.Text>
                Используемые языки: {el.language || "---"}
              </Card.Text>
            </Card.Body>
            <Card.Footer >
              {/* <Link to={`/${el.login}`} className={styles.link}> */}
              <Button className="align-self-end" variant="outline-light" block>Хочу узнать еще больше!</Button>
              {/* </Link> */}
            </Card.Footer>
          </Card>
        ))
        }
      </div>
    </>
  );
}
