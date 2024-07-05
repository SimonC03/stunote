import { schoolData } from '../constants/schoolData';

export const getSchools = (): string[] => {
  return Object.keys(schoolData);
};

export const getEducations = (school: string): string[] => {
  return schoolData[school] ? schoolData[school].map(course => course.name) : [];
};

export const getCourses = (school: string, education: string): string[] => {
  const schoolCourses = schoolData[school];
  if (!schoolCourses) {
    return [];
  }

  const educationCourse = schoolCourses.find(course => course.name === education);
  return educationCourse ? educationCourse.codes : [];
};
