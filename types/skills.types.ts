type skillsTypes = {
  _id?: string;
  name: string;
  userID?: string;
  category: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

export type { skillsTypes };
