 alert("Developed By Daksh Shah ")

  const foldersContainer = document.getElementById('folders');
    let folders = JSON.parse(localStorage.getItem('folders')) || {};

    function saveToLocalStorage() {
      localStorage.setItem('folders', JSON.stringify(folders));
    }

    function renderFolders() {
      foldersContainer.innerHTML = '';
      for (const folderName in folders) {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';

        const title = document.createElement('span');
        title.textContent = folderName;
        folderDiv.appendChild(title);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.background = 'red';
        deleteBtn.onclick = (e) => {
          e.stopPropagation();
          deleteFolder(folderName);
        };

        folderDiv.appendChild(deleteBtn);
        folderDiv.addEventListener('click', () => openFolder(folderName));
        foldersContainer.appendChild(folderDiv);
      }
    }

    function addFolder() {
      const folderName = document.getElementById('folder-name').value;
      if (!folderName) {
        alert('Please enter a folder name!');
        return;
      }

      if (folders[folderName]) {
        alert('Folder already exists!');
        return;
      }

      folders[folderName] = [];
      saveToLocalStorage();
      renderFolders();
      document.getElementById('folder-name').value = '';
    }

    function deleteFolder(folderName) {
      if (confirm(`Are you sure you want to delete the folder "${folderName}" and all its contents?`)) {
        delete folders[folderName];
        saveToLocalStorage();
        renderFolders();
      }
    }

    function openFolder(folderName) {
      const container = document.querySelector('.container');
      container.innerHTML = `<div class="actions">
        <button onclick="goBack()">Back</button>
        <h2>${folderName}</h2>
        <input type="text" id="note-input" placeholder="Add a note" />
        <button onclick="addNote('${folderName}')" class="big-btn">Add Note</button>
        <button style="background: red;" onclick="deleteFolder('${folderName}')" class="big-btn">Delete Folder</button>
      </div>
      <div id="notes" class="notes-container"></div>`;

      renderNotes(folderName);
    }

    function goBack() {
      location.reload()
    }

    function renderNotes(folderName) {
      const notesContainer = document.getElementById('notes');
      notesContainer.innerHTML = '';

      folders[folderName].forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        const noteContent = document.createElement('div');
        noteContent.className = 'note-content';
        noteContent.contentEditable = true;
        noteContent.textContent = note;
        noteContent.addEventListener('input', () => updateNoteContent(folderName, index, noteContent.textContent));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(folderName, index);

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(deleteButton);
        notesContainer.appendChild(noteDiv);
      });
    }

    function addNote(folderName) {
      const noteInput = document.getElementById('note-input');
      const noteText = noteInput.value;
      if (!noteText) {
        alert('Please enter a note!');
        return;
      }

      folders[folderName].push(noteText);
      saveToLocalStorage();
      renderNotes(folderName);
      noteInput.value = '';
    }

    function updateNoteContent(folderName, index, content) {
      folders[folderName][index] = content;
      saveToLocalStorage();
    }

    function deleteNote(folderName, index) {
      folders[folderName].splice(index, 1);
      saveToLocalStorage();
      renderNotes(folderName);
    }

    renderFolders();