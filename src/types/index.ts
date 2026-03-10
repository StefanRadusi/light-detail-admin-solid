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

export interface ContentNode {
  id: number;
  key: string;
  value: string | null;
  type: "text" | "image" | "video" | "section";
  parentId: number | null;
  order: number | null;
  metadata: Record<string, unknown> | null;
  createdAt: number | null;
  updatedAt: number | null;
  children: ContentNode[];
}
