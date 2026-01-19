export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  user_id: number | null;
  created_at: string;
  updated_at: string;
}
