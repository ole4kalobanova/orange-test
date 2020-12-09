import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { Button, Image, Card } from 'react-bootstrap';
import github from '../../icons/github.png';
import octocat from '../../icons/octocat.png';
import back from '../../icons/back.png';

export default function Personal() {
  const params = useParams();
  const [user, setUser] = useState();
  const [repositories, setRepositories] = useState();
  const history = useHistory();

  // Запрашиваем подробную инфу на пользователя
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/users/${params.login}`);
      const data = await response.json();
      setUser(data);
    })()
  }, [params.login]);

  // Запрашиваем инфу по репозиториям пользователя
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/users/${params.login}/repos`);
      const data = await response.json();
      setRepositories(data);
    })()
  }, [params.login]);

  return (
    <>
      <Button className="align-self-end" variant="outline-light" className={styles.test} onClick={history.goBack}>
        <img alt="back" className={styles.icon_back} src={back} />
      </Button>
      <div className={styles.page}>
        <div className={styles.flex}>
          {repositories?.length === 0
            ? <div className={styles.none}>
              <img src={octocat} className={styles.octocat} alt="octocat" />
              <div>У пользователя нет доступных репозиториев</div>
            </div>
            : ""}
          {repositories && repositories.map((el) => (
            <Card
              bg='dark'
              text='white'
              className={styles.cards}
              key={el.id}
            >
              <Card.Header>{el.full_name}</Card.Header>
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>
                  {el.description}
                </Card.Text>
                {el.language
                  ? <Card.Text>
                    Используемые языки: {el.language}
                  </Card.Text>
                  : ""
                }
              </Card.Body>
              <Card.Footer >
                <Link to={`/${params.login}/${el.name}`} className={styles.link}>
                  <Button className="align-self-end" variant="outline-light" block>Хочу узнать еще больше!</Button>
                </Link>
              </Card.Footer>
            </Card>
          ))
          }
        </div>
        <div className={styles.right}>
          <Card
            bg='dark'
            text='white'
            className={styles.personal}
          >
            <Card.Body>
              <div className={styles.bio}>
                <Image src={user?.avatar_url} className={styles.avatar} alt="avatar" roundedCircle />
                <div className={styles.info}>
                  {user && user.name
                    ? <Card.Title>
                      {user.name}
                    </Card.Title>
                    : ""
                  }
                  {user && user.login}
                  {user?.blog
                    ? <Card.Text>
                      Сайт: <a href={`http://${user.blog}`}>{user.blog}</a>
                    </Card.Text>
                    : ""
                  }
                  {user?.company
                    ? <Card.Text>
                      Компания: {user.company}
                    </Card.Text>
                    : ""
                  }
                  {user?.location
                    ? <Card.Text>
                      Местоположение: {user.location}
                    </Card.Text>
                    : ""
                  }
                  {user?.bio
                    ? <Card.Text>
                      О себе: {user.bio}
                    </Card.Text>
                    : ""
                  }
                </div>
                <a href={user?.html_url}>
                  <img alt="github" className={styles.icon_git} src={github} />
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
