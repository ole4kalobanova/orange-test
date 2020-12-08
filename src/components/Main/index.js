import React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Card } from 'react-bootstrap';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import github from '../../icons/github.png';

export default function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      // Запрашиваем количество пользователей гитхаб
      const responseAllUsers = await fetch("https://api.github.com/search/users?q=type%3Auser");
      const dataAllUsers = await responseAllUsers.json();
      // Получаем 10 пользователей
      // Получаем рандомом пользователей (вычитаем 10 что бы точно было 10 пользователей для вывода)
      let rand = Math.floor(Math.random() * (dataAllUsers.total_count + 1 - 10));
      const responseRandomUsers = await fetch(`https://api.github.com/users?since=${rand}`);
      const dataRandomUsers = await responseRandomUsers.json();
      // Т.к. API возвращает 30 пользователей, оставляем только 10
      setUsers(dataRandomUsers.slice(0, 10));
    })()
  }, []);

  return (
    <div className={styles.flex}>
      {users && users.map((el) => (
        <Card
          bg='dark'
          text='white'
          style={{ width: '18rem' }}
          className={styles.cards}
          key={el.id}
        >
          <Card.Header>Логин: {el.login}</Card.Header>
          <Card.Body>
            <Image src={el.avatar_url} className={styles.image} roundedCircle />
            <br />
            <Card.Text>
              Посетить профиль на GitHub:
              <a href={el.html_url}>
                <img alt="github" className={styles.icon_git} src={github} />
              </a>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to={`/${el.login}`} className={styles.link}>
              <Button variant="outline-light" block>Хочу узнать больше!</Button>
            </Link>
          </Card.Footer>
        </Card>
      ))
      }
    </div>
  );
}
