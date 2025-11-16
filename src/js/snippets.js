export const codeSnippets = {
  // HTML Example
  htmlExample: `
<body>
  <header>
    <h1>Welcome to My Web House</h1>
  </header>
  <main>
    <p>This is where the main content goes.</p>
  </main>
  <footer>
    <p>© <span id="currentYear"></span> My Web House</p>
  </footer>
</body>

<!-- The following script tag is used to get the current year -->
<script>
  document.getElementById('currentYear').textContent = new Date().getFullYear();
</script>
`,

  // CSS Example
  cssExample: `
body {
  font-family: Arial, sans-serif;
}

header {
  background-color: #007bff;
  color: white;
  padding: 20px;
}

main {
  padding: 20px;
}

footer {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}
`,

  // JavaScript Example
  jsExample: `
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

// Add this button within the main tag of your HTML
// <button onclick="toggleTheme()">Toggle Dark Mode</button>
`,

  // Data Table Example
  tableExample: `
<table>
  <tr>
    <td>Heading 1</td>
    <td>Heading 2</td>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>  
</table>
`,

  // Responsive Table Example
  tableResponsive: `
@media screen and (max-width: 600px) {
  table {
    display: block;
    overflow-x: auto;
  }
}
`,

  // Table Sorting Example
  tableSorting: `
const table = document.getElementById('dataTable');
const headers = table.querySelectorAll('th');

headers.forEach((header, index) => {
  header.addEventListener('click', () => {
    const rows = Array.from(table.querySelectorAll('tr:not(:first-child)'));
    rows.sort((a, b) => a.cells[index].textContent.localeCompare(b.cells[index].textContent));
    rows.forEach(row => table.appendChild(row));
  });
});
`,

  // Table Filtering Example
  tableFiltering: `
const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('keyup', () => {
  const filter = filterInput.value.toLowerCase();
  const rows = table.querySelectorAll('tr:not(:first-child)');
  rows.forEach(row => {
    const cells = Array.from(row.cells);
    const matches = cells.some(cell => cell.textContent.toLowerCase().includes(filter));
    row.style.display = matches ? '' : 'none';
  });
});
`,

  // Pagination Example
  tablePagination: `
<body>
  <table id="dataTable"></table>
  <div id="pagination">
    <button onclick="loadPage(currentPage - 1)">Previous</button>
    <span id="pageInfo"></span>
    <button onclick="loadPage(currentPage + 1)">Next</button>
  </div>

  <script>
    let currentPage = 1;
    const rowsPerPage = 10;

    function loadPage(pageNumber) {
      // Simulating an API call
      fetch(\`https://jsonplaceholder.typicode.com/posts?_page=\${pageNumber}&_limit=\${rowsPerPage}\`)
        .then(response => response.json())
        .then(data => {
          updateTable(data);
          updatePagination(pageNumber);
        });
    }

    function updateTable(data) {
      const table = document.getElementById('dataTable');
      table.innerHTML = '<tr><th>ID</th><th>Title</th></tr>';
      data.forEach(item => {
        table.innerHTML += \`<tr><td>\${item.id}</td><td>\${item.title}</td></tr>\`;
      });
    }

    function updatePagination(pageNumber) {
      currentPage = pageNumber;
      document.getElementById('pageInfo').textContent = \`Page \${pageNumber}\`;
    }

    // Initial load
    loadPage(currentPage);
  </script>
</body>
`,

  // Table Editing Example
  tableEditing: `
<script>
  document.getElementById('editableTable').addEventListener('dblclick', function(e) {
    const cell = e.target.closest('td');
    if (!cell) return; // Clicked outside of a cell

    const input = document.createElement('input');
    input.value = cell.textContent;
    cell.textContent = '';
    cell.appendChild(input);
    input.focus();

    input.addEventListener('blur', function() {
      cell.textContent = this.value;
      console.log('Cell updated:', cell.textContent);
    });

    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        this.blur();
      }
    });
  });
</script>
`,

  // Accessible Table Example
  tableAccessible: `
<table role="grid" aria-labelledby="tableTitle" aria-describedby="tableDesc">
  <caption id="tableTitle">Employee Information</caption>
  <thead>
    <tr role="row">
      <th role="columnheader" scope="col">Name</th>
      <th role="columnheader" scope="col">Position</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row">
      <td role="gridcell">John Doe</td>
      <td role="gridcell">Developer</td>
    </tr>
    <tr role="row">
      <td role="gridcell">Jane Smith</td>
      <td role="gridcell">Designer</td>
    </tr>
  </tbody>
</table>
`,

  // Form Validation Example
  formValidation: `
<form id="userForm">
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <span id="emailError" class="error"></span>
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <span id="passwordError" class="error"></span>
  </div>
  <div>
    <label for="phone">Phone:</label>
    <input type="tel" id="phone" name="phone">
    <span id="phoneError" class="error"></span>
  </div>
  <button type="submit">Submit</button>
</form>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const passwordRegex = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const phoneRegex = /^\\+?(\\d{1,3})?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;

    const validateInput = (input, regex, errorElement, errorMessage) => {
      if (input.value && !regex.test(input.value)) {
        errorElement.textContent = errorMessage;
        input.setCustomValidity(errorMessage);
      } else {
        errorElement.textContent = '';
        input.setCustomValidity('');
      }
    };

    emailInput.addEventListener('input', () => {
      validateInput(emailInput, emailRegex, document.getElementById('emailError'), 'Please enter a valid email address');
    });

    passwordInput.addEventListener('input', () => {
      validateInput(passwordInput, passwordRegex, document.getElementById('passwordError'), 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
    });

    phoneInput.addEventListener('input', () => {
      validateInput(phoneInput, phoneRegex, document.getElementById('phoneError'), 'Please enter a valid phone number');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        console.log('Form is valid. Submitting...');
      } else {
        console.log('Form is invalid. Please correct the errors.');
      }
    });
  });
</script>
`,

  // Multi-Step Form Example
  formMultiStep: `
<form id="multi-step-form">
  <div class="step" id="step1">
    <h2>Personal Information</h2>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <button type="button" onclick="nextStep(2)">Next</button>
  </div>
  
  <div class="step" id="step2" style="display:none;">
    <h2>Address</h2>
    <label for="street">Street:</label>
    <input type="text" id="street" name="street" required>
    <label for="city">City:</label>
    <input type="text" id="city" name="city" required>
    <button type="button" onclick="prevStep(1)">Previous</button>
    <button type="button" onclick="nextStep(3)">Next</button>
  </div>
  
  <div class="step" id="step3" style="display:none;">
    <h2>Confirm</h2>
    <p>Please review your information:</p>
    <div id="summary"></div>
    <button type="button" onclick="prevStep(2)">Previous</button>
    <button type="submit">Submit</button>
  </div>
</form>

<script>
  let currentStep = 1;
  
  function nextStep(step) {
    // Validate current step before proceeding
    if (validateStep(currentStep)) {
      document.getElementById(\`step\${currentStep}\`).style.display = 'none';
      document.getElementById(\`step\${step}\`).style.display = 'block';
      currentStep = step;
      if (step === 3) updateSummary();
    }
  }
  
  function prevStep(step) {
    document.getElementById(\`step\${currentStep}\`).style.display = 'none';
    document.getElementById(\`step\${step}\`).style.display = 'block';
    currentStep = step;
  }
  
  function validateStep(step) {
    const currentStepElement = document.getElementById(\`step\${step}\`);
    const inputs = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    return isValid;
  }
  
  function updateSummary() {
    const summary = document.getElementById('summary');
    const inputs = document.querySelectorAll('#multi-step-form input');
    summary.innerHTML = '';
    
    inputs.forEach(input => {
      if (input.value.trim()) {
        summary.innerHTML += \`<p><strong>\${input.name}:</strong> \${input.value}</p>\`;
      }
    });
  }
  
  document.getElementById('multi-step-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Form submitted successfully');
    }
  });
</script>
`,

  // Dynamic Form Fields Example
  formDynamic: `
<form id="dynamic-form">
  <div id="dynamic-fields">
    <input type="text" name="field[]" required>
  </div>
  <button type="button" onclick="addField()">Add More</button>
  <button type="submit">Submit</button>
</form>

<script>
  function addField() {
    const container = document.getElementById('dynamic-fields');
    const newField = document.createElement('div');
    newField.innerHTML = \`
      <input type="text" name="field[]" required>
      <button type="button" onclick="removeField(this)">Remove</button>
    \`;
    container.appendChild(newField);
  }

  function removeField(button) {
    button.parentElement.remove();
  }

  document.getElementById('dynamic-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fields = this.querySelectorAll('input[name="field[]"]');
    const values = Array.from(fields).map(field => field.value);
    console.log('Submitted values:', values);
  });
</script>
`,

  // Autocomplete Example
  formAutocomplete: `
<label for="autocomplete">Search fruits:</label>
<input type="text" id="autocomplete" placeholder="Start typing..." aria-autocomplete="list" aria-controls="suggestions">
<ul id="suggestions" role="listbox"></ul>

<script>
  const input = document.getElementById('autocomplete');
  const suggestionsList = document.getElementById('suggestions');
  const suggestions = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry', 'Cherry'];
  let currentFocus = -1;
  
  input.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    const filtered = suggestions.filter(item => item.toLowerCase().includes(value));
    displaySuggestions(filtered);
  });
  
  input.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
      currentFocus++;
      addActive();
    } else if (e.key === 'ArrowUp') {
      currentFocus--;
      addActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1) {
        if (suggestionsList.children[currentFocus]) {
          suggestionsList.children[currentFocus].click();
        }
      }
    }
  });
  
  function displaySuggestions(items) {
    suggestionsList.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item;
      li.setAttribute('role', 'option');
      li.id = 'suggestion-' + index;
      li.addEventListener('click', () => {
        input.value = item;
        suggestionsList.innerHTML = '';
        input.focus();
      });
      suggestionsList.appendChild(li);
    });
    currentFocus = -1;
  }
  
  function addActive() {
    if (!suggestionsList.children.length) return false;
    removeActive();
    if (currentFocus >= suggestionsList.children.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (suggestionsList.children.length - 1);
    suggestionsList.children[currentFocus].classList.add('active');
    suggestionsList.children[currentFocus].setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', suggestionsList.children[currentFocus].id);
  }
  
  function removeActive() {
    for (let i = 0; i < suggestionsList.children.length; i++) {
      suggestionsList.children[i].classList.remove('active');
      suggestionsList.children[i].removeAttribute('aria-selected');
    }
  }
  
  // Close suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target !== input && e.target !== suggestionsList) {
      suggestionsList.innerHTML = '';
    }
  });
</script>
`,

  // File Upload/Preview Example
  fileUpload: `
<div id="drop-zone">Drop files here or click to upload</div>
<input type="file" id="file-input" multiple accept="image/*" style="display: none;">
<div id="preview-container"></div>

<script>
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container');

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => e.preventDefault());

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          const preview = document.createElement('img');
          preview.src = e.target.result;
          preview.style.maxWidth = '200px';
          preview.style.maxHeight = '200px';
          previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', e => {
    handleFiles(e.target.files);
  });
</script>
`,

  // Multimedia Elements Example
  multimediaElements: `
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>

<video controls width="600">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  Your browser does not support the video element.
</video>

<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description of image">
</picture>
`,

  // JS Multimedia Interaction Example
  multimediaJs: `
const video = document.querySelector('video');

video.addEventListener('play', function() {
  console.log('Video started playing');
});

video.addEventListener('pause', function() {
  console.log('Video paused');
});
`,

  // Custom Video Controls Example
  customVideoControls: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Video Player</title>
  <style>
    .video-container {
      max-width: 800px;
      margin: 0 auto;
    }
    #custom-controls {
      display: flex;
      align-items: center;
      background: #333;
      padding: 10px;
    }
    #custom-controls button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      margin-right: 10px;
    }
    #progressBar {
      flex-grow: 1;
    }
  </style>
</head>
<body>
  <div class="video-container">
    <video id="myVideo" width="100%">
      <source src="https://example.com.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div id="custom-controls">
      <button id="playPauseBtn">Play</button>
      <input type="range" id="progressBar" min="0" max="100" value="0">
      <button id="muteBtn">Mute</button>
    </div>
  </div>
  <script>
    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const muteBtn = document.getElementById('muteBtn');

    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('timeupdate', updateProgressBar);
    progressBar.addEventListener('change', setVideoProgress);
    muteBtn.addEventListener('click', toggleMute);

    function togglePlayPause() {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
      } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
      }
    }

    function updateProgressBar() {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.value = progress;
    }

    function setVideoProgress() {
      const time = (progressBar.value / 100) * video.duration;
      video.currentTime = time;
    }

    function toggleMute() {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    }
  </script>
</body>
</html>
`,

  // Adaptive Streaming Example
  adaptiveStreaming: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adaptive Streaming with HLS</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</head>
<body>
  <video id="video" controls></video>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const video = document.getElementById('video');
      const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: true,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play();
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            switch(data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("Fatal network error encountered, trying to recover");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Fatal media error encountered, trying to recover");
                hls.recoverMediaError();
                break;
              default:
                console.error("Fatal error, cannot recover");
                hls.destroy();
                break;
            }
          }
        });
      } 
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', function() {
          video.play();
        });
      } 
      else {
        console.error('HLS is not supported in this browser.');
      }
    });
  </script>
</body>
</html>
`,

  // Audio Visualization Example
  audioVisualization: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audio Visualization</title>
  <style>
    body { margin: 0; padding: 20px; background: #f0f0f0; text-align: center; font-family: Arial, sans-serif; }
    #visualizer { display: block; margin: 20px auto; background: #000; }
    button { padding: 10px 20px; font-size: 16px; margin: 10px; }
  </style>
</head>
<body>
  <h1>Audio Visualizer Demo</h1>
  <div>
    <button id="startButton">Start</button>
    <button id="pauseButton" disabled>Pause</button>
    <button id="stopButton" disabled>Stop</button>
  </div>
  <canvas id="visualizer"></canvas>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const startButton = document.getElementById('startButton');
      const pauseButton = document.getElementById('pauseButton');
      const stopButton = document.getElementById('stopButton');
      const canvas = document.getElementById('visualizer');
      const canvasCtx = canvas.getContext('2d');
      let audioContext, analyser, oscillator, animationFrame;

      function initAudio() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        
        oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
        
        oscillator.connect(analyser);
        analyser.connect(audioContext.destination);
        
        oscillator.start();

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        canvas.width = window.innerWidth - 40;
        canvas.height = 200;

        function draw() {
          animationFrame = requestAnimationFrame(draw);

          analyser.getByteFrequencyData(dataArray);

          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 255 * canvas.height;

            const r = barHeight + (25 * (i/bufferLength));
            const g = 250 * (i/bufferLength);
            const b = 50;

            canvasCtx.fillStyle = \`rgb(\${r},\${g},\${b})\`;
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
          }
        }

        draw();
      }

      startButton.addEventListener('click', function() {
        if (!audioContext) {
          initAudio();
        } else {
          audioContext.resume();
        }
        this.disabled = true;
        pauseButton.disabled = false;
        stopButton.disabled = false;
      });

      pauseButton.addEventListener('click', function() {
        if (audioContext.state === 'running') {
          audioContext.suspend();
          this.textContent = 'Resume';
          cancelAnimationFrame(animationFrame);
        } else if (audioContext.state === 'suspended') {
          audioContext.resume();
          this.textContent = 'Pause';
          requestAnimationFrame(draw);
        }
      });

      stopButton.addEventListener('click', function() {
        if (audioContext) {
          audioContext.close();
          audioContext = null;
          cancelAnimationFrame(animationFrame);
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
        startButton.disabled = false;
        pauseButton.disabled = true;
        stopButton.disabled = true;
        pauseButton.textContent = 'Pause';
      });

      window.addEventListener('resize', function() {
        if (canvas) {
          canvas.width = window.innerWidth - 40;
        }
      });
    });
  </script>
</body>
</html>
`,

  // Responsive Images Example
  responsiveImages: `
<img srcset="small.jpg 300w,
             medium.jpg 600w,
             large.jpg 1200w"
     sizes="(max-width: 500px) 300px,
            (max-width: 900px) 600px,
            1200px"
     src="fallback.jpg"
     alt="A responsive image">
`,

  // Lazy Loading Example
  lazyLoading: `
<img data-src="lazy-image.jpg" alt="A lazy-loaded image" class="lazy">

<script>
const images = document.querySelectorAll('img.lazy');
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
}, options);

images.forEach(img => observer.observe(img));
</script>
`,

  // Canvas Example
  canvasExample: `
<canvas id="myCanvas" width="200" height="200"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Face
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.stroke();

// Eyes
ctx.beginPath();
ctx.arc(80, 85, 5, 0, Math.PI * 2, true);
ctx.arc(120, 85, 5, 0, Math.PI * 2, true);
ctx.fillStyle = 'black';
ctx.fill();

// Mouth
ctx.beginPath();
ctx.arc(100, 110, 25, 0, Math.PI, false);
ctx.stroke();
</script>
`,

  // WebGL Example
  webglExample: `
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<div id="webgl-container"></div>

<script>
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
</script>
`,

  // Preloading Example
  preloadingExample: `
<link rel="preload" href="video.mp4" as="video" type="video/mp4">
`,

  // Accessible Video Example
  accessibleVideo: `
<div role="region" aria-label="Video Player">
  <video id="myVideo" preload="metadata">
    <source src="video.mp4" type="video/mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
  </video>
  <div role="group" aria-label="Video Controls">
    <button id="playPauseBtn" aria-label="Play/Pause">Play/Pause</button>
    <input type="range" id="progressBar" aria-label="Progress" min="0" max="100" value="0">
    <button id="muteBtn" aria-label="Mute">Mute</button>
  </div>
</div>
`,

  dataTableDemo: `
// Data Table Functionality
// Sorting
const table = document.getElementById('demoTable');
const tableHeaders = table.querySelectorAll('th');

tableHeaders.forEach((header, index) => {
    header.addEventListener('click', () => {
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        rows.sort((a, b) => a.cells[index].textContent.localeCompare(b.cells[index].textContent));
        rows.forEach(row => table.querySelector('tbody').appendChild(row));
    });
});

// Filtering
const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('keyup', () => {
    const filter = filterInput.value.toLowerCase();
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = Array.from(row.cells);
        const matches = cells.some(cell => cell.textContent.toLowerCase().includes(filter));
        row.style.display = matches ? '' : 'none';
    });
});

// Pagination
const rowsPerPage = 3;
let currentPage = 1;

const totalRows = table.querySelectorAll('tbody tr').length;
const totalPages = Math.ceil(totalRows / rowsPerPage);

function displayRows() {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        row.style.display = (index >= start && index < end) ? '' : 'none';
    });
}

function updatePaginationControls() {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayRows();
        updatePaginationControls();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayRows();
        updatePaginationControls();
    }
});

// Initializing the table display
displayRows();
updatePaginationControls();
`,

  // Complex Forms: Validation
  formValidationDemo: `
// Form Validation
const form = document.getElementById('demoForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submitButton');

const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const passwordRegex = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const phoneRegex = /^\\+?(\\d{1,3})?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;

const validateInput = (input, regex, errorElement, errorMessage) => {
    if (input.value && !regex.test(input.value)) {
    errorElement.textContent = errorMessage;
    input.setCustomValidity(errorMessage);
    } else {
    errorElement.textContent = '';
    input.setCustomValidity('');
    }
};

emailInput.addEventListener('input', () => {
validateInput(emailInput, emailRegex, document.getElementById('emailError'), 'Please enter a valid email address');
});

passwordInput.addEventListener('input', () => {
validateInput(passwordInput, passwordRegex, document.getElementById('passwordError'), 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
});

phoneInput.addEventListener('input', () => {
validateInput(phoneInput, phoneRegex, document.getElementById('phoneError'), 'Please enter a valid phone number');
});

form.addEventListener('submit', (e) => {
e.preventDefault();
if (form.checkValidity()) {
    console.log('Form is valid. Submitting...');
} else {
    submitButton.setAttribute('disabled', 'disabled');
}
});
`,

  // Multimedia: Adaptive Streaming with HLS
  hlsVideoDemo: `
// Video Player Functionality
const video = document.getElementById('demoVideo');
const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

if (Hls.isSupported()) {
    const hls = new Hls({
        debug: true,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
    });
    
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    
    hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
            switch(data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    console.error("Fatal network error encountered, trying to recover");
                    hls.startLoad();
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.error("Fatal media error encountered, trying to recover");
                    hls.recoverMediaError();
                    break;
                default:
                    console.error("Fatal error, cannot recover");
                    hls.destroy();
                    break;
            }
        }
    });
    
} 
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
    video.addEventListener('loadedmetadata', function() {
        video.play();
    });
} 
else {
    console.error('HLS is not supported in this browser.');
}
`
};