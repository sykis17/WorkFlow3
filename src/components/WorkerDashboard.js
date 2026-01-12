import React, { useState, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import TaskCard from './TaskCard';

export default function WorkerDashboard({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  
  // Luodaan varma polku JSON-tiedostoon Docusauruksen työkalulla
  const jsonPath = useBaseUrl('/data/tasks.json');

  useEffect(() => {
    console.log("Yritetään hakea tiedostoa osoitteesta:", jsonPath);

    fetch(jsonPath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Tiedostoa ei löytynyt (Status: ${res.status}). Tarkista static/data/tasks.json sijainti.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data ladattu onnistuneesti:", data);
        setTasks(data);
      })
      .catch((err) => {
        console.error("Luku epäonnistui:", err);
        setError(err.message);
      });
  }, [jsonPath]);

  if (error) {
    return (
      <div className="p-4 border-2 border-red-500 bg-red-50 text-red-700 rounded-lg">
        <strong>Virhe:</strong> {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="mb-6 text-2xl font-black text-slate-800 border-b-2 border-blue-500 pb-2">
        Työmaan tehtävälista
      </h2>
      
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 italic font-medium text-lg">
            Ei tehtäviä näkyvissä. Varmista, että tasks.json-tiedostossa on sisältöä.
          </p>
        </div>
      )}
    </div>
  );
}