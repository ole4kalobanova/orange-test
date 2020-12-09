import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { Card, Button } from 'react-bootstrap';
import github from '../../icons/github.png';
import back from '../../icons/back.png';

export default function Repositories() {
  const params = useParams();
  const [mark, setMark] = useState();
  const [repositories, setRepositories] = useState();
  const [repos, setUseRepos] = useState();
  const history = useHistory();

  // Запрашиваем инфу по репозиторию
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/repos/${params.login}/${params.repos}`);
      const data = await response.json();
      setRepositories(data);
    })()
  }, [params.repos, params.login]);

  // Запрашиваем readme
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.github.com/repos/${params.login}/${params.repos}/readme`);
      const data = await response.json();
      if (data.message !== "Not Found") {
        setUseRepos(data);
        const responseReadme = await fetch(data.download_url);
        const dataReadme = await responseReadme.text();
        setMark(dataReadme)
      }
    })()
  }, [params.repos, params.login]);

  return (
    <>
      <Button className="align-self-end" variant="outline-light" className={styles.test} onClick={history.goBack}>
        <img alt="back" className={styles.icon_back} src={back} />
      </Button>
      <div className={styles.readme}>
        <h1>{params.login}/{params.repos}</h1>
        <Card
          bg='dark'
          text='white'
          className={styles.info}>
          <Card.Body className={styles.readme_text}>
            {repositories?.description
              ? <Card.Text>
                Описание: {repositories.description}
              </Card.Text>
              : ""
            }
            {repositories?.language
              ? < Card.Text >
                Язык: {repositories?.language}
              </Card.Text>
              : ""
            }
            {repositories?.license?.name
              ? <Card.Text>
                Лицензия: {repositories.license.name}
              </Card.Text>
              : ""
            }
          </Card.Body>
        </Card>
        {repos
          ? <Card
            bg='dark'
            text='white'>
            <Card.Header>
              <a href={repos?.html_url}>
                <img alt="github" className={styles.icon_git} src={github} />
              </a>
              {"  "}
          Readme
        </Card.Header>
            <ReactMarkdown className={styles.readme_text} source={mark} />
          </Card>
          : ""}
      </div >
    </>
  );
}
