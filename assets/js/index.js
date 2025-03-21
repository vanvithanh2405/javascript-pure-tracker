const trackerList = document.getElementById('trackerList');
const trackerForm = document.getElementById('trackerForm');

const descriptionInput = document.getElementById('description');
const authorInput = document.getElementById('author');
const seveirtyInput = document.getElementById('severity');
const searchInput = document.getElementById("search-box");
const sortValue = document.getElementById('sort-value');
const filterAllBtn = document.getElementById('all-status');
const filterNewBtn = document.getElementById("new-status");
const filterCloseBtn = document.getElementById("close-status");

// pure function, mutate/immutate
//  config
const STATUS_NEW = 'new';
const STATUS_CLOSE = 'close';

let currentFilter = "all";
const TRACKER_DATA = 'tkdt';
let trackers = localStorage.getItem(TRACKER_DATA) ? JSON.parse(localStorage.getItem(TRACKER_DATA)) : [];

function renderTrackerList(dataSource) {
  // reset trackerList
  trackerList.innerHTML = '';

  dataSource.forEach(tracker => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'rowElement')
    rowElement.setAttribute('class', 'w-full g:w-4/12 lg:mb-0 mb-7 bg-white p-6 shadow rounded');

    const headerElement = document.createElement('div');
    headerElement.setAttribute('id', 'headerElement');
    headerElement.setAttribute('class', 'flex items-center border-b border-gray-200 pb-6');

    const imgElement = document.createElement('img');
    imgElement.setAttribute('id', 'imgElement');
    imgElement.setAttribute('src', 'https://placehold.co/48x48');
    imgElement.setAttribute('class', 'w-20 h-20 rounded-full');
    imgElement.setAttribute('alt', 'user');

    const authorElement = document.createElement('div');
    authorElement.setAttribute('id', 'authorElement');
    authorElement.setAttribute('class', 'flex items-start justify-between w-full ml-3 text-[18px]');
    authorElement.innerHTML = tracker.author;

    const statusElement = document.createElement('div');
    statusElement.setAttribute('id', 'statusElement');
    statusElement.setAttribute('class', 'flex items-center text-sm font-medium text-gray-900 me-3');

    const iconElement = document.createElement("span");
    iconElement.setAttribute("id", "iconElement");
    iconElement.setAttribute(
      "class",
      `flex w-2.5 h-2.5 ${tracker.status === "new" ? "bg-green-600" : "bg-gray-400"
      } rounded-full me-1.5 shrink-0`
    );


    const textStatusElement = document.createElement('span');
    textStatusElement.innerHTML = tracker.status === 'new' ? 'New' : 'Close';

    statusElement.appendChild(iconElement);
    statusElement.appendChild(textStatusElement)

    headerElement.appendChild(imgElement);
    headerElement.appendChild(authorElement);
    headerElement.appendChild(statusElement);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.setAttribute('id', 'descriptionContainer');
    descriptionContainer.setAttribute('class', 'px-2');

    const textDescription = document.createElement('p');
    textDescription.setAttribute('id', 'textDescription');
    textDescription.setAttribute('class', 'focus:outline-none text-sm leading-5 py-4 text-gray-600');
    textDescription.innerHTML = tracker.description

    const tagElementContainer = document.createElement('div');
    tagElementContainer.setAttribute('id', 'tagElementContainer');
    tagElementContainer.setAttribute('class', 'focus:outline-none flex');

    const textTagElement = document.createElement('div');
    textTagElement.setAttribute('id', 'textTagElement');
    textTagElement.setAttribute('class', 'py-5 px-10 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100');
    textTagElement.innerHTML = tracker.severity;

    tagElementContainer.appendChild(textTagElement);

    descriptionContainer.appendChild(textDescription);
    descriptionContainer.appendChild(tagElementContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', 'buttonContainer');
    buttonContainer.setAttribute('class', 'text-right');

    const deleteBtnElement = document.createElement('button');
    deleteBtnElement.setAttribute('id', 'deleteBtnElement');
    deleteBtnElement.setAttribute('type', 'button');
    deleteBtnElement.setAttribute('class', 'cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5');
    deleteBtnElement.onclick = () => deleteTracker(tracker.id);
    deleteBtnElement.innerHTML = 'Delete';

    const statusButton = document.createElement("button");
    statusButton.setAttribute("id", "statusButton");
    statusButton.setAttribute("type", "button");
    statusButton.setAttribute(
      "class",
      "cursor-pointer focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3"
    );
    statusButton.innerHTML = tracker.status === "new" ? "Close" : "New";
    statusButton.onclick = () => updateStatus(tracker.id);

    buttonContainer.appendChild(statusButton);
    buttonContainer.appendChild(deleteBtnElement);


    rowElement.appendChild(headerElement);
    rowElement.appendChild(descriptionContainer);
    rowElement.appendChild(buttonContainer);

    trackerList.appendChild(rowElement);
  })
}

// delete tracker
// function deleteTracker(trackerId) {
//   const trackerFiltered = trackers.filter(tracker => tracker.id !== trackerId);
//   renderTrackerList(trackerFiltered)
// }
function deleteTracker(trackerId) {
  // Cập nhật lại biến trackers với danh sách đã lọc
  const trackersFiltered = trackers.filter((tracker) => tracker.id !== trackerId);
  trackers = trackersFiltered
  // Gọi hàm render với danh sách trackers mới
  localStorage.setItem(TRACKER_DATA, JSON.stringify(trackers));
  renderTrackerList(trackers);
}

//search by description
function searchDesc() {
  const searchItem = searchInput.value.toLowerCase();
  const filteredTrackers = trackers.filter((tracker) =>
    tracker.description.toLowerCase().includes(searchItem)
  );
  renderTrackerList(filteredTrackers);
}

//update status
// objA = {}, objB = objA. objB.name = 'abc', objA = { name: 'abc' }
function updateStatus(trackerId) {
  const clonedTracker = JSON.parse(JSON.stringify(trackers)); // deep clone
  const trackerIndex = clonedTracker.findIndex((tracker) => tracker.id === trackerId);

  // return early
  if (trackerIndex === -1) return;

  clonedTracker[trackerIndex].status = clonedTracker[trackerIndex].status === "new" ? "close" : "new";
  trackers = clonedTracker;

  if (currentFilter === "close") {
    filterByStatus("close");
    return;
  }

  if (currentFilter === "new") {
    filterByStatus("new");
    return;
  }
  localStorage.setItem(TRACKER_DATA, JSON.stringify(trackers));
  renderTrackerList(clonedTracker);
}

searchInput.addEventListener("input", searchDesc);

// create tracker
trackerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const description = descriptionInput.value;
  const author = authorInput.value;
  const severity = seveirtyInput.value;
  const trackerItem = {
    id: Date.now(),
    author,
    description,
    severity,
    status: 'new'
  }
  trackers.push(trackerItem);
  localStorage.setItem(TRACKER_DATA, JSON.stringify(trackers));
  renderTrackerList(trackers);
})

//order by description
function compareValue(a, b, sortOption) {
  if (sortOption === 'asc') {
    return a.description > b.description ? 1 : -1;
  }
  return a.description > b.description ? -1 : 1;
}
sortValue.addEventListener('change', function () {
  const sortOption = sortValue.value;
  const clonedTracker = JSON.parse(JSON.stringify(trackers)); // deep clone 
  clonedTracker.sort((a, b) => compareValue(a, b, sortOption));
  renderTrackerList(clonedTracker);
})

//filter All/Open/Close
filterAllBtn.addEventListener("click", function () {
  currentFilter = 'all';
  filterByStatus("all");
});

filterNewBtn.addEventListener("click", function () {
  currentFilter = 'new';
  filterByStatus("new");
});

filterCloseBtn.addEventListener("click", function () {
  currentFilter = 'close';
  filterByStatus('close');
});

function filterByStatus(status) {
  console.log('filter by status: ', {
    trackers
  })
  const filterStatus = trackers.filter((tracker) => {
    if (status === 'all') return tracker;
    return tracker.status === status
  });

  filterAllBtn.style.opacity = 0.7;
  filterNewBtn.style.opacity = 0.7;
  filterCloseBtn.style.opacity = 0.7;

  switch (status) {
    case 'new': {
      filterNewBtn.style.opacity = 1;
      break;
    }
    case 'close': {
      filterCloseBtn.style.opacity = 1;
      break;
    }
    default: {
      filterAllBtn.style.opacity = 1;
      break
    }
  }
  renderTrackerList(filterStatus);
}

renderTrackerList(trackers)