// Array of task
const state = {
    taskList: [],
  };
  
  // DOM - document object
  const taskContents = document.querySelector(".task__contents");
  const taskModal = document.querySelector(".task__modal__body");
  
  const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
      <div class='card shadow-sm task__card'>
        <div class='card-header d-flex gap-2 justify-content-end task__card__header'>

         
          <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)">
            <i class='fas fa-pencil-alt' name=${id}></i>
          </button>
          <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
            <i class='fas fa-trash-alt' name=${id}></i>
          </button>
        </div>

        <div class='card-body'>
          ${
            url
              ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
              : `
        <img width='100%' height='150px' style="object-fit: cover; object-position: center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAXVBMVEUpMTRnjLEiJiNcfJxrkbgkKSgoLzEmLS5EWWxXdpM0QkxAVGUuOT9kiKslKytSbohPaYJggqM+UF8wO0I6SldIX3Q2RE9LY3oyP0crNDk+UWFWdJA7S1lPaH9jhacMRR/OAAADlElEQVR4nO3c7XKqMBSFYSi4CSCB8CGkKvd/mUfAVoNgHUiPdbuef51aprwDAQLiOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP6NAbiySAT17jVYIZFNloUVZ1cjg2Wu1WJypxLUqUVn87LVaiLbKtxuj46vti+4wwvKmMUjEs9drkaBSv1HDdVX1isOHPA45fIuGHLV89rot8DH8861oIksa0Q6BP569bgucc3gbsmbjMchhb5HIYeCWo9/kly+SVQ4K9GlU3RXLT7M55dBNlXbXHfu6WrqBMMpBTfx1zq6KhT3Y5CAdeZcLmHa37LqDTY5tap5o74sli2ScY8nmwSVHUI0uw/wqWtCDTY56PPNRl/M5Zs9NuOSQ2aiGG4r5s4/oc2ZXYpMjHefw5ictxN7NDpM93jAH6dM6t+nklPn75aAy7H+fTu0vXHLcHFnmdgfKz2Nu0k4cetjkEKMavmimclBwmW0Ob2cGuOSgnWfmULvJv9nGV58pb3YnLjkcKcxpdTG5bezMZDeXemxyUCSSy5mYX01tHAGZI0ySCGn2YJPDISevPZWctF74OTmM5sfxbSpVlcYn+OQ4BZFadNM/x6aYOsaSbt0bbWh8lFMOx9GlOPkstlMf11O3MBOVX/fgleN0HD2ZPt8o5+5uX4+nzHLMIhnP1EhUeVnAu+TQ4Z1HH7LvJTDNMdpf6HNiFL0S7s5/wDMHRdr4udjfreG2mR56sMxBjrfPrzYQEd6v0e0vh/4AwzGHLivfVeXXBhLE9/eUgddfADPMQU3abQ3ZefvQdDMVMqmfHmGYQ59nkVXe/USifuwBsrR74odhju9L/bS7Exf8PG4wzkEkLvcms1LK+NFHLVnmOJinW573aA2OOUgezEmg5PEHT/nloObeqfi75SA5e9X6hjkoEt699X2vHNtov+p5fV45qBHrvr3AKseqUZRfDpmt/WYLrxyPXachB3IgB3Ighwk5DMhhMHOsPO/weeXIkpUyTjkcvV2pvw/BJoez9kuS/UL45LACOQwMcqhSB5boUr1wjuEQmWQitkRk55n3V8zx9UoCi+8kGJanjq/4SgLK10wV3+HlL/k+k039Ozlqi4Pz/xQcbh6cXS05Hl7xZSYdKoTVl5n0w4dY+p3kv6DIhVX5ou/f/hlEtk46Bmve7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj/wCGXEuzlUGJPAAAAABJRU5ErkJggg==" alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
          }
          <h4 class='task__card__title text-primary'>${title}</h4>
          <p class='description trim-3-lines text-muted' data-gram_editor='false'>
            ${description}
          </p>
          <div class='tags text-light d-flex flex-wrap'>
            <span class='badge bg-secondary m-1'>${type}</span>
          </div>
        </div>
        <div class='card-footer'>
          <button 
          type='button' 
          class='btn btn-outline-dark float-right' 
          data-bs-toggle='modal'
          data-bs-target='#showTask'
          id=${id}
          onclick='openTask.apply(this, arguments)'
          >
            Open Task
          </button>
        </div>
      </div>
    </div>
  `;
  
  const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
      <div id=${id}>
      ${
        url
          ? `
          <img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
          : `
        <img width='100%' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAXVBMVEUpMTRnjLEiJiNcfJxrkbgkKSgoLzEmLS5EWWxXdpM0QkxAVGUuOT9kiKslKytSbohPaYJggqM+UF8wO0I6SldIX3Q2RE9LY3oyP0crNDk+UWFWdJA7S1lPaH9jhacMRR/OAAADlElEQVR4nO3c7XKqMBSFYSi4CSCB8CGkKvd/mUfAVoNgHUiPdbuef51aprwDAQLiOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP6NAbiySAT17jVYIZFNloUVZ1cjg2Wu1WJypxLUqUVn87LVaiLbKtxuj46vti+4wwvKmMUjEs9drkaBSv1HDdVX1isOHPA45fIuGHLV89rot8DH8861oIksa0Q6BP569bgucc3gbsmbjMchhb5HIYeCWo9/kly+SVQ4K9GlU3RXLT7M55dBNlXbXHfu6WrqBMMpBTfx1zq6KhT3Y5CAdeZcLmHa37LqDTY5tap5o74sli2ScY8nmwSVHUI0uw/wqWtCDTY56PPNRl/M5Zs9NuOSQ2aiGG4r5s4/oc2ZXYpMjHefw5ictxN7NDpM93jAH6dM6t+nklPn75aAy7H+fTu0vXHLcHFnmdgfKz2Nu0k4cetjkEKMavmimclBwmW0Ob2cGuOSgnWfmULvJv9nGV58pb3YnLjkcKcxpdTG5bezMZDeXemxyUCSSy5mYX01tHAGZI0ySCGn2YJPDISevPZWctF74OTmM5sfxbSpVlcYn+OQ4BZFadNM/x6aYOsaSbt0bbWh8lFMOx9GlOPkstlMf11O3MBOVX/fgleN0HD2ZPt8o5+5uX4+nzHLMIhnP1EhUeVnAu+TQ4Z1HH7LvJTDNMdpf6HNiFL0S7s5/wDMHRdr4udjfreG2mR56sMxBjrfPrzYQEd6v0e0vh/4AwzGHLivfVeXXBhLE9/eUgddfADPMQU3abQ3ZefvQdDMVMqmfHmGYQ59nkVXe/USifuwBsrR74odhju9L/bS7Exf8PG4wzkEkLvcms1LK+NFHLVnmOJinW573aA2OOUgezEmg5PEHT/nloObeqfi75SA5e9X6hjkoEt699X2vHNtov+p5fV45qBHrvr3AKseqUZRfDpmt/WYLrxyPXachB3IgB3Ighwk5DMhhMHOsPO/weeXIkpUyTjkcvV2pvw/BJoez9kuS/UL45LACOQwMcqhSB5boUr1wjuEQmWQitkRk55n3V8zx9UoCi+8kGJanjq/4SgLK10wV3+HlL/k+k039Ozlqi4Pz/xQcbh6cXS05Hl7xZSYdKoTVl5n0w4dY+p3kv6DIhVX5ou/f/hlEtk46Bmve7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj/wCGXEuzlUGJPAAAAABJRU5ErkJggg==" alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
      }
      <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
      <h2 class='my-3'>${title}</h2>
      <p class='lead'>
        ${description}
      </p>
      </div>
    `;
  };
  
  const updateLocalStorage = () => {
    localStorage.setItem(
      "tasks",
      JSON.stringify({
        tasks: state.taskList,
      })
    );
  };
  
  const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks);
  
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.map((cardDate) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
  };
  
  const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageUrl").value,
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      type: document.getElementById("tags").value,
    };
  
    if (input.title === "" || input.description === "" || input.type === "") {
      return alert("Please fill all the fields");
    }
  
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({
        ...input,
        id,
      })
    );
  
    state.taskList.push({ ...input, id });
    updateLocalStorage();
  };
  
  const openTask = (e) => {
    if (!e) e = window.event;
  
    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
  };

  // Deleting the card
  const deleteTask = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.getAttribute("name");  //accessing the target id
    const type = e.target.tagName;  // getting the type of button either I or BUTTON
    const removeTask = state.taskList.filter(({ id }) => id !== targetID);  // removing the id from the tasklist array
    state.taskList = removeTask; 
  
    updateLocalStorage();
    if (type === "BUTTON") // if the type of button is BUTTON then we go inside the 'if' part 
    {
      return e.target.parentNode.parentNode.parentNode.parentNode.removeChild  // parentNode means go 1 step back
      (
        e.target.parentNode.parentNode.parentNode
      );
    }
  
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  };
  
  // Edit the card
  const editTask = (e) => {
    if (!e) e = window.event;
  
    const targetID = e.target.id;
    const type = e.target.tagName;  
  
    let parentNode; 
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;
  
    if (type === "BUTTON") {
      parentNode = e.target.parentNode.parentNode;  // going 2 step back to fetch the whole card variables 
    } else {
      parentNode = e.target.parentNode.parentNode.parentNode;
    }
  
    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];
  
    taskTitle.setAttribute("contenteditable", "true");    // to make the attribute editable
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
  
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
  };
  

  const saveEdit = (e) => {
    if (!e) e = window.event;
  
    const targetID = e.target.id;

    const parentNode = e.target.parentNode.parentNode;

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];
  
    const updateData = {
      taskTitle: taskTitle.innerHTML,
      taskDescription: taskDescription.innerHTML,
      taskType: taskType.innerHTML,
    };
  
    let stateCopy = state.taskList;
  
    stateCopy = stateCopy.map((task) =>
      task.id === targetID
        ? {
            id: task.id,
            title: updateData.taskTitle,
            description: updateData.taskDescription,
            type: updateData.taskType,
            url: task.url,
          }
        : task
    );
  
    state.taskList = stateCopy;

    updateLocalStorage();
  
    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");
  
    submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
  };
  
  const searchTask = (e) => {
    if (!e) e = window.event;
  
    while (taskContents.firstChild) {
      taskContents.removeChild(taskContents.firstChild);
    }
  
    const resultData = state.taskList.filter(({ title }) => {
      return title.toLowerCase().includes(e.target.value.toLowerCase());
    });
  
    console.log(resultData);
  
    resultData.map((cardData) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
  };