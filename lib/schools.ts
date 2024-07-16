import { schoolData } from '../constants/schoolData';

export const getSchools = (): string[] => {
  return Object.keys(schoolData);
};

export const getEducations = (school: string): string[] => {
  return schoolData[school] ? schoolData[school].map(course => course.name) : [];
};

export const getCoursesByYear = (school: string, education: string, year: number): string[] => {
  const schoolCourses = schoolData[school];
  if (!schoolCourses) {
    return [];
  }

  const educationCourse = schoolCourses.find(course => course.name === education);
  if (!educationCourse || !educationCourse.years[year]) {
    return [];
  }

  return educationCourse.years[year];
};
