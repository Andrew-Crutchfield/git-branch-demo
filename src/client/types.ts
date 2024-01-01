export interface User {
    id: number;
    handle: string;
    email: string;
}
  
export interface Chirp {
    id: number;
    user_id: number; 
    body: string; 
    createdAt: string; 
}
  