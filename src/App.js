import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState ([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: 'www.efrainrojas.com',
      techs: 'Efrain Rojas'
    });

    const project = response.data; 
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
   try {
    await api.delete(`repositories/${id}`);

    setProjects(projects.filter(project=> project.id !== id ));
   } catch (error) {
    alert('Erro ao deletar repositorio, tente novamente.');
   }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        {projects.map(project => <li key={project.id}>
          {
          project.title
          }
        <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
