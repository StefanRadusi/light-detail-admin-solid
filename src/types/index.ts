export enum ProjectType {
  COMMERCIAL = "commercial",
  RESIDENTIAL = "residential",
  VISUALIZATION = "visualisation",
}
export interface Project {
  id: string;
  coverImageUrl: string;
  createdAt: number;
  description: string;
  imgs: string[];
  latestPosition: number;
  tags: string[];
  title: string;
  type: ProjectType;
  updatedAt: number;
}

export interface StaffMember {
  id: string;
  coverImageUrl: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  author: string;
  description: string;
}
