import { schoolData } from '../constants/schoolData';

export const getSchools = (): string[] => {
  return Object.keys(schoolData);
};

export const getEducations = (school: string): string[] => {
  return schoolData[school] || [];
};
