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
        id: 1,
        title: "Student Ambassador",
        description: "We are seeking dedicated university/college students to join our team as Course Notes Editors. In this role, you will transcribe your course notes and upload them to our platform. The ideal candidate can take digital notes using an iPad or similar device. Clear and legible handwriting is a plus.",
        type: "Part-time",
        location: "Remote",
    },
    {
      id: 2,
      title: "Spontaneous Application",
      description: "Spontaneous Application.",
      type: "",
      location: "",
    },
  ];
  