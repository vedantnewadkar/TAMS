
export const branches = [
  { id: "BR-CE", name: "Computer Engineering", code: "CE", totalClasses: 8, totalStudents: 240 },
  { id: "BR-ME", name: "Mechanical Engineering", code: "ME", totalClasses: 8, totalStudents: 220 },
  { id: "BR-CL", name: "Civil Engineering", code: "CL", totalClasses: 8, totalStudents: 180 },
  { id: "BR-EE", name: "Electrical Engineering", code: "EE", totalClasses: 6, totalStudents: 150 },
  { id: "BR-ET", name: "Electronics & Telecomm", code: "ET", totalClasses: 6, totalStudents: 160 },
  { id: "BR-IT", name: "Information Technology", code: "IT", totalClasses: 6, totalStudents: 180 },
  { id: "BR-CH", name: "Chemical Engineering", code: "CH", totalClasses: 4, totalStudents: 100 },
  { id: "BR-AI", name: "Artificial Intelligence", code: "AI", totalClasses: 4, totalStudents: 120 },
];

export const classes = [
  { id: "CL-CE-1A", branchId: "BR-CE", branch: "Computer Engineering", year: 1, division: "A", studentCount: 60, teacher: "Prof. Ramesh Joshi" },
  { id: "CL-CE-1B", branchId: "BR-CE", branch: "Computer Engineering", year: 1, division: "B", studentCount: 58, teacher: "Dr. Kavita Nair" },
  { id: "CL-CE-2A", branchId: "BR-CE", branch: "Computer Engineering", year: 2, division: "A", studentCount: 65, teacher: "Prof. Rajesh Kumar" },
  { id: "CL-CE-2B", branchId: "BR-CE", branch: "Computer Engineering", year: 2, division: "B", studentCount: 62, teacher: "Dr. Priya Sharma" },
  { id: "CL-CE-3A", branchId: "BR-CE", branch: "Computer Engineering", year: 3, division: "A", studentCount: 55, teacher: "Prof. Suresh Iyer" },
  { id: "CL-ME-2A", branchId: "BR-ME", branch: "Mechanical Engineering", year: 2, division: "A", studentCount: 58, teacher: "Prof. Amit Shah" },
  { id: "CL-ME-3A", branchId: "BR-ME", branch: "Mechanical Engineering", year: 3, division: "A", studentCount: 52, teacher: "Dr. Nilesh Patil" },
  { id: "CL-IT-1A", branchId: "BR-IT", branch: "Information Technology", year: 1, division: "A", studentCount: 60, teacher: "Dr. Sneha Desai" },
  { id: "CL-IT-2A", branchId: "BR-IT", branch: "Information Technology", year: 2, division: "A", studentCount: 58, teacher: "Prof. Vikram Singh" },
  { id: "CL-AI-2A", branchId: "BR-AI", branch: "Artificial Intelligence", year: 2, division: "A", studentCount: 55, teacher: "Dr. Anita Rao" },
];

export const subjects = [
  { id: "SUB-CE-DS", name: "Data Structures", code: "CS201", branchId: "BR-CE", year: 2 },
  { id: "SUB-CE-AL", name: "Algorithms", code: "CS202", branchId: "BR-CE", year: 2 },
  { id: "SUB-CE-DB", name: "Database Management Systems", code: "CS203", branchId: "BR-CE", year: 2 },
  { id: "SUB-CE-OS", name: "Operating Systems", code: "CS301", branchId: "BR-CE", year: 3 },
  { id: "SUB-CE-CN", name: "Computer Networks", code: "CS302", branchId: "BR-CE", year: 3 },
  { id: "SUB-CE-SE", name: "Software Engineering", code: "CS303", branchId: "BR-CE", year: 3 },
  { id: "SUB-IT-WT", name: "Web Technologies", code: "IT201", branchId: "BR-IT", year: 2 },
  { id: "SUB-IT-CC", name: "Cloud Computing", code: "IT301", branchId: "BR-IT", year: 3 },
  { id: "SUB-ME-TH", name: "Thermodynamics", code: "ME201", branchId: "BR-ME", year: 2 },
  { id: "SUB-ME-FM", name: "Fluid Mechanics", code: "ME301", branchId: "BR-ME", year: 3 },
  { id: "SUB-AI-ML", name: "Machine Learning", code: "AI201", branchId: "BR-AI", year: 2 },
  { id: "SUB-AI-DL", name: "Deep Learning", code: "AI301", branchId: "BR-AI", year: 3 },
];

export const teachers = [
  { id: "T-101", employeeId: "EMP-2021-001", name: "Prof. Rajesh Kumar", email: "rajesh.kumar@rait.edu", department: "Computer Engineering", subjects: ["Data Structures", "Algorithms"], classes: 4 },
  { id: "T-102", employeeId: "EMP-2021-002", name: "Dr. Priya Sharma", email: "priya.sharma@rait.edu", department: "Computer Engineering", subjects: ["Database Management Systems", "Operating Systems"], classes: 3 },
  { id: "T-103", employeeId: "EMP-2020-003", name: "Prof. Amit Shah", email: "amit.shah@rait.edu", department: "Mechanical Engineering", subjects: ["Thermodynamics", "Fluid Mechanics"], classes: 5 },
  { id: "T-104", employeeId: "EMP-2022-004", name: "Dr. Sneha Desai", email: "sneha.desai@rait.edu", department: "Information Technology", subjects: ["Web Technologies", "Cloud Computing"], classes: 3 },
  { id: "T-105", employeeId: "EMP-2021-005", name: "Prof. Vikram Singh", email: "vikram.singh@rait.edu", department: "Artificial Intelligence", subjects: ["Machine Learning", "Deep Learning"], classes: 4 },
  { id: "T-106", employeeId: "EMP-2019-006", name: "Dr. Suresh Iyer", email: "suresh.iyer@rait.edu", department: "Computer Engineering", subjects: ["Software Engineering", "Computer Networks"], classes: 3 },
  { id: "T-107", employeeId: "EMP-2023-007", name: "Prof. Meera Kulkarni", email: "meera.kulkarni@rait.edu", department: "Computer Engineering", subjects: ["Computer Networks"], classes: 2 },
  { id: "T-108", employeeId: "EMP-2022-008", name: "Dr. Nilesh Patil", email: "nilesh.patil@rait.edu", department: "Mechanical Engineering", subjects: ["Thermodynamics"], classes: 4 },
  { id: "T-109", employeeId: "EMP-2021-009", name: "Prof. Kavita Nair", email: "kavita.nair@rait.edu", department: "Computer Engineering", subjects: ["Data Structures"], classes: 3 },
  { id: "T-110", employeeId: "EMP-2020-010", name: "Dr. Anita Rao", email: "anita.rao@rait.edu", department: "Artificial Intelligence", subjects: ["Machine Learning"], classes: 3 },
  { id: "T-111", employeeId: "EMP-2022-011", name: "Prof. Ramesh Joshi", email: "ramesh.joshi@rait.edu", department: "Computer Engineering", subjects: ["Algorithms"], classes: 2 },
  { id: "T-112", employeeId: "EMP-2023-012", name: "Dr. Pooja Verma", email: "pooja.verma@rait.edu", department: "Information Technology", subjects: ["Web Technologies"], classes: 3 },
  { id: "T-113", employeeId: "EMP-2019-013", name: "Prof. Ganesh Bhosale", email: "ganesh.bhosale@rait.edu", department: "Civil Engineering", subjects: ["Structural Analysis"], classes: 4 },
  { id: "T-114", employeeId: "EMP-2020-014", name: "Dr. Sunita Reddy", email: "sunita.reddy@rait.edu", department: "Electrical Engineering", subjects: ["Power Systems"], classes: 3 },
  { id: "T-115", employeeId: "EMP-2021-015", name: "Prof. Ashok Choudhary", email: "ashok.choudhary@rait.edu", department: "Electronics & Telecomm", subjects: ["Digital Electronics"], classes: 3 },
];

export const mentors = [
  { id: "M-101", employeeId: "MNT-001", name: "Dr. Priya Sharma", email: "priya.sharma@rait.edu", department: "Computer Engineering", studentCount: 18, capacity: 20 },
  { id: "M-102", employeeId: "MNT-002", name: "Prof. Rajesh Kumar", email: "rajesh.kumar@rait.edu", department: "Computer Engineering", studentCount: 15, capacity: 20 },
  { id: "M-103", employeeId: "MNT-003", name: "Prof. Amit Shah", email: "amit.shah@rait.edu", department: "Mechanical Engineering", studentCount: 20, capacity: 20 },
  { id: "M-104", employeeId: "MNT-004", name: "Dr. Sneha Desai", email: "sneha.desai@rait.edu", department: "Information Technology", studentCount: 12, capacity: 20 },
  { id: "M-105", employeeId: "MNT-005", name: "Prof. Vikram Singh", email: "vikram.singh@rait.edu", department: "Artificial Intelligence", studentCount: 14, capacity: 20 },
  { id: "M-106", employeeId: "MNT-006", name: "Dr. Suresh Iyer", email: "suresh.iyer@rait.edu", department: "Computer Engineering", studentCount: 16, capacity: 20 },
  { id: "M-107", employeeId: "MNT-007", name: "Prof. Kavita Nair", email: "kavita.nair@rait.edu", department: "Computer Engineering", studentCount: 11, capacity: 20 },
  { id: "M-108", employeeId: "MNT-008", name: "Dr. Anita Rao", email: "anita.rao@rait.edu", department: "Artificial Intelligence", studentCount: 9, capacity: 20 },
];

export const students = [
  { id: "S-101", rollNo: "CE22A001", name: "Arjun Patel", email: "arjun.patel@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-101", mentor: "Dr. Priya Sharma", attendance: 94, fees: "paid", phone: "9876543201", address: "12, Shantinagar, Pune - 411005", dob: "2004-03-15", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-102", rollNo: "CE22A002", name: "Ananya Iyer", email: "ananya.iyer@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-101", mentor: "Dr. Priya Sharma", attendance: 88, fees: "partial", phone: "9876543202", address: "45, Koregaon Park, Pune - 411001", dob: "2004-07-22", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-103", rollNo: "CE22A003", name: "Ishaan Gupta", email: "ishaan.gupta@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-101", mentor: "Dr. Priya Sharma", attendance: 72, fees: "pending", phone: "9876543203", address: "67, Model Colony, Pune - 411016", dob: "2004-11-08", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-104", rollNo: "CE22A004", name: "Priya Verma", email: "priya.verma@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-101", mentor: "Dr. Priya Sharma", attendance: 96, fees: "paid", phone: "9876543204", address: "23, Baner Road, Pune - 411045", dob: "2004-05-19", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-105", rollNo: "CE22A005", name: "Rohan Kulkarni", email: "rohan.kulkarni@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-101", mentor: "Dr. Priya Sharma", attendance: 81, fees: "partial", phone: "9876543205", address: "89, Karve Road, Pune - 411004", dob: "2004-01-30", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-106", rollNo: "CE22A006", name: "Sneha Deshmukh", email: "sneha.deshmukh@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-102", mentor: "Prof. Rajesh Kumar", attendance: 90, fees: "paid", phone: "9876543206", address: "34, Tilak Road, Pune - 411030", dob: "2004-09-14", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-107", rollNo: "CE22A007", name: "Karan Mehta", email: "karan.mehta@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-102", mentor: "Prof. Rajesh Kumar", attendance: 65, fees: "overdue", phone: "9876543207", address: "56, Deccan Gymkhana, Pune - 411004", dob: "2004-06-27", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-108", rollNo: "CE22A008", name: "Divya Nair", email: "divya.nair@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-102", mentor: "Prof. Rajesh Kumar", attendance: 92, fees: "paid", phone: "9876543208", address: "78, Kothrud, Pune - 411038", dob: "2004-12-03", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-109", rollNo: "CE22A009", name: "Vivek Joshi", email: "vivek.joshi@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-102", mentor: "Prof. Rajesh Kumar", attendance: 78, fees: "partial", phone: "9876543209", address: "90, Hadapsar, Pune - 411028", dob: "2004-04-11", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-110", rollNo: "CE22A010", name: "Meera Chatterjee", email: "meera.chatterjee@student.rait.edu", class: "2-A", classId: "CL-CE-2A", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "A", mentorId: "M-102", mentor: "Prof. Rajesh Kumar", attendance: 85, fees: "paid", phone: "9876543210", address: "11, Viman Nagar, Pune - 411014", dob: "2004-08-25", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-111", rollNo: "CE22B001", name: "Aditya Sharma", email: "aditya.sharma@student.rait.edu", class: "2-B", classId: "CL-CE-2B", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "B", mentorId: "M-101", mentor: "Dr. Priya Sharma", attendance: 97, fees: "paid", phone: "9876543211", address: "22, Shivajinagar, Pune - 411005", dob: "2004-02-18", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-112", rollNo: "CE22B002", name: "Ritu Singh", email: "ritu.singh@student.rait.edu", class: "2-B", classId: "CL-CE-2B", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "B", mentorId: "M-106", mentor: "Dr. Suresh Iyer", attendance: 83, fees: "partial", phone: "9876543212", address: "33, Camp, Pune - 411001", dob: "2004-10-05", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-113", rollNo: "CE22B003", name: "Siddharth Reddy", email: "siddharth.reddy@student.rait.edu", class: "2-B", classId: "CL-CE-2B", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "B", mentorId: "M-106", mentor: "Dr. Suresh Iyer", attendance: 70, fees: "overdue", phone: "9876543213", address: "44, Aundh, Pune - 411007", dob: "2004-07-12", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-114", rollNo: "CE22B004", name: "Kavya Pillai", email: "kavya.pillai@student.rait.edu", class: "2-B", classId: "CL-CE-2B", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "B", mentorId: "M-106", mentor: "Dr. Suresh Iyer", attendance: 93, fees: "paid", phone: "9876543214", address: "55, Magarpatta, Pune - 411013", dob: "2004-03-28", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-115", rollNo: "CE22B005", name: "Rahul Bhosale", email: "rahul.bhosale@student.rait.edu", class: "2-B", classId: "CL-CE-2B", branch: "Computer Engineering", branchId: "BR-CE", year: 2, division: "B", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 76, fees: "pending", phone: "9876543215", address: "66, Wakad, Pune - 411057", dob: "2004-11-20", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-116", rollNo: "CE21A001", name: "Pooja Malhotra", email: "pooja.malhotra@student.rait.edu", class: "3-A", classId: "CL-CE-3A", branch: "Computer Engineering", branchId: "BR-CE", year: 3, division: "A", mentorId: "M-106", mentor: "Dr. Suresh Iyer", attendance: 88, fees: "paid", phone: "9876543216", address: "77, Bavdhan, Pune - 411021", dob: "2003-05-15", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-117", rollNo: "CE21A002", name: "Nikhil Patil", email: "nikhil.patil@student.rait.edu", class: "3-A", classId: "CL-CE-3A", branch: "Computer Engineering", branchId: "BR-CE", year: 3, division: "A", mentorId: "M-106", mentor: "Dr. Suresh Iyer", attendance: 74, fees: "partial", phone: "9876543217", address: "88, Pimple Saudagar, Pune - 411027", dob: "2003-09-22", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-118", rollNo: "CE21A003", name: "Sakshi Tiwari", email: "sakshi.tiwari@student.rait.edu", class: "3-A", classId: "CL-CE-3A", branch: "Computer Engineering", branchId: "BR-CE", year: 3, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 91, fees: "paid", phone: "9876543218", address: "99, Hinjewadi, Pune - 411057", dob: "2003-01-08", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-119", rollNo: "CE21A004", name: "Aarav Thakur", email: "aarav.thakur@student.rait.edu", class: "3-A", classId: "CL-CE-3A", branch: "Computer Engineering", branchId: "BR-CE", year: 3, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 80, fees: "partial", phone: "9876543219", address: "100, Pimpri, Pune - 411018", dob: "2003-06-30", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-120", rollNo: "CE21A005", name: "Disha Kapoor", email: "disha.kapoor@student.rait.edu", class: "3-A", classId: "CL-CE-3A", branch: "Computer Engineering", branchId: "BR-CE", year: 3, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 95, fees: "paid", phone: "9876543220", address: "101, Chinchwad, Pune - 411019", dob: "2003-12-17", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-121", rollNo: "ME22A001", name: "Vihaan Reddy", email: "vihaan.reddy@student.rait.edu", class: "2-A", classId: "CL-ME-2A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 2, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 82, fees: "overdue", phone: "9876543221", address: "12, Sadashiv Peth, Pune - 411030", dob: "2004-04-20", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-122", rollNo: "ME22A002", name: "Sanjay Mishra", email: "sanjay.mishra@student.rait.edu", class: "2-A", classId: "CL-ME-2A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 2, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 79, fees: "pending", phone: "9876543222", address: "23, Parvati, Pune - 411009", dob: "2004-08-14", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-123", rollNo: "ME22A003", name: "Tanvi Rao", email: "tanvi.rao@student.rait.edu", class: "2-A", classId: "CL-ME-2A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 2, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 86, fees: "paid", phone: "9876543223", address: "34, Sinhagad Road, Pune - 411041", dob: "2004-02-07", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-124", rollNo: "ME22A004", name: "Aryan Goswami", email: "aryan.goswami@student.rait.edu", class: "2-A", classId: "CL-ME-2A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 2, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 68, fees: "overdue", phone: "9876543224", address: "45, Warje, Pune - 411058", dob: "2004-10-31", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-125", rollNo: "ME22A005", name: "Nidhi Shukla", email: "nidhi.shukla@student.rait.edu", class: "2-A", classId: "CL-ME-2A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 2, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 91, fees: "paid", phone: "9876543225", address: "56, Bibwewadi, Pune - 411037", dob: "2004-06-12", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-126", rollNo: "ME21A001", name: "Abhishek Kumar", email: "abhishek.kumar@student.rait.edu", class: "3-A", classId: "CL-ME-3A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 3, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 77, fees: "partial", phone: "9876543226", address: "67, Katraj, Pune - 411046", dob: "2003-03-25", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-127", rollNo: "ME21A002", name: "Shruti Pandey", email: "shruti.pandey@student.rait.edu", class: "3-A", classId: "CL-ME-3A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 3, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 84, fees: "paid", phone: "9876543227", address: "78, Dhayari, Pune - 411041", dob: "2003-07-18", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-128", rollNo: "ME21A003", name: "Gaurav Tiwari", email: "gaurav.tiwari@student.rait.edu", class: "3-A", classId: "CL-ME-3A", branch: "Mechanical Engineering", branchId: "BR-ME", year: 3, division: "A", mentorId: "M-103", mentor: "Prof. Amit Shah", attendance: 89, fees: "paid", phone: "9876543228", address: "89, Kondwa, Pune - 411048", dob: "2003-11-09", enrollmentDate: "2021-08-01", isActive: true },
  { id: "S-129", rollNo: "IT22A001", name: "Saanvi Mehta", email: "saanvi.mehta@student.rait.edu", class: "1-A", classId: "CL-IT-1A", branch: "Information Technology", branchId: "BR-IT", year: 1, division: "A", mentorId: "M-104", mentor: "Dr. Sneha Desai", attendance: 98, fees: "paid", phone: "9876543229", address: "90, Dhankawadi, Pune - 411043", dob: "2005-01-14", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-130", rollNo: "IT22A002", name: "Harsh Pandey", email: "harsh.pandey@student.rait.edu", class: "1-A", classId: "CL-IT-1A", branch: "Information Technology", branchId: "BR-IT", year: 1, division: "A", mentorId: "M-104", mentor: "Dr. Sneha Desai", attendance: 87, fees: "partial", phone: "9876543230", address: "11, Fursungi, Pune - 412308", dob: "2005-05-22", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-131", rollNo: "IT22A003", name: "Prajakta Gaikwad", email: "prajakta.gaikwad@student.rait.edu", class: "1-A", classId: "CL-IT-1A", branch: "Information Technology", branchId: "BR-IT", year: 1, division: "A", mentorId: "M-104", mentor: "Dr. Sneha Desai", attendance: 92, fees: "paid", phone: "9876543231", address: "22, Undri, Pune - 411060", dob: "2005-08-07", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-132", rollNo: "IT22A004", name: "Aakash Sharma", email: "aakash.sharma@student.rait.edu", class: "1-A", classId: "CL-IT-1A", branch: "Information Technology", branchId: "BR-IT", year: 1, division: "A", mentorId: "M-104", mentor: "Dr. Sneha Desai", attendance: 71, fees: "pending", phone: "9876543232", address: "33, Ambegaon, Pune - 411046", dob: "2005-03-29", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-133", rollNo: "IT22A005", name: "Rutuja Jadhav", email: "rutuja.jadhav@student.rait.edu", class: "1-A", classId: "CL-IT-1A", branch: "Information Technology", branchId: "BR-IT", year: 1, division: "A", mentorId: "M-104", mentor: "Dr. Sneha Desai", attendance: 95, fees: "paid", phone: "9876543233", address: "44, Nanded City, Pune - 411041", dob: "2005-11-16", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-134", rollNo: "IT21A001", name: "Kabir Singh", email: "kabir.singh@student.rait.edu", class: "2-A", classId: "CL-IT-2A", branch: "Information Technology", branchId: "BR-IT", year: 2, division: "A", mentorId: "M-105", mentor: "Prof. Vikram Singh", attendance: 65, fees: "partial", phone: "9876543234", address: "55, Sus Road, Pune - 411021", dob: "2004-07-04", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-135", rollNo: "IT21A002", name: "Swati Bhandari", email: "swati.bhandari@student.rait.edu", class: "2-A", classId: "CL-IT-2A", branch: "Information Technology", branchId: "BR-IT", year: 2, division: "A", mentorId: "M-105", mentor: "Prof. Vikram Singh", attendance: 89, fees: "paid", phone: "9876543235", address: "66, Mahalunge, Pune - 411045", dob: "2004-09-21", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-136", rollNo: "AI22A001", name: "Yash Parekh", email: "yash.parekh@student.rait.edu", class: "2-A", classId: "CL-AI-2A", branch: "Artificial Intelligence", branchId: "BR-AI", year: 2, division: "A", mentorId: "M-105", mentor: "Prof. Vikram Singh", attendance: 93, fees: "paid", phone: "9876543236", address: "77, Moshi, Pune - 412105", dob: "2004-04-16", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-137", rollNo: "AI22A002", name: "Kriti Bansal", email: "kriti.bansal@student.rait.edu", class: "2-A", classId: "CL-AI-2A", branch: "Artificial Intelligence", branchId: "BR-AI", year: 2, division: "A", mentorId: "M-105", mentor: "Prof. Vikram Singh", attendance: 87, fees: "partial", phone: "9876543237", address: "88, Bhosari, Pune - 411026", dob: "2004-12-28", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-138", rollNo: "AI22A003", name: "Darshan Naik", email: "darshan.naik@student.rait.edu", class: "2-A", classId: "CL-AI-2A", branch: "Artificial Intelligence", branchId: "BR-AI", year: 2, division: "A", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 76, fees: "pending", phone: "9876543238", address: "99, Dighi, Pune - 411015", dob: "2004-06-09", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-139", rollNo: "AI22A004", name: "Nikita Kulkarni", email: "nikita.kulkarni@student.rait.edu", class: "2-A", classId: "CL-AI-2A", branch: "Artificial Intelligence", branchId: "BR-AI", year: 2, division: "A", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 91, fees: "paid", phone: "9876543239", address: "100, Alandi, Pune - 412105", dob: "2004-02-23", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-140", rollNo: "AI22A005", name: "Sumit Yadav", email: "sumit.yadav@student.rait.edu", class: "2-A", classId: "CL-AI-2A", branch: "Artificial Intelligence", branchId: "BR-AI", year: 2, division: "A", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 84, fees: "paid", phone: "9876543240", address: "111, Chakan, Pune - 410501", dob: "2004-10-05", enrollmentDate: "2022-08-01", isActive: true },
  { id: "S-141", rollNo: "CE23A001", name: "Aditi Bhatt", email: "aditi.bhatt@student.rait.edu", class: "1-A", classId: "CL-CE-1A", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 97, fees: "paid", phone: "9876543241", address: "12, Ravet, Pune - 412101", dob: "2005-07-12", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-142", rollNo: "CE23A002", name: "Mihir Jain", email: "mihir.jain@student.rait.edu", class: "1-A", classId: "CL-CE-1A", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 88, fees: "partial", phone: "9876543242", address: "23, Talegaon, Pune - 410507", dob: "2005-03-04", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-143", rollNo: "CE23A003", name: "Pallavi Deshmukh", email: "pallavi.deshmukh@student.rait.edu", class: "1-A", classId: "CL-CE-1A", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 80, fees: "paid", phone: "9876543243", address: "34, Dehu Road, Pune - 412101", dob: "2005-09-18", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-144", rollNo: "CE23A004", name: "Raj Patel", email: "raj.patel@student.rait.edu", class: "1-A", classId: "CL-CE-1A", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 75, fees: "pending", phone: "9876543244", address: "45, Khed Shivapur, Pune - 412205", dob: "2005-01-27", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-145", rollNo: "CE23A005", name: "Shreya Iyer", email: "shreya.iyer@student.rait.edu", class: "1-A", classId: "CL-CE-1A", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "A", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 94, fees: "paid", phone: "9876543245", address: "56, Uruli Kanchan, Pune - 412202", dob: "2005-11-10", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-146", rollNo: "CE23B001", name: "Omkar More", email: "omkar.more@student.rait.edu", class: "1-B", classId: "CL-CE-1B", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "B", mentorId: "M-107", mentor: "Prof. Kavita Nair", attendance: 83, fees: "partial", phone: "9876543246", address: "67, Jejuri, Pune - 412303", dob: "2005-05-24", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-147", rollNo: "CE23B002", name: "Trupti Wagh", email: "trupti.wagh@student.rait.edu", class: "1-B", classId: "CL-CE-1B", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "B", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 96, fees: "paid", phone: "9876543247", address: "78, Saswad, Pune - 412301", dob: "2005-08-13", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-148", rollNo: "CE23B003", name: "Kunal Naik", email: "kunal.naik@student.rait.edu", class: "1-B", classId: "CL-CE-1B", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "B", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 73, fees: "overdue", phone: "9876543248", address: "89, Wai, Satara - 412803", dob: "2005-02-06", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-149", rollNo: "CE23B004", name: "Ankita Sawant", email: "ankita.sawant@student.rait.edu", class: "1-B", classId: "CL-CE-1B", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "B", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 90, fees: "paid", phone: "9876543249", address: "90, Lonand, Satara - 415521", dob: "2005-06-20", enrollmentDate: "2023-08-01", isActive: true },
  { id: "S-150", rollNo: "CE23B005", name: "Varun Kulkarni", email: "varun.kulkarni@student.rait.edu", class: "1-B", classId: "CL-CE-1B", branch: "Computer Engineering", branchId: "BR-CE", year: 1, division: "B", mentorId: "M-108", mentor: "Dr. Anita Rao", attendance: 86, fees: "paid", phone: "9876543250", address: "101, Phaltan, Satara - 415523", dob: "2005-12-30", enrollmentDate: "2023-08-01", isActive: true },
];

export const parents = [
  { id: "P-101", name: "Suresh Patel", email: "suresh.patel@gmail.com", phone: "9123456701", wardId: "S-101", wardName: "Arjun Patel", wardRollNo: "CE22A001", relation: "Father" },
  { id: "P-102", name: "Sunita Patel", email: "sunita.patel@gmail.com", phone: "9123456702", wardId: "S-101", wardName: "Arjun Patel", wardRollNo: "CE22A001", relation: "Mother" },
  { id: "P-103", name: "Krishnamurthy Iyer", email: "krishna.iyer@gmail.com", phone: "9123456703", wardId: "S-102", wardName: "Ananya Iyer", wardRollNo: "CE22A002", relation: "Father" },
  { id: "P-104", name: "Manoj Gupta", email: "manoj.gupta@gmail.com", phone: "9123456704", wardId: "S-103", wardName: "Ishaan Gupta", wardRollNo: "CE22A003", relation: "Father" },
  { id: "P-105", name: "Sushma Verma", email: "sushma.verma@gmail.com", phone: "9123456705", wardId: "S-104", wardName: "Priya Verma", wardRollNo: "CE22A004", relation: "Mother" },
  { id: "P-106", name: "Dilip Kulkarni", email: "dilip.kulkarni@gmail.com", phone: "9123456706", wardId: "S-105", wardName: "Rohan Kulkarni", wardRollNo: "CE22A005", relation: "Father" },
  { id: "P-107", name: "Lata Deshmukh", email: "lata.deshmukh@gmail.com", phone: "9123456707", wardId: "S-106", wardName: "Sneha Deshmukh", wardRollNo: "CE22A006", relation: "Mother" },
  { id: "P-108", name: "Vinod Mehta", email: "vinod.mehta@gmail.com", phone: "9123456708", wardId: "S-107", wardName: "Karan Mehta", wardRollNo: "CE22A007", relation: "Father" },
  { id: "P-109", name: "Rajani Nair", email: "rajani.nair@gmail.com", phone: "9123456709", wardId: "S-108", wardName: "Divya Nair", wardRollNo: "CE22A008", relation: "Mother" },
  { id: "P-110", name: "Prakash Joshi", email: "prakash.joshi@gmail.com", phone: "9123456710", wardId: "S-109", wardName: "Vivek Joshi", wardRollNo: "CE22A009", relation: "Father" },
  { id: "P-111", name: "Bina Chatterjee", email: "bina.chatterjee@gmail.com", phone: "9123456711", wardId: "S-110", wardName: "Meera Chatterjee", wardRollNo: "CE22A010", relation: "Mother" },
  { id: "P-112", name: "Ramesh Sharma", email: "ramesh.sharma@gmail.com", phone: "9123456712", wardId: "S-111", wardName: "Aditya Sharma", wardRollNo: "CE22B001", relation: "Father" },
  { id: "P-113", name: "Harpreet Singh", email: "harpreet.singh@gmail.com", phone: "9123456713", wardId: "S-112", wardName: "Ritu Singh", wardRollNo: "CE22B002", relation: "Father" },
  { id: "P-114", name: "Nagesh Reddy", email: "nagesh.reddy@gmail.com", phone: "9123456714", wardId: "S-113", wardName: "Siddharth Reddy", wardRollNo: "CE22B003", relation: "Father" },
  { id: "P-115", name: "Thankamma Pillai", email: "thankamma.pillai@gmail.com", phone: "9123456715", wardId: "S-114", wardName: "Kavya Pillai", wardRollNo: "CE22B004", relation: "Mother" },
  { id: "P-116", name: "Dattatray Bhosale", email: "dattatray.bhosale@gmail.com", phone: "9123456716", wardId: "S-115", wardName: "Rahul Bhosale", wardRollNo: "CE22B005", relation: "Father" },
  { id: "P-117", name: "Kiran Malhotra", email: "kiran.malhotra@gmail.com", phone: "9123456717", wardId: "S-116", wardName: "Pooja Malhotra", wardRollNo: "CE21A001", relation: "Father" },
  { id: "P-118", name: "Sandip Patil", email: "sandip.patil@gmail.com", phone: "9123456718", wardId: "S-117", wardName: "Nikhil Patil", wardRollNo: "CE21A002", relation: "Father" },
  { id: "P-119", name: "Jyoti Tiwari", email: "jyoti.tiwari@gmail.com", phone: "9123456719", wardId: "S-118", wardName: "Sakshi Tiwari", wardRollNo: "CE21A003", relation: "Mother" },
  { id: "P-120", name: "Surendra Thakur", email: "surendra.thakur@gmail.com", phone: "9123456720", wardId: "S-119", wardName: "Aarav Thakur", wardRollNo: "CE21A004", relation: "Father" },
  { id: "P-121", name: "Mala Kapoor", email: "mala.kapoor@gmail.com", phone: "9123456721", wardId: "S-120", wardName: "Disha Kapoor", wardRollNo: "CE21A005", relation: "Mother" },
  { id: "P-122", name: "Venkata Reddy", email: "venkata.reddy@gmail.com", phone: "9123456722", wardId: "S-121", wardName: "Vihaan Reddy", wardRollNo: "ME22A001", relation: "Father" },
  { id: "P-123", name: "Geeta Mishra", email: "geeta.mishra@gmail.com", phone: "9123456723", wardId: "S-122", wardName: "Sanjay Mishra", wardRollNo: "ME22A002", relation: "Mother" },
  { id: "P-124", name: "Vasudha Rao", email: "vasudha.rao@gmail.com", phone: "9123456724", wardId: "S-123", wardName: "Tanvi Rao", wardRollNo: "ME22A003", relation: "Mother" },
  { id: "P-125", name: "Bipin Goswami", email: "bipin.goswami@gmail.com", phone: "9123456725", wardId: "S-124", wardName: "Aryan Goswami", wardRollNo: "ME22A004", relation: "Father" },
  { id: "P-126", name: "Anand Shukla", email: "anand.shukla@gmail.com", phone: "9123456726", wardId: "S-125", wardName: "Nidhi Shukla", wardRollNo: "ME22A005", relation: "Father" },
  { id: "P-127", name: "Rajendra Kumar", email: "rajendra.kumar@gmail.com", phone: "9123456727", wardId: "S-126", wardName: "Abhishek Kumar", wardRollNo: "ME21A001", relation: "Father" },
  { id: "P-128", name: "Asha Pandey", email: "asha.pandey@gmail.com", phone: "9123456728", wardId: "S-127", wardName: "Shruti Pandey", wardRollNo: "ME21A002", relation: "Mother" },
  { id: "P-129", name: "Rajesh Mehta", email: "rajesh.mehta@gmail.com", phone: "9123456729", wardId: "S-129", wardName: "Saanvi Mehta", wardRollNo: "IT22A001", relation: "Father" },
  { id: "P-130", name: "Sudhir Pandey", email: "sudhir.pandey@gmail.com", phone: "9123456730", wardId: "S-130", wardName: "Harsh Pandey", wardRollNo: "IT22A002", relation: "Father" },
];

export const feeRecords = students.map((s, i) => ({
  id: `FEE-${s.id}`,
  studentId: s.id,
  student: s.name,
  rollNo: s.rollNo,
  class: s.class,
  branch: s.branch,
  totalFee: s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000,
  paidAmount: s.fees === "paid" ? (s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000)
    : s.fees === "partial" ? Math.floor((s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000) * 0.5)
    : 0,
  status: s.fees,
  dueDate: s.fees === "overdue" ? "2026-03-01" : "2026-06-30",
  installments: s.fees === "paid"
    ? [
        { id: 1, amount: Math.round((s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000) / 3), date: "2026-01-15", receipt: `RCP-${100 + i}01`, status: "paid" },
        { id: 2, amount: Math.round((s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000) / 3), date: "2026-02-10", receipt: `RCP-${100 + i}02`, status: "paid" },
        { id: 3, amount: Math.round((s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000) / 3), date: "2026-03-05", receipt: `RCP-${100 + i}03`, status: "paid" },
      ]
    : s.fees === "partial"
    ? [
        { id: 1, amount: Math.round((s.year === 1 ? 98000 : s.year === 2 ? 102000 : 110000) / 2), date: "2026-01-15", receipt: `RCP-${100 + i}01`, status: "paid" },
      ]
    : [],
}));

export const activities = [
  { id: 1, timestamp: "5 mins ago", actor: "Prof. Rajesh Kumar", action: "Attendance Marked", details: "Attendance recorded for CE-2A, Data Structures — 58 present, 7 absent." },
  { id: 2, timestamp: "25 mins ago", actor: "Admin", action: "Student Added", details: "New student Varun Kulkarni (CE23B005) enrolled in Computer Engineering Yr 1." },
  { id: 3, timestamp: "1 hour ago", actor: "Dr. Priya Sharma", action: "Progress Note Added", details: "Progress review completed for 18 assigned students in CE-2A batch." },
  { id: 4, timestamp: "2 hours ago", actor: "Admin", action: "Fee Payment Received", details: "Fee payment of ₹34,000 received from Rohan Kulkarni (CE22A005)." },
  { id: 5, timestamp: "3 hours ago", actor: "Prof. Amit Shah", action: "Test Card Created", details: "Internal Assessment 2 created for ME-2A, Thermodynamics — 50 marks." },
  { id: 6, timestamp: "4 hours ago", actor: "System", action: "Low Attendance Alert", details: "Attendance below 75% detected for Karan Mehta (CE22A007) — parent notified." },
  { id: 7, timestamp: "Yesterday", actor: "Admin", action: "CSV Import Completed", details: "23 students imported successfully from batch_ce2023.csv." },
  { id: 8, timestamp: "Yesterday", actor: "Dr. Sneha Desai", action: "Marks Updated", details: "Web Technologies mid-term marks entered for IT-1A batch." },
  { id: 9, timestamp: "2 days ago", actor: "Prof. Vikram Singh", action: "Attendance Marked", details: "Attendance recorded for IT-2A, Machine Learning — 52 present, 6 absent." },
  { id: 10, timestamp: "2 days ago", actor: "Admin", action: "Fee Overdue Alert", details: "Fee status changed to Overdue for Siddharth Reddy (CE22B003)." },
];

export const teacherSchedule = [
  { id: 1, time: "9:00 AM - 10:00 AM", subject: "Data Structures", class: "Computer Engineering - 2A", status: "marked" },
  { id: 2, time: "10:15 AM - 11:15 AM", subject: "Algorithms", class: "Computer Engineering - 2B", status: "pending" },
  { id: 3, time: "11:30 AM - 12:30 PM", subject: "Data Structures Lab", class: "Computer Engineering - 2A", status: "pending" },
  { id: 4, time: "2:00 PM - 3:00 PM", subject: "Algorithms", class: "Computer Engineering - 1A", status: "upcoming" },
];

export const teacherTests = [
  { id: "T-201", name: "Internal Assessment 1", subject: "Data Structures", class: "CE-2A", date: "2026-03-20", totalMarks: 50, marksEntered: 65, totalStudents: 65, status: "completed" },
  { id: "T-202", name: "Surprise Quiz", subject: "Algorithms", class: "CE-2B", date: "2026-04-05", totalMarks: 10, marksEntered: 20, totalStudents: 62, status: "pending" },
  { id: "T-203", name: "Mid-Term Examination", subject: "Algorithms", class: "CE-1A", date: "2026-04-20", totalMarks: 100, marksEntered: 0, totalStudents: 60, status: "upcoming" },
];

export const mentorStudents = students.filter(s => s.mentorId === "M-101").slice(0, 18);

export const progressNotes = [
  { id: 1, studentId: "S-101", date: "2026-03-10", rating: 5, note: "Arjun is showing exceptional grasp of Data Structures. He actively participates in doubt sessions and helps peers. Excellent academic trajectory.", mentor: "Dr. Priya Sharma" },
  { id: 2, studentId: "S-101", date: "2026-02-15", rating: 4, note: "Good participation in lab modules. Should focus more on Algorithm complexity analysis to strengthen competitive programming skills.", mentor: "Dr. Priya Sharma" },
  { id: 3, studentId: "S-102", date: "2026-03-08", rating: 4, note: "Ananya is consistent in attendance and assignments. Needs to work on DBMS practical component.", mentor: "Dr. Priya Sharma" },
  { id: 4, studentId: "S-103", date: "2026-03-12", rating: 2, note: "Ishaan's attendance is concerning at 72%. Advised him to attend all remaining lectures. Parents have been informed.", mentor: "Dr. Priya Sharma" },
];

export const messageThreads = [
  {
    id: "TH-101",
    sender: "Sunita Patel",
    role: "Parent",
    relation: "Mother of Arjun Patel",
    subject: "Semester 2 Fee Payment Query",
    lastMessage: "Thank you for the update, I will process the remaining installment by Friday.",
    timestamp: "2 hours ago",
    isRead: false,
    status: "open"
  },
  {
    id: "TH-102",
    sender: "Ishaan Gupta",
    role: "Student",
    relation: "Self",
    subject: "Doubt in Binary Tree Rotations",
    lastMessage: "I am still confused about the left-right rotation case in AVL trees. Can we schedule a session?",
    timestamp: "5 hours ago",
    isRead: true,
    status: "open"
  },
  {
    id: "TH-103",
    sender: "Karan Mehta",
    role: "Student",
    relation: "Self",
    subject: "Medical Leave Application",
    lastMessage: "Requesting 2 days leave from April 8-9 due to fever. Attaching medical certificate.",
    timestamp: "Yesterday",
    isRead: true,
    status: "resolved"
  },
];

export const studentAttendanceLog = Array.from({ length: 90 }).map((_, i) => ({
  date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
  status: Math.random() > 0.08 ? "present" : Math.random() > 0.5 ? "late" : "absent",
  subject: ["Data Structures", "Algorithms", "Database Management Systems", "Operating Systems"][Math.floor(Math.random() * 4)],
}));

export const studentTestScores = [
  { id: 1, test: "Internal Assessment 1", subject: "Data Structures", score: 45, total: 50, date: "2026-03-20", badge: "excellent" },
  { id: 2, test: "Surprise Quiz", subject: "Algorithms", score: 8, total: 10, date: "2026-04-05", badge: "good" },
  { id: 3, test: "Internal Test 1", subject: "DBMS", score: 32, total: 50, date: "2026-03-10", badge: "average" },
  { id: 4, test: "Lab Evaluation", subject: "Data Structures Lab", score: 18, total: 20, date: "2026-04-02", badge: "excellent" },
];

export const doubtThreads = [
  { id: "DB-101", title: "AVL Tree Left-Right Rotation Logic", subject: "Data Structures", status: "open", timestamp: "2 days ago", unread: 1 },
  { id: "DB-102", title: "Clarification on Semester 2 Fees", subject: "Administration", status: "resolved", timestamp: "1 week ago", unread: 0 },
];

export const parentProfile = {
  id: "P-101",
  name: "Sunita Patel",
  email: "sunita.patel@gmail.com",
  wardId: "S-101",
  wardName: "Arjun Patel",
  wardRollNo: "CE22A001",
  mentorName: "Dr. Priya Sharma",
  lastMentorContact: "2 hours ago",
  relation: "Mother"
};

export const parentThreads = [
  {
    id: "PTH-101",
    sender: "Dr. Priya Sharma",
    subject: "Academic Progress Update — April 2026",
    lastMessage: "Arjun's performance in Data Structures this semester has been impressive. He scored 45/50 in the last internal assessment.",
    timestamp: "2 hours ago",
    isRead: false,
    status: "open",
    replies: 4
  },
  {
    id: "PTH-102",
    sender: "Dr. Priya Sharma",
    subject: "Attendance Advisory",
    lastMessage: "Arjun has maintained 94% attendance this semester which is excellent. Please ensure this continues.",
    timestamp: "Last Monday",
    isRead: true,
    status: "resolved",
    replies: 2
  },
];

export const arjunFees = feeRecords.find(f => f.studentId === "S-101") || {
  student: "Arjun Patel",
  rollNo: "CE22A001",
  class: "2-A",
  branch: "Computer Engineering",
  totalFee: 102000,
  paidAmount: 102000,
  balance: 0,
  status: "paid",
  installments: [
    { id: 1, amount: 34000, date: "2026-01-15", receipt: "RCP-10101", status: "paid" },
    { id: 2, amount: 34000, date: "2026-02-10", receipt: "RCP-10102", status: "paid" },
    { id: 3, amount: 34000, date: "2026-03-05", receipt: "RCP-10103", status: "paid" },
  ]
};
