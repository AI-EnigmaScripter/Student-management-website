class Student {
    constructor(name, email, contact, profilePic) {
        this.name = name;
        this.studentID = this.generateStudentID();
        this.coursesEnrolled = [];
        this.balance = 0;
        this.email = email;
        this.contact = contact;
        this.profilePic = profilePic;
    }

    generateStudentID() {
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    enroll(course) {
        this.coursesEnrolled.push(course);
    }

    viewBalance() {
        return this.balance;
    }

    payTuition(amount) {
        this.balance -= amount;
    }

    showStatus() {
        return `
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Student ID:</strong> ${this.studentID}</p>
            <p><strong>Courses Enrolled:</strong> ${this.coursesEnrolled.join(', ')}</p>
            <p><strong>Balance:</strong> ${this.balance.toString()}</p>
            <p><strong>Email:</strong> ${this.email}</p>
            <p><strong>Contact Number:</strong> ${this.contact}</p>
            <img src="${this.profilePic}" alt="Profile Picture" style="width: 120px; height: 120px; border-radius: 50%; border: 2px solid #2e8b57;">
        `;
    }

    generateIdCard() {
        return `
            <div class="id-card">
                <img src="${this.profilePic}" alt="Profile Picture">
                <div class="info">
                    <p><strong>Name:</strong> ${this.name}</p>
                    <p><strong>Student ID:</strong> ${this.studentID}</p>
                    <p><strong>Email:</strong> ${this.email}</p>
                    <p><strong>Contact Number:</strong> ${this.contact}</p>
                </div>
            </div>
        `;
    }
}

document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const profilePic = URL.createObjectURL(document.getElementById('profilePic').files[0]);

    const student = new Student(name, email, contact, profilePic);
    student.enroll(course);

    document.getElementById('studentStatus').innerHTML = student.showStatus();
    document.getElementById('idCard').innerHTML = student.generateIdCard();
    document.getElementById('printableIdCard').innerHTML = student.generateIdCard();
    document.getElementById('printableIdCard').style.display = 'block';
});

document.getElementById('clearStatus').addEventListener('click', function () {
    document.getElementById('studentStatus').innerHTML = '';
    document.getElementById('idCard').innerHTML = '';
    document.getElementById('printableIdCard').style.display = 'none';
    document.getElementById('studentForm').reset();
});

document.getElementById('downloadCard').addEventListener('click', function () {
    const idCardElement = document.getElementById('idCard');
    html2canvas(idCardElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'id-card.png';
        link.click();
    });
});
