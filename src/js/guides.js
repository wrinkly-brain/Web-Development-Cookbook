addEventListener('DOMContentLoaded', function () {
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


    // Form Validation
    const form = document.getElementById('demoForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const submitButton = document.getElementById('submitButton');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

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
                switch (data.type) {
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
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
    else {
        console.error('HLS is not supported in this browser.');
    }
});