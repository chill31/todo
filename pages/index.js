// MAIN IMPORTS
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// UI IMPORTS
import { BsPlus, BsXLg, BsTrash, BsPencilSquare, BsCheck2Square, BsSun, BsMoon, BsPinAngle } from 'react-icons/bs'
import RemovePin from '../components/removePin'

// HOOKS IMPORTS
import { useEffect, useState } from 'react'

export default function Home() {

  const [data, setData] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [groupVisible, setGroupVisible] = useState(false);
  const [editGroupVisible, setEditGroupVisible] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);
  const [editTaskVisible, setEditTaskVisible] = useState(false);

  const closeTaskModal = () => {
    setTaskVisible(false);
    document.getElementById("task-modal").removeAttribute("data-index");
  };

  const openTaskModal = (index) => {
    setTaskVisible(true);
    document.getElementById("task-modal").setAttribute("data-index", index);
  };

  const closeModal = () => setGroupVisible(false);
  const openModal = () => setGroupVisible(true);

  const closeEditGroupModal = () => setEditGroupVisible(false);
  const openEditGroupModal = () => setEditGroupVisible(true);

  const closeEditTaskModal = () => {

    setEditTaskVisible(false);
    document.getElementById("edit-task-modal").removeAttribute('data-group-index');
    document.getElementById("edit-task-modal").removeAttribute('data-task-index');

  }

  const openEditTaskModal = (groupIndex, taskIndex) => {

    setEditTaskVisible(true);
    const modal = document.getElementById("edit-task-modal");

    modal.setAttribute('data-group-index', groupIndex);
    modal.setAttribute('data-task-index', taskIndex);

    document.getElementById("edit-modal-group-name").textContent = `(${data[groupIndex].group})`;
    document.getElementById("edit-modal-task-name").textContent = `- ${data[groupIndex].tasks[taskIndex].task}`;
  }

  const addGroup = () => {
    const input = document.querySelector('.group-input');

    const fnData = [...data];
    fnData.push({ group: input.value, pinned: false, tasks: [] });

    setData(fnData);
    closeModal();
    localStorage.setItem("todo-app-data", JSON.stringify(fnData));
  }

  const removeGroup = (index) => {

    const fnData = [...data];
    fnData.splice(index, 1);

    setData(fnData);
    localStorage.setItem("todo-app-data", JSON.stringify(fnData));

  }

  const editGroupModal = (index) => {
    openEditGroupModal();
    document.getElementById("edit-group-modal").setAttribute("data-index", index);
    document.getElementById("edit-group-modal-group-name").textContent = `(${data[index].group})`;
  }

  const editGroup = () => {

    const input = document.getElementById("edit-group-input");
    const index = document.getElementById("edit-group-modal").getAttribute("data-index");
    let fnData = [...data];

    fnData[index].group = input.value;
    setData(fnData);
    localStorage.setItem("todo-app-data", JSON.stringify(fnData));

    closeEditGroupModal();
  }

  const addGroupPin = (index) => {
    let fnData = [...data];
    fnData[index].pinned = true;

    setData(fnData);
    localStorage.setItem("todo-app-data", JSON.stringify(fnData));
  }

  const removeGroupPin = (index) => {
    let fnData = [...data];
    fnData[index].pinned = false;

    setData(fnData);
    localStorage.setItem("todo-app-data", JSON.stringify(fnData));
  }

  // when add task button is clicked.
  const addTaskModal = (groupIndex) => {
    openTaskModal(groupIndex);
    document.getElementById("modal-group-name").textContent = `(${data[groupIndex].group})`;
  }

  const addTask = () => {
    const mainModalIndexAttribute = document.getElementById("task-modal").getAttribute("data-index");
    const input = document.getElementById('task-input');

    let fnData = [...data];

    fnData[mainModalIndexAttribute].tasks.push({ task: input.value, done: false });
    setData(fnData);
    localStorage.setItem("todo-app-data", JSON.stringify(fnData));
    closeTaskModal();
  }

  const editTaskModal = (groupIndex, taskIndex) => {

    openEditTaskModal(groupIndex, taskIndex);

  }

  const editTask = () => {
    const groupIndex = document.getElementById("edit-task-modal").getAttribute("data-group-index");
    const taskIndex = document.getElementById("edit-task-modal").getAttribute("data-task-index");

    const input = document.getElementById("edit-task-input");

    let fnData = [...data];
    fnData[groupIndex].tasks[taskIndex].task = input.value;
    setData(fnData);

    localStorage.setItem("todo-app-data", JSON.stringify(fnData));
    closeEditTaskModal();
  }

  const setTaskAsDone = (groupIndex, taskIndex) => {
    const updatedData = [...data];
    updatedData[groupIndex].tasks[taskIndex].done = true;

    localStorage.setItem("todo-app-data", JSON.stringify(updatedData));
    setData(updatedData);
  }

  const setTaskAsPending = (groupIndex, taskIndex) => {
    const updatedData = [...data];
    updatedData[groupIndex].tasks[taskIndex].done = false;

    localStorage.setItem("todo-app-data", JSON.stringify(updatedData));
    setData(updatedData);
  }

  const deleteTask = (groupIndex, taskIndex) => {
    const updatedData = [...data];
    updatedData[groupIndex].tasks.splice(taskIndex, 1);

    localStorage.setItem("todo-app-data", JSON.stringify(updatedData));
    setData(updatedData);
  }

  const changeTheme = () => {
    const currentData = darkTheme;
    setDarkTheme(!currentData);
    document.body.classList.remove(currentData == false ? 'light' : 'dark');
    document.body.classList.add(currentData == true ? 'light' : 'dark');
    localStorage.setItem("todo-app-theme-isdark", !currentData);
  }

  const setTheme = () => {
    const storage = JSON.parse(localStorage.getItem("todo-app-theme-isdark"));
    if (storage == true) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }

  useEffect(() => {

    if (!localStorage.getItem("todo-app-data")) {
      localStorage.setItem("todo-app-data", "[]");
    }

    if (!localStorage.getItem("todo-app-theme-isdark")) {
      localStorage.setItem("todo-app-theme-isdark", false);
    }

    setDarkTheme(JSON.parse(localStorage.getItem("todo-app-theme-isdark")));
    setData(JSON.parse(localStorage.getItem("todo-app-data")));

    setTheme();

    addEventListener("keydown", (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeTaskModal();
        closeEditTaskModal();
        closeEditGroupModal();
      };
    });

    const modalWrapper = document.querySelectorAll(".mainModal");
    modalWrapper.forEach((wrapper) => {
      wrapper.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-modal") === 'true') {
          closeModal();
          closeTaskModal();
          closeEditTaskModal();
          closeEditGroupModal();
        };
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Advanced TO-DO App</title>
        <meta name="description" content="Advanced TO-DO: manage your tasks with this app. It has a groups feature to separate different types of tasks from other tasks." />
      </Head>

      <main className={`${styles.main} ${darkTheme ? styles.dark : styles.light}`}>

        <h1 className={styles.title}>TO-DO</h1>

        <button className={styles.themeWrapper} onClick={changeTheme}>
          {
            darkTheme ? <BsMoon className={styles.themeIcon} /> : <BsSun className={styles.themeIcon} />
          }
        </button>

        <button className={`${styles.createGroupBtn} createGroupBtn`} onClick={openModal}>
          <BsPlus className={styles.btnIcon} />
          Create a group
        </button>

        <div className={styles.groupContainer}>

          {data.sort((a, b) => {
            if (a.pinned && !b.pinned) {
              return -1;
            } else if (!a.pinned && b.pinned) {
              return 1;
            } else {
              return 0;
            }
          }).map((item, k) => (
            <div className={`${styles.group} ${item.pinned ? styles.pinned : ''}`} key={k}>
              <h2 className={styles.groupTitle}>
                <span className={styles.actualTitle}>{item.group}</span>

                <div className={styles.titleMethodWrapper}>

                  <button className={styles.titleMethodButton} onClick={() => removeGroup(k)}>
                    <BsTrash className={styles.titleMethodIcon} />
                  </button>

                  <button className={styles.titleMethodButton} onClick={() => editGroupModal(k)}>
                    <BsPencilSquare className={styles.titleMethodIcon} />
                  </button>

                  {
                    item.pinned ?
                      <button onClick={() => removeGroupPin(k)} className={styles.titleMethodButton}>
                        <RemovePin customStrokeColor={darkTheme ? '#ffffff' : '#000000'} />
                      </button>
                      :
                      <button onClick={() => addGroupPin(k)} className={styles.titleMethodButton}>
                        <BsPinAngle className={styles.titleMethodIcon} />
                      </button>
                  }

                </div>
              </h2>

              <button className={styles.createTaskBtn} data-index={k} onClick={() => addTaskModal(k)}><BsPlus className={styles.addTaskIcon} /> Add Task</button>

              <ul className={styles.tasks}>

                {item.tasks.map((task, i) => (

                  <li className={`${styles.task} ${task.done ? styles.done : styles.pending}`} key={i + 1000}>


                    <span className={styles.text}><span className={styles.actualTask}>{task.task}</span></span>

                    <div className={styles.taskFunctions}>
                      
                      <button onClick={() => editTaskModal(k, i)} className={styles.taskFunctionsButton}>
                        <BsPencilSquare className={styles.editIcon} />
                      </button>

                      
                      {
                        task.done ?
                        <button onClick={() => setTaskAsPending(k, i)} className={styles.taskFunctionsButton}>
                          <BsXLg className={styles.statusIcon} />
                        </button>
                        :
                        <button onClick={() => setTaskAsDone(k, i)} className={styles.taskFunctionsButton}>
                          <BsCheck2Square className={styles.statusIcon} />
                        </button>
                      }

                      <button onClick={() => deleteTask(k, i)} className={styles.taskFunctionsButton}>
                        <BsTrash className={styles.deleteTask} />
                      </button>

                    </div>

                  </li>

                ))}

              </ul>
            </div>
          ))}

        </div>

        <div className={`${styles.mainModal} ${groupVisible ? styles.visible : ''} mainModal`} data-modal="true">

          <div className={styles.modal}>

            <BsXLg className={styles.modalClose} onClick={closeModal} />

            <h2 className={styles.modalTitle}>Create Group</h2>
            <input className={`${styles.modalInput} group-input`} placeholder="enter group name..." maxLength="15" />

            <button className={styles.modalBtn} onClick={addGroup}>Confirm</button>

          </div>

        </div>

        <div className={`${styles.mainModal} ${editGroupVisible ? styles.visible : ""} mainModal`} data-modal="true" id="edit-group-modal">

          <div className={styles.modal}>

            <BsXLg className={styles.modalClose} onClick={closeEditGroupModal} />

            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>Edit Group</h2>
              <span className={styles.groupName} id="edit-group-modal-group-name"></span>
            </div>

            <input className={`${styles.modalInput} edit-group-input`} placeholder="enter group name..." id="edit-group-input" maxLength="15" />

            <button className={styles.modalBtn} onClick={editGroup}>Confirm</button>

          </div>

        </div>

        <div className={`${styles.mainModal} ${taskVisible ? styles.visible : ""} mainModal`} data-modal="true" id="task-modal">

          <div className={styles.modal}>

            <BsXLg className={styles.modalClose} onClick={closeTaskModal} />

            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>Add Task</h2>
              <span className={styles.groupName} id="modal-group-name"></span>
            </div>
            <input className={styles.modalInput} placeholder="enter task..." id="task-input" maxLength="40" />

            <button className={styles.modalBtn} id="confirm-task-btn" onClick={addTask}>Confirm</button>

          </div>

        </div>

        <div className={`${styles.mainModal} ${editTaskVisible ? styles.visible : ""} mainModal`} data-modal="true" id="edit-task-modal">

          <div className={styles.modal}>

            <BsXLg className={styles.modalClose} onClick={closeEditTaskModal} />

            <h2 className={styles.modalTitle} id="edit-task-modal-title">Edit Task</h2>

            <div className={styles.modalHead}>
              <span className={styles.groupName} id="edit-modal-group-name"></span>
              <span className={styles.groupName} id="edit-modal-task-name"></span>
            </div>

            <input className={`${styles.modalInput} edit-task-input`} id="edit-task-input" placeholder="enter new task..." maxLength="40" />

            <button className={styles.modalBtn} onClick={editTask}>Confirm</button>

          </div>

        </div>
      </main>
    </div>
  )
}
