import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle){
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);

      setTasks(prevState => [...prevState, { 
        id: rand, 
        title: newTaskTitle, 
        isComplete: false 
      }])
    }
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(prevState => {
      const newState = prevState;
      
      const index = prevState.findIndex(task => task.id === id);

      if(index > -1){
        newState[index].isComplete = !prevState[index].isComplete
      }

      return [...newState]
    })
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => {
      const newState = prevState.filter(task => task.id !== id)
      return [...newState]
    })
    // Remova uma task da listagem pelo ID
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}