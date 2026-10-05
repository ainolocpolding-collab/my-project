/* =========================================================
   STORAGE
========================================================= */

const USERS_KEY = "worktrack_users_v2";
const EMPLOYEES_KEY = "worktrack_employees_v2";
const SESSION_KEY = "worktrack_session_v2";
const ADMIN_TIME_KEY = "worktrack_admin_time_v2";
const COMPANY_KEY = "worktrack_company_v2";
const SETTINGS_KEY = "worktrack_settings_v2";
const SCHEDULE_KEY = "worktrack_schedules_v2";

/* =========================================================
   USERS
========================================================= */

let users = JSON.parse(
    localStorage.getItem(USERS_KEY)
);

if (!users) {

    users = [

        {
            id: "USR-001",
            name: "Administrator",
            email: "admin@worktrack.com",
            password: "admin123",
            role: "admin",
            employeeId: null
        },

        {
            id: "USR-002",
            name: "Mara",
            email: "mara@company.com",
            password: "mara123",
            role: "staff",
            employeeId: "EMP-001"
        },

        {
            id: "USR-003",
            name: "JP",
            email: "jp@company.com",
            password: "jp123",
            role: "staff",
            employeeId: "EMP-002"
        }

    ];

    saveUsers();
}

/* =========================================================
   EMPLOYEES
========================================================= */

let employees = JSON.parse(
    localStorage.getItem(EMPLOYEES_KEY)
);

if (!employees) {

    employees = [

        {
            id: "EMP-001",
            name: "Mara",
            department: "Design",
            email: "mara@company.com",
            role: "staff",
            userId: "USR-002",
            clockIn: null,
            clockOut: null,
            breakStart: null,
            totalBreak: 0,
            status: "absent"
        },

        {
            id: "EMP-002",
            name: "JP",
            department: "Development",
            email: "jp@company.com",
            role: "staff",
            userId: "USR-003",
            clockIn: null,
            clockOut: null,
            breakStart: null,
            totalBreak: 0,
            status: "absent"
        },

        {
            id: "EMP-003",
            name: "James Lim",
            department: "Marketing",
            email: "james@company.com",
            role: "staff",
            userId: null,
            clockIn: null,
            clockOut: null,
            breakStart: null,
            totalBreak: 0,
            status: "absent"
        },

        {
            id: "EMP-004",
            name: "Carla Ramos",
            department: "Finance",
            email: "carla@company.com",
            role: "staff",
            userId: null,
            clockIn: null,
            clockOut: null,
            breakStart: null,
            totalBreak: 0,
            status: "absent"
        },

        {
            id: "EMP-005",
            name: "David Tan",
            department: "Operations",
            email: "david@company.com",
            role: "staff",
            userId: null,
            clockIn: null,
            clockOut: null,
            breakStart: null,
            totalBreak: 0,
            status: "absent"
        }

    ];

    saveEmployees();
}

/* =========================================================
   SCHEDULES / SESSION
========================================================= */

let schedules =
    JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || [];

let currentUser =
    JSON.parse(localStorage.getItem(SESSION_KEY));

/* =========================================================
   SAVE
========================================================= */

function saveEmployees() {

    localStorage.setItem(
        EMPLOYEES_KEY,
        JSON.stringify(employees)
    );

}

function saveUsers() {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}

function saveSchedules() {

    localStorage.setItem(
        SCHEDULE_KEY,
        JSON.stringify(schedules)
    );

}

/* =========================================================
   ID GENERATORS
========================================================= */

function generateEmployeeId() {

    let number = employees.length + 1;

    let id =
        "EMP-" +
        String(number).padStart(3,"0");

    while (
        employees.some(
            e => e.id === id
        )
    ) {

        number++;

        id =
            "EMP-" +
            String(number).padStart(3,"0");

    }

    return id;

}

function generateUserId() {

    let number = users.length + 1;

    let id =
        "USR-" +
        String(number).padStart(3,"0");

    while (
        users.some(
            u => u.id === id
        )
    ) {

        number++;

        id =
            "USR-" +
            String(number).padStart(3,"0");

    }

    return id;

}

/* =========================================================
   ROLE
========================================================= */

function isAdmin() {

    return currentUser &&
        currentUser.role === "admin";

}

function isStaff() {

    return currentUser &&
        currentUser.role === "staff";

}

/* =========================================================
   AUTH SCREEN SWITCHING
========================================================= */

function showRegisterScreen() {

    document.getElementById(
        "loginScreen"
    ).style.display = "none";

    document.getElementById(
        "registerScreen"
    ).style.display = "flex";

    document.getElementById(
        "registerError"
    ).style.display = "none";

}

function showLoginScreen() {

    document.getElementById(
        "registerScreen"
    ).style.display = "none";

    document.getElementById(
        "loginScreen"
    ).style.display = "flex";

    document.getElementById(
        "registerError"
    ).style.display = "none";

}

/* =========================================================
   LOGIN
========================================================= */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const email =
                document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

            const password =
                document
                .getElementById("loginPassword")
                .value;

            const user =
                users.find(
                    u =>
                        u.email.toLowerCase() === email &&
                        u.password === password
                );

            if (!user) {

                document
                    .getElementById("loginError")
                    .style.display = "block";

                return;

            }

            currentUser = user;

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(user)
            );

            document
                .getElementById("loginError")
                .style.display = "none";

            initializeApplication();

        }
    );

/* =========================================================
   CREATE ACCOUNT
========================================================= */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const name =
                document
                .getElementById("registerName")
                .value
                .trim();

            const department =
                document
                .getElementById("registerDepartment")
                .value;

            const email =
                document
                .getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();

            const password =
                document
                .getElementById("registerPassword")
                .value;

            const confirmPassword =
                document
                .getElementById("registerConfirmPassword")
                .value;

            const error =
                document.getElementById(
                    "registerError"
                );

            error.style.display = "none";

            if (!name || !department || !email) {

                error.textContent =
                    "Please complete all required fields.";

                error.style.display = "block";

                return;

            }

            if (password.length < 6) {

                error.textContent =
                    "Password must contain at least 6 characters.";

                error.style.display = "block";

                return;

            }

            if (password !== confirmPassword) {

                error.textContent =
                    "Passwords do not match.";

                error.style.display = "block";

                return;

            }

            const existingUser =
                users.find(
                    u =>
                        u.email.toLowerCase() === email
                );

            if (existingUser) {

                error.textContent =
                    "An account with this email already exists.";

                error.style.display = "block";

                return;

            }

            const existingEmployee =
                employees.find(
                    e =>
                        e.email.toLowerCase() === email
                );

            if (existingEmployee) {

                error.textContent =
                    "An employee with this email already exists.";

                error.style.display = "block";

                return;

            }

            const employeeId =
                generateEmployeeId();

            const userId =
                generateUserId();

            const newEmployee = {

                id: employeeId,
                name: name,
                department: department,
                email: email,
                role: "staff",
                userId: userId,
                clockIn: null,
                clockOut: null,
                breakStart: null,
                totalBreak: 0,
                status: "absent"

            };

            const newUser = {

                id: userId,
                name: name,
                email: email,
                password: password,
                role: "staff",
                employeeId: employeeId

            };

            employees.push(
                newEmployee
            );

            users.push(
                newUser
            );

            saveEmployees();
            saveUsers();

            currentUser =
                newUser;

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(currentUser)
            );

            document
                .getElementById("registerForm")
                .reset();

            initializeApplication();

            showToast(
                "Account created successfully. Welcome to WorkTrack!"
            );

        }
    );

/* =========================================================
   INITIALIZE
========================================================= */

function initializeApplication() {

    document
        .getElementById("loginScreen")
        .style.display = "none";

    document
        .getElementById("registerScreen")
        .style.display = "none";

    document
        .getElementById("app")
        .classList.add("logged-in");

    updateUserInterface();

    loadSettings();

    applyRolePermissions();

    updateEverything();

    showPage("dashboard");

}

/* =========================================================
   ROLE UI
========================================================= */

function applyRolePermissions() {

    document
        .querySelectorAll(".admin-only")
        .forEach(element => {

            element.style.display =
                isAdmin() ? "" : "none";

        });

    document
        .querySelectorAll(".admin-only-action")
        .forEach(element => {

            element.style.display =
                isAdmin() ? "" : "none";

        });

    document
        .querySelectorAll(".admin-dashboard")
        .forEach(element => {

            element.style.display =
                isAdmin() ? "" : "none";

        });

    document
        .querySelectorAll(".staff-dashboard")
        .forEach(element => {

            element.style.display =
                isStaff() ? "" : "none";

        });

    if (isStaff()) {

        document
            .getElementById("dashboardTitle")
            .textContent =
            "My Dashboard";

        document
            .getElementById("dashboardSubtitle")
            .textContent =
            "View your personal working time and attendance.";

    } else {

        document
            .getElementById("dashboardTitle")
            .textContent =
            "Admin Dashboard";

        document
            .getElementById("dashboardSubtitle")
            .textContent =
            "Employee time and attendance overview.";

    }

}

/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    if (!confirm("Are you sure you want to log out?")) {
        return;
    }

    localStorage.removeItem(
        SESSION_KEY
    );

    currentUser = null;

    document
        .getElementById("app")
        .classList.remove("logged-in");

    showLoginScreen();

    document
        .getElementById("loginForm")
        .reset();

}

/* =========================================================
   USER UI
========================================================= */

function updateUserInterface() {

    if (!currentUser) {
        return;
    }

    const initials =
        getInitials(currentUser.name);

    document
        .getElementById("topAvatar")
        .textContent = initials;

    document
        .getElementById("sidebarAvatar")
        .textContent = initials;

    document
        .getElementById("topName")
        .textContent = currentUser.name;

    document
        .getElementById("sidebarName")
        .textContent = currentUser.name;

    document
        .getElementById("topRole")
        .textContent =
        currentUser.role === "admin"
        ? "Administrator"
        : "Staff";

    document
        .getElementById("sidebarRole")
        .textContent =
        currentUser.role === "admin"
        ? "Administrator"
        : "Staff";

}

/* =========================================================
   NAVIGATION
========================================================= */

document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {
                showPage(button.dataset.page);
            }
        );

    });

function showPage(page) {

    if (!currentUser) {
        return;
    }

    const adminPages = [
        "employees",
        "schedules",
        "monitoring",
        "reports",
        "settings"
    ];

    if (
        isStaff() &&
        adminPages.includes(page)
    ) {

        showToast(
            "This section is available to administrators only."
        );

        page = "dashboard";

    }

    document
        .querySelectorAll(".page")
        .forEach(p => {
            p.classList.remove("active");
        });

    const selected =
        document.getElementById(page);

    if (selected) {
        selected.classList.add("active");
    }

    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.page === page
            );

        });

}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(x => x[0])
        .slice(0,2)
        .join("")
        .toUpperCase();

}

function formatTime(timestamp) {

    if (!timestamp) {
        return "—";
    }

    return new Date(timestamp)
        .toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}

function formatDuration(ms) {

    if (!ms || ms < 0) {
        return "0h 0m";
    }

    let seconds =
        Math.floor(ms / 1000);

    const hours =
        Math.floor(seconds / 3600);

    seconds %= 3600;

    const minutes =
        Math.floor(seconds / 60);

    return `${hours}h ${minutes}m`;

}

function formatClock(ms) {

    let seconds =
        Math.floor(ms / 1000);

    const hours =
        Math.floor(seconds / 3600);

    seconds %= 3600;

    const minutes =
        Math.floor(seconds / 60);

    seconds %= 60;

    return [
        hours,
        minutes,
        seconds
    ]
    .map(
        x =>
            String(x)
            .padStart(2,"0")
    )
    .join(":");

}

function escapeHTML(value) {

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}

function getStatusClass(status) {

    if (status === "present") return "present";
    if (status === "break") return "break";
    if (status === "completed") return "completed";

    return "absent";

}

function getStatusText(status) {

    if (status === "present") return "Working";
    if (status === "break") return "On Break";
    if (status === "completed") return "Completed";

    return "Absent";

}

/* =========================================================
   CURRENT EMPLOYEE
========================================================= */

function getCurrentEmployee() {

    if (!currentUser || !currentUser.employeeId) {
        return null;
    }

    return employees.find(
        e => e.id === currentUser.employeeId
    ) || null;

}

function getVisibleEmployees() {

    if (isAdmin()) {
        return employees;
    }

    const employee =
        getCurrentEmployee();

    return employee ? [employee] : [];

}

/* =========================================================
   WORK TIME
========================================================= */

function getWorkedMilliseconds(employee) {

    if (!employee.clockIn) {
        return 0;
    }

    const end =
        employee.clockOut ||
        Date.now();

    let total =
        end - employee.clockIn;

    total -= employee.totalBreak || 0;

    if (employee.breakStart) {

        total -=
            Date.now() -
            employee.breakStart;

    }

    return Math.max(total,0);

}

/* =========================================================
   CLOCK
========================================================= */

function clockInCurrentUser() {

    if (isAdmin()) {
        clockInAdmin();
        return;
    }

    const employee =
        getCurrentEmployee();

    if (!employee) {
        showToast("No employee profile is linked to this account.");
        return;
    }

    if (employee.clockIn && !employee.clockOut) {
        showToast("You are already clocked in.");
        return;
    }

    employee.clockIn = Date.now();
    employee.clockOut = null;
    employee.breakStart = null;
    employee.totalBreak = 0;
    employee.status = "present";

    saveEmployees();
    updateEverything();

    showToast("You are now clocked in.");

}

function clockOutCurrentUser() {

    if (isAdmin()) {
        clockOutAdmin();
        return;
    }

    const employee =
        getCurrentEmployee();

    if (!employee) return;

    if (!employee.clockIn) {
        showToast("You are not clocked in.");
        return;
    }

    if (employee.breakStart) {

        employee.totalBreak +=
            Date.now() -
            employee.breakStart;

        employee.breakStart = null;

    }

    employee.clockOut = Date.now();
    employee.status = "completed";

    saveEmployees();
    updateEverything();

    showToast("You have clocked out.");

}

function toggleCurrentBreak() {

    if (isAdmin()) {
        toggleAdminBreak();
        return;
    }

    const employee =
        getCurrentEmployee();

    if (
        !employee ||
        !employee.clockIn ||
        employee.clockOut
    ) {

        showToast("Clock in before taking a break.");
        return;

    }

    if (employee.breakStart) {

        employee.totalBreak +=
            Date.now() -
            employee.breakStart;

        employee.breakStart = null;
        employee.status = "present";

        showToast("Break ended.");

    } else {

        employee.breakStart = Date.now();
        employee.status = "break";

        showToast("Break started.");

    }

    saveEmployees();
    updateEverything();

}

/* =========================================================
   ADMIN TIME
========================================================= */

function getAdminTime() {

    return JSON.parse(
        localStorage.getItem(
            ADMIN_TIME_KEY
        )
    ) || {

        clockIn: null,
        clockOut: null,
        breakStart: null,
        totalBreak: 0

    };

}

function saveAdminTime(data) {

    localStorage.setItem(
        ADMIN_TIME_KEY,
        JSON.stringify(data)
    );

}

function clockInAdmin() {

    const data = getAdminTime();

    if (data.clockIn && !data.clockOut) {
        showToast("You are already clocked in.");
        return;
    }

    data.clockIn = Date.now();
    data.clockOut = null;
    data.breakStart = null;
    data.totalBreak = 0;

    saveAdminTime(data);
    updateEverything();

    showToast("Admin clocked in.");

}

function clockOutAdmin() {

    const data = getAdminTime();

    if (!data.clockIn) {
        showToast("Clock in first.");
        return;
    }

    if (data.breakStart) {

        data.totalBreak +=
            Date.now() -
            data.breakStart;

        data.breakStart = null;

    }

    data.clockOut = Date.now();

    saveAdminTime(data);
    updateEverything();

    showToast("Admin clocked out.");

}

function toggleAdminBreak() {

    const data = getAdminTime();

    if (!data.clockIn || data.clockOut) {
        showToast("You must be clocked in.");
        return;
    }

    if (data.breakStart) {

        data.totalBreak +=
            Date.now() -
            data.breakStart;

        data.breakStart = null;

        showToast("Break ended.");

    } else {

        data.breakStart = Date.now();

        showToast("Break started.");

    }

    saveAdminTime(data);
    updateEverything();

}

/* =========================================================
   PERSONAL CLOCK DISPLAY
========================================================= */

function updatePersonalClock() {

    const status =
        document.getElementById("clockStatus");

    const timer =
        document.getElementById("workTimer");

    const breakButton =
        document.getElementById("breakButton");

    if (isAdmin()) {

        const data = getAdminTime();

        if (!data.clockIn) {

            status.textContent =
                "You are currently clocked out.";

            timer.textContent = "00:00:00";
            breakButton.textContent = "Break";

            return;

        }

        if (data.breakStart) {

            status.textContent =
                "You are currently on break.";

            breakButton.textContent = "Resume";

        } else if (data.clockOut) {

            status.textContent =
                `Shift completed at ${formatTime(data.clockOut)}.`;

            breakButton.textContent = "Break";

        } else {

            status.textContent =
                `Clocked in at ${formatTime(data.clockIn)}.`;

            breakButton.textContent = "Break";

        }

        let worked =
            (data.clockOut || Date.now()) -
            data.clockIn;

        worked -= data.totalBreak || 0;

        if (data.breakStart) {

            worked -=
                Date.now() -
                data.breakStart;

        }

        timer.textContent =
            formatClock(Math.max(worked,0));

        return;

    }

    const employee =
        getCurrentEmployee();

    if (!employee) {

        status.textContent =
            "No employee profile connected.";

        timer.textContent = "00:00:00";

        return;

    }

    if (!employee.clockIn) {

        status.textContent =
            "You are currently clocked out.";

        timer.textContent = "00:00:00";
        breakButton.textContent = "Break";

        return;

    }

    if (employee.breakStart) {

        status.textContent =
            "You are currently on break.";

        breakButton.textContent = "Resume";

    } else if (employee.clockOut) {

        status.textContent =
            `Shift completed at ${formatTime(employee.clockOut)}.`;

        breakButton.textContent = "Break";

    } else {

        status.textContent =
            `Clocked in at ${formatTime(employee.clockIn)}.`;

        breakButton.textContent = "Break";

    }

    timer.textContent =
        formatClock(
            getWorkedMilliseconds(employee)
        );

}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    if (isStaff()) {

        renderPersonalAttendance();
        return;

    }

    const total = employees.length;

    const present =
        employees.filter(
            e =>
                e.status === "present" ||
                e.status === "completed"
        ).length;

    const breaks =
        employees.filter(
            e => e.status === "break"
        ).length;

    const absent =
        employees.filter(
            e => e.status === "absent"
        ).length;

    document.getElementById(
        "totalEmployees"
    ).textContent = total;

    document.getElementById(
        "presentEmployees"
    ).textContent = present;

    document.getElementById(
        "breakEmployees"
    ).textContent = breaks;

    document.getElementById(
        "absentEmployees"
    ).textContent = absent;

    renderDashboardTable();
    renderLiveMonitoring();
    renderChart();

}

/* =========================================================
   PERSONAL ATTENDANCE
========================================================= */

function renderPersonalAttendance() {

    const container =
        document.getElementById(
            "personalAttendance"
        );

    if (!container) return;

    const employee =
        getCurrentEmployee();

    if (!employee) {

        container.innerHTML = `
            <div class="empty">
                No employee record is linked to this account.
            </div>
        `;

        return;

    }

    container.innerHTML = `

        <div class="setting-row">
            <div class="setting-label">
                <strong>Employee</strong>
                <span>${escapeHTML(employee.name)}</span>
            </div>

            <strong>${escapeHTML(employee.id)}</strong>
        </div>

        <div class="setting-row">
            <div class="setting-label">
                <strong>Department</strong>
                <span>${escapeHTML(employee.department)}</span>
            </div>
        </div>

        <div class="setting-row">
            <div class="setting-label">
                <strong>Clock In</strong>
            </div>

            <strong>${formatTime(employee.clockIn)}</strong>
        </div>

        <div class="setting-row">
            <div class="setting-label">
                <strong>Clock Out</strong>
            </div>

            <strong>${formatTime(employee.clockOut)}</strong>
        </div>

        <div class="setting-row">
            <div class="setting-label">
                <strong>Total Worked</strong>
            </div>

            <strong>
                ${formatDuration(
                    getWorkedMilliseconds(employee)
                )}
            </strong>
        </div>

        <div class="setting-row">
            <div class="setting-label">
                <strong>Status</strong>
            </div>

            <span class="status ${getStatusClass(employee.status)}">
                ${getStatusText(employee.status)}
            </span>
        </div>

    `;

}

/* =========================================================
   DASHBOARD TABLE
========================================================= */

function renderDashboardTable() {

    if (!isAdmin()) return;

    const tbody =
        document.getElementById(
            "dashboardTable"
        );

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const list =
        employees.filter(
            e =>
                e.name.toLowerCase().includes(search) ||
                e.department.toLowerCase().includes(search)
        );

    if (!list.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty">
                        No employees found.
                    </div>
                </td>
            </tr>
        `;

        return;

    }

    tbody.innerHTML =
        list.map(
            e => `

            <tr>

                <td>

                    <div class="employee-cell">

                        <div class="small-avatar">
                            ${getInitials(e.name)}
                        </div>

                        <div class="name">

                            <strong>
                                ${escapeHTML(e.name)}
                            </strong>

                            <span>
                                ${e.id}
                            </span>

                        </div>

                    </div>

                </td>

                <td>
                    ${escapeHTML(e.department)}
                </td>

                <td>
                    ${formatTime(e.clockIn)}
                </td>

                <td>
                    ${formatTime(e.clockOut)}
                </td>

                <td>
                    ${formatDuration(
                        getWorkedMilliseconds(e)
                    )}
                </td>

                <td>
                    <span class="status ${getStatusClass(e.status)}">
                        ${getStatusText(e.status)}
                    </span>
                </td>

                <td>

                    ${
                        e.status === "absent"
                        ?
                        `
                        <button
                            class="btn btn-success"
                            onclick="clockInEmployee('${e.id}')"
                        >
                            Clock In
                        </button>
                        `
                        :
                        e.status === "present"
                        ?
                        `
                        <button
                            class="btn btn-danger"
                            onclick="clockOutEmployee('${e.id}')"
                        >
                            Clock Out
                        </button>
                        `
                        :
                        `
                        <span style="color:var(--muted);">
                            —
                        </span>
                        `
                    }

                </td>

            </tr>

        `
        ).join("");

}

/* =========================================================
   ADMIN EMPLOYEE CLOCK
========================================================= */

function clockInEmployee(id) {

    if (!isAdmin()) return;

    const employee =
        employees.find(
            e => e.id === id
        );

    if (!employee) return;

    employee.clockIn = Date.now();
    employee.clockOut = null;
    employee.breakStart = null;
    employee.totalBreak = 0;
    employee.status = "present";

    saveEmployees();
    updateEverything();

    showToast(
        `${employee.name} clocked in.`
    );

}

function clockOutEmployee(id) {

    if (!isAdmin()) return;

    const employee =
        employees.find(
            e => e.id === id
        );

    if (!employee) return;

    if (employee.breakStart) {

        employee.totalBreak +=
            Date.now() -
            employee.breakStart;

        employee.breakStart = null;

    }

    employee.clockOut = Date.now();
    employee.status = "completed";

    saveEmployees();
    updateEverything();

    showToast(
        `${employee.name} clocked out.`
    );

}

/* =========================================================
   ATTENDANCE
========================================================= */

function renderAttendance() {

    const tbody =
        document.getElementById(
            "attendanceTable"
        );

    const visible =
        getVisibleEmployees();

    tbody.innerHTML =
        visible.map(
            e => `

            <tr>

                <td>

                    <div class="employee-cell">

                        <div class="small-avatar">
                            ${getInitials(e.name)}
                        </div>

                        <div class="name">

                            <strong>
                                ${escapeHTML(e.name)}
                            </strong>

                            <span>
                                ${e.id}
                            </span>

                        </div>

                    </div>

                </td>

                <td>
                    ${escapeHTML(e.department)}
                </td>

                <td>
                    ${formatTime(e.clockIn)}
                </td>

                <td>
                    ${formatTime(e.clockOut)}
                </td>

                <td>
                    ${formatDuration(
                        getWorkedMilliseconds(e)
                    )}
                </td>

                <td>
                    <span class="status ${getStatusClass(e.status)}">
                        ${getStatusText(e.status)}
                    </span>
                </td>

            </tr>

        `
        )
        .join("");

}

/* =========================================================
   EMPLOYEES
========================================================= */

function renderEmployees() {

    if (!isAdmin()) return;

    const tbody =
        document.getElementById(
            "employeeTable"
        );

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const list =
        employees.filter(
            e =>
                e.name.toLowerCase().includes(search) ||
                e.department.toLowerCase().includes(search) ||
                e.email.toLowerCase().includes(search)
        );

    tbody.innerHTML =
        list.map(
            e => {

                const account =
                    users.find(
                        u => u.employeeId === e.id
                    );

                return `

                <tr>

                    <td>

                        <div class="employee-cell">

                            <div class="small-avatar">
                                ${getInitials(e.name)}
                            </div>

                            <div class="name">

                                <strong>
                                    ${escapeHTML(e.name)}
                                </strong>

                                <span>
                                    ${e.id}
                                </span>

                            </div>

                        </div>

                    </td>

                    <td>
                        ${escapeHTML(e.department)}
                    </td>

                    <td>
                        ${escapeHTML(e.email)}
                    </td>

                    <td>
                        ${e.id}
                    </td>

                    <td>

                        ${
                            account
                            ?
                            `<span class="status present">
                                Active
                            </span>`
                            :
                            `<span class="status absent">
                                No Login
                            </span>`
                        }

                    </td>

                    <td>

                        <button
                            class="btn btn-danger"
                            onclick="deleteEmployee('${e.id}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

                `;

            }
        )
        .join("");

}

/* =========================================================
   EMPLOYEE MODAL
========================================================= */

function openEmployeeModal() {

    if (!isAdmin()) return;

    document
        .getElementById("employeeModal")
        .classList.add("show");

}

function closeEmployeeModal() {

    document
        .getElementById("employeeModal")
        .classList.remove("show");

}

document
    .getElementById("employeeForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            if (!isAdmin()) return;

            const name =
                document
                .getElementById("employeeName")
                .value
                .trim();

            const department =
                document
                .getElementById("employeeDepartment")
                .value;

            const email =
                document
                .getElementById("employeeEmail")
                .value
                .trim()
                .toLowerCase();

            const password =
                document
                .getElementById("employeePassword")
                .value;

            if (password.length < 6) {

                showToast(
                    "Password must contain at least 6 characters."
                );

                return;

            }

            if (
                users.some(
                    u =>
                        u.email.toLowerCase() === email
                )
            ) {

                showToast(
                    "An account with this email already exists."
                );

                return;

            }

            if (
                employees.some(
                    e =>
                        e.email.toLowerCase() === email
                )
            ) {

                showToast(
                    "An employee with this email already exists."
                );

                return;

            }

            const employeeId =
                generateEmployeeId();

            const userId =
                generateUserId();

            employees.push({

                id: employeeId,
                name,
                department,
                email,
                role: "staff",
                userId,
                clockIn: null,
                clockOut: null,
                breakStart: null,
                totalBreak: 0,
                status: "absent"

            });

            users.push({

                id: userId,
                name,
                email,
                password,
                role: "staff",
                employeeId

            });

            saveEmployees();
            saveUsers();
            updateEverything();

            this.reset();

            closeEmployeeModal();

            showToast(
                `${name}'s staff account was created.`
            );

        }
    );

/* =========================================================
   DELETE EMPLOYEE
========================================================= */

function deleteEmployee(id) {

    if (!isAdmin()) return;

    const employee =
        employees.find(
            e => e.id === id
        );

    if (!employee) return;

    if (
        !confirm(
            `Delete ${employee.name} and their login account?`
        )
    ) {
        return;
    }

    employees =
        employees.filter(
            e => e.id !== id
        );

    users =
        users.filter(
            u => u.employeeId !== id
        );

    saveEmployees();
    saveUsers();
    updateEverything();

    showToast(
        "Staff account deleted."
    );

}

/* =========================================================
   TIMESHEETS
========================================================= */

function renderTimesheets() {

    const tbody =
        document.getElementById(
            "timesheetTable"
        );

    const visible =
        getVisibleEmployees();

    tbody.innerHTML =
        visible.map(
            e => `

            <tr>

                <td>
                    ${escapeHTML(e.name)}
                </td>

                <td>
                    ${formatTime(e.clockIn)}
                </td>

                <td>
                    ${formatTime(e.clockOut)}
                </td>

                <td>
                    ${formatDuration(
                        getWorkedMilliseconds(e)
                    )}
                </td>

                <td>
                    <span class="status ${getStatusClass(e.status)}">
                        ${getStatusText(e.status)}
                    </span>
                </td>

            </tr>

        `
        )
        .join("");

}

function updateTimesheetStats() {

    const visible =
        getVisibleEmployees();

    let total = 0;
    let working = 0;
    let completed = 0;

    visible.forEach(
        e => {

            total +=
                getWorkedMilliseconds(e);

            if (
                e.status === "present" ||
                e.status === "break"
            ) {
                working++;
            }

            if (e.status === "completed") {
                completed++;
            }

        }
    );

    const hours =
        total / 1000 / 60 / 60;

    const average =
        visible.length
        ? hours / visible.length
        : 0;

    document.getElementById(
        "totalHours"
    ).textContent =
        hours.toFixed(1) + "h";

    document.getElementById(
        "averageHours"
    ).textContent =
        average.toFixed(1) + "h";

    document.getElementById(
        "workingEmployees"
    ).textContent =
        working;

    document.getElementById(
        "completedShifts"
    ).textContent =
        completed;

}

/* =========================================================
   SCHEDULES
========================================================= */

function openScheduleModal() {

    if (!isAdmin()) return;

    const select =
        document.getElementById(
            "scheduleEmployee"
        );

    select.innerHTML =
        employees
        .map(
            e => `
                <option value="${e.id}">
                    ${escapeHTML(e.name)}
                </option>
            `
        )
        .join("");

    document
        .getElementById("scheduleModal")
        .classList.add("show");

}

function closeScheduleModal() {

    document
        .getElementById("scheduleModal")
        .classList.remove("show");

}

document
    .getElementById("scheduleForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            if (!isAdmin()) return;

            const employeeId =
                document
                .getElementById("scheduleEmployee")
                .value;

            const start =
                document
                .getElementById("scheduleStart")
                .value;

            const end =
                document
                .getElementById("scheduleEnd")
                .value;

            const existing =
                schedules.find(
                    s => s.employeeId === employeeId
                );

            if (existing) {

                existing.start = start;
                existing.end = end;

            } else {

                schedules.push({
                    employeeId,
                    start,
                    end
                });

            }

            saveSchedules();
            renderSchedules();

            closeScheduleModal();

            showToast(
                "Schedule saved."
            );

        }
    );

function renderSchedules() {

    if (!isAdmin()) return;

    const tbody =
        document.getElementById(
            "scheduleTable"
        );

    tbody.innerHTML =
        employees
        .map(
            e => {

                const schedule =
                    schedules.find(
                        s => s.employeeId === e.id
                    );

                const shift =
                    schedule
                    ? `${schedule.start} - ${schedule.end}`
                    : "08:00 - 17:00";

                return `

                <tr>

                    <td>
                        <strong>
                            ${escapeHTML(e.name)}
                        </strong>
                    </td>

                    <td>${shift}</td>
                    <td>${shift}</td>
                    <td>${shift}</td>
                    <td>${shift}</td>
                    <td>${shift}</td>

                </tr>

                `;

            }
        )
        .join("");

}

/* =========================================================
   MONITORING
========================================================= */

function renderLiveMonitoring() {

    if (!isAdmin()) return;

    const container =
        document.getElementById(
            "liveMonitoring"
        );

    const active =
        employees.filter(
            e =>
                e.status === "present" ||
                e.status === "break"
        );

    if (!active.length) {

        container.innerHTML = `
            <div class="empty">
                No employees currently working.
            </div>
        `;

        return;

    }

    container.innerHTML =
        active
        .slice(0,6)
        .map(
            e => `

            <div class="employee">

                <div class="employee-left">

                    <div class="employee-avatar">
                        ${getInitials(e.name)}
                    </div>

                    <div class="employee-info">

                        <strong>
                            ${escapeHTML(e.name)}
                        </strong>

                        <span>
                            ${escapeHTML(e.department)}
                        </span>

                    </div>

                </div>

                <span class="status ${getStatusClass(e.status)}">
                    ${getStatusText(e.status)}
                </span>

            </div>

        `
        )
        .join("");

}

function renderMonitoring() {

    if (!isAdmin()) return;

    const container =
        document.getElementById(
            "monitoringFull"
        );

    const summary =
        document.getElementById(
            "monitoringSummary"
        );

    container.innerHTML =
        employees.map(
            e => `

            <div class="employee">

                <div class="employee-left">

                    <div class="employee-avatar">
                        ${getInitials(e.name)}
                    </div>

                    <div class="employee-info">

                        <strong>
                            ${escapeHTML(e.name)}
                        </strong>

                        <span>
                            ${escapeHTML(e.department)}
                        </span>

                    </div>

                </div>

                <span class="status ${getStatusClass(e.status)}">
                    ${getStatusText(e.status)}
                </span>

            </div>

        `
        )
        .join("");

    const working =
        employees.filter(
            e => e.status === "present"
        ).length;

    const breaks =
        employees.filter(
            e => e.status === "break"
        ).length;

    const absent =
        employees.filter(
            e => e.status === "absent"
        ).length;

    summary.innerHTML = `

        <div class="setting-row">

            <div class="setting-label">
                <strong>Working</strong>
                <span>Currently active</span>
            </div>

            <strong class="green-text">
                ${working}
            </strong>

        </div>

        <div class="setting-row">

            <div class="setting-label">
                <strong>On Break</strong>
                <span>Currently away</span>
            </div>

            <strong class="orange-text">
                ${breaks}
            </strong>

        </div>

        <div class="setting-row">

            <div class="setting-label">
                <strong>Absent</strong>
                <span>Not clocked in</span>
            </div>

            <strong class="red-text">
                ${absent}
            </strong>

        </div>

    `;

}

/* =========================================================
   CHART
========================================================= */

function renderChart() {

    if (!isAdmin()) return;

    const chart =
        document.getElementById(
            "attendanceChart"
        );

    const count =
        employees.filter(
            e => e.status !== "absent"
        ).length;

    const max =
        Math.max(employees.length,1);

    const percentage =
        Math.max(
            8,
            (count / max) * 100
        );

    const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

    chart.innerHTML =
        days.map(
            (day,index) => {

                const value =
                    Math.min(
                        100,
                        Math.max(
                            8,
                            percentage -
                            (index === 6 ? 20 : 0) +
                            ((index * 7) % 12)
                        )
                    );

                return `

                    <div class="bar-group">

                        <div
                            class="bar"
                            style="height:${value}%"
                        ></div>

                        <span class="day">
                            ${day}
                        </span>

                    </div>

                `;

            }
        ).join("");

}

/* =========================================================
   EXPORT CSV
========================================================= */

function exportCSV() {

    if (!isAdmin()) {

        showToast(
            "Only administrators can export reports."
        );

        return;

    }

    let csv =
        "Employee ID,Employee,Department,Email,Clock In,Clock Out,Hours,Status\n";

    employees.forEach(
        e => {

            csv += [

                e.id,
                e.name,
                e.department,
                e.email,
                formatTime(e.clockIn),
                formatTime(e.clockOut),
                formatDuration(
                    getWorkedMilliseconds(e)
                ),
                getStatusText(e.status)

            ]
            .map(
                value =>
                    `"${String(value)
                        .replaceAll('"','""')}"`
            )
            .join(",");

            csv += "\n";

        }
    );

    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "worktrack-attendance.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast(
        "CSV report downloaded."
    );

}

/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function() {

            if (isAdmin()) {

                renderDashboardTable();
                renderEmployees();

            }

        }
    );

/* =========================================================
   SETTINGS TABS
========================================================= */

document
    .querySelectorAll(".settings-tab")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(".settings-tab")
                        .forEach(
                            b =>
                                b.classList.remove("active")
                        );

                    document
                        .querySelectorAll(".settings-section")
                        .forEach(
                            section =>
                                section.classList.remove("active")
                        );

                    this.classList.add("active");

                    document
                        .getElementById(
                            this.dataset.settings
                        )
                        .classList.add("active");

                }
            );

        }
    );

/* =========================================================
   PROFILE
========================================================= */

function saveProfile() {

    if (!currentUser) return;

    const name =
        document
        .getElementById("profileName")
        .value
        .trim();

    const email =
        document
        .getElementById("profileEmail")
        .value
        .trim()
        .toLowerCase();

    if (!name || !email) {

        showToast(
            "Please complete your profile."
        );

        return;

    }

    const duplicate =
        users.some(
            u =>
                u.id !== currentUser.id &&
                u.email.toLowerCase() === email
        );

    if (duplicate) {

        showToast(
            "That email is already being used."
        );

        return;

    }

    const user =
        users.find(
            u => u.id === currentUser.id
        );

    if (!user) return;

    user.name = name;
    user.email = email;

    currentUser = user;

    const employee =
        employees.find(
            e =>
                e.id === currentUser.employeeId
        );

    if (employee) {

        employee.name = name;
        employee.email = email;

        saveEmployees();

    }

    saveUsers();

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(currentUser)
    );

    updateUserInterface();

    showToast(
        "Profile saved."
    );

}

/* =========================================================
   COMPANY
========================================================= */

function saveCompanySettings() {

    if (!isAdmin()) return;

    const company = {

        name:
            document
            .getElementById("companyName")
            .value,

        email:
            document
            .getElementById("companyEmail")
            .value,

        timezone:
            document
            .getElementById("timezone")
            .value

    };

    localStorage.setItem(
        COMPANY_KEY,
        JSON.stringify(company)
    );

    showToast(
        "Company settings saved."
    );

}

/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

    const enabled =
        document
        .getElementById("darkMode")
        .checked;

    document.body.classList.toggle(
        "dark",
        enabled
    );

    const settings =
        JSON.parse(
            localStorage.getItem(
                SETTINGS_KEY
            )
        ) || {};

    settings.darkMode = enabled;

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}

function saveAppearance() {

    const settings =
        JSON.parse(
            localStorage.getItem(
                SETTINGS_KEY
            )
        ) || {};

    settings.notifications =
        document
        .getElementById("notifications")
        .checked;

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

    showToast(
        "Appearance settings saved."
    );

}

/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings() {

    const company =
        JSON.parse(
            localStorage.getItem(
                COMPANY_KEY
            )
        );

    if (company) {

        document
            .getElementById("companyName")
            .value =
            company.name || "My Company";

        document
            .getElementById("companyEmail")
            .value =
            company.email || "";

        document
            .getElementById("timezone")
            .value =
            company.timezone || "Asia/Manila";

    }

    if (currentUser) {

        document
            .getElementById("profileName")
            .value =
            currentUser.name;

        document
            .getElementById("profileEmail")
            .value =
            currentUser.email;

    }

    const settings =
        JSON.parse(
            localStorage.getItem(
                SETTINGS_KEY
            )
        ) || {};

    document
        .getElementById("darkMode")
        .checked =
        !!settings.darkMode;

    document
        .getElementById("notifications")
        .checked =
        settings.notifications !== false;

    if (settings.darkMode) {

        document.body.classList.add("dark");

    }

}

/* =========================================================
   CHANGE PASSWORD
========================================================= */

function changePassword() {

    if (!currentUser) return;

    const current =
        document
        .getElementById("currentPassword")
        .value;

    const newPassword =
        document
        .getElementById("newPassword")
        .value;

    const confirmPassword =
        document
        .getElementById("confirmPassword")
        .value;

    if (current !== currentUser.password) {

        showToast(
            "Current password is incorrect."
        );

        return;

    }

    if (newPassword.length < 6) {

        showToast(
            "Password must contain at least 6 characters."
        );

        return;

    }

    if (newPassword !== confirmPassword) {

        showToast(
            "Passwords do not match."
        );

        return;

    }

    const user =
        users.find(
            u => u.id === currentUser.id
        );

    if (!user) return;

    user.password = newPassword;
    currentUser.password = newPassword;

    saveUsers();

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(currentUser)
    );

    document.getElementById(
        "currentPassword"
    ).value = "";

    document.getElementById(
        "newPassword"
    ).value = "";

    document.getElementById(
        "confirmPassword"
    ).value = "";

    showToast(
        "Password changed successfully."
    );

}

/* =========================================================
   TOAST
========================================================= */

let toastTimeout;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            2500
        );

}

/* =========================================================
   REAL TIME CLOCK
========================================================= */

function updateCurrentClock() {

    const now = new Date();

    document
        .getElementById("currentClock")
        .textContent =
        now.toLocaleTimeString();

    if (currentUser) {

        updatePersonalClock();
        updateDashboard();
        renderAttendance();
        renderTimesheets();
        updateTimesheetStats();

        if (isAdmin()) {
            renderMonitoring();
        }

    }

}

setInterval(
    updateCurrentClock,
    1000
);

/* =========================================================
   UPDATE EVERYTHING
========================================================= */

function updateEverything() {

    if (!currentUser) return;

    updatePersonalClock();
    updateDashboard();
    renderAttendance();
    renderTimesheets();
    updateTimesheetStats();

    if (isAdmin()) {

        renderEmployees();
        renderMonitoring();
        renderSchedules();

    }

}

/* =========================================================
   EXISTING SESSION
========================================================= */

if (currentUser) {
    initializeApplication();
}

/* =========================================================
   INITIAL CLOCK
========================================================= */

updateCurrentClock();