const trackerList = document.getElementById('trackerList');
const trackerForm = document.getElementById('trackerForm');

const descriptionInput = document.getElementById('description');
const authorInput = document.getElementById('author');
const seveirtyInput = document.getElementById('severity');

const trackers = [];

function renderTrackerList(dataSource = []) {
  console.log('dataSource: ', dataSource);
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
    imgElement.setAttribute('class', 'w-12 h-12 rounded-full');
    imgElement.setAttribute('alt', 'user');

    const authorElement = document.createElement('div');
    authorElement.setAttribute('id', 'authorElement');
    authorElement.setAttribute('class', 'flex items-start justify-between w-full ml-3 text-[18px]');
    authorElement.innerHTML = tracker.author;

    const statusElement = document.createElement('div');
    statusElement.setAttribute('id', 'statusElement');
    statusElement.setAttribute('class', 'flex items-center text-sm font-medium text-gray-900 me-3');

    const iconElement = document.createElement('span');
    iconElement.setAttribute('id', 'iconElement');
    iconElement.setAttribute('class', 'flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 shrink-0');

    const textStatusElement = document.createElement('span');
    textStatusElement.innerHTML = tracker.status

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
    textTagElement.setAttribute('class', 'py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100');
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

    buttonContainer.appendChild(deleteBtnElement);

    rowElement.appendChild(headerElement);
    rowElement.appendChild(descriptionContainer);
    rowElement.appendChild(buttonContainer);

    trackerList.appendChild(rowElement);
  })
}

// delete tracker
function deleteTracker(trackerId) {
  const trackerFiltered = trackers.filter(tracker => tracker.id !== trackerId);
  renderTrackerList(trackerFiltered)
}

// create tracker
trackerForm.addEventListener('submit', function(e) {
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
  renderTrackerList(trackers);
})
