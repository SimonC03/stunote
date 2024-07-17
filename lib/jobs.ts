// lib/jobs.ts

export interface Job {
    id: number;
    title: string;
    description: string;
    type: string;
    location: string;
  }
  
  export const JOBS_DATA: Job[] = [
    {
      "id": 1,
      "title": "Student Ambassador",
      "description": "We are seeking dedicated university/college students to join our team as Student Ambassadors! In this role, you will report the courses you are taking, submit lecture notes, and contribute material for the courses you are enrolled in. In return, you will receive a premium subscription to Stunote, discounts on our used textbooks, and other perks such as movie tickets. The ideal candidate is currently enrolled in a university/college, can take digital notes using an iPad or similar device, and has clear and legible handwriting. Accuracy and readability are highly valued in this role. Please include in your application the name of your school and program, and explain why you believe you are a good fit for this role.",
      "type": "Part-time",
      "location": "Remote"
    },
    {
      id: 2,
      title: "Spontaneous Application",
      description: "Spontaneous Application.",
      type: "",
      location: "",
    },
  ];
  