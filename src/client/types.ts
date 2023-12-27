export interface User {
    id: number;
    username: string;
    email: string;
}
  
export interface Chirp {
    id: number;
    userId: number; 
    content: string; 
    createdAt: string; 
}
  