import './App.css';
import { graphql } from '@octokit/graphql';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  async function repo() {
    const { repository } = await graphql(
      `
        {
          repository(owner: "codestates-seb", name: "agora-states-fe") {
            discussions(first: 10) {
              edges {
                node {
                  title
                  url
                  author {
                    resourcePath
                  }
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: 'token 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',
        },
      }
    );
    return repository;
  }

  useEffect(() => {
    repo()
      .then(res => {
        setData(res.discussions.edges);
      })
  },[])

  return (
    <div className="App">
      <ul>
        {
        data.map((el, idx) => {
          return (
            <li key={idx}>
              <p>{el.node.title}</p>
              <p>{el.node.author.resourcePath}</p>
            </li>
          )
            
          })
        }
      </ul>
      
      
    </div>
  );
}

export default App;
