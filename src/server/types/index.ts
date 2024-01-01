
export interface Chirp {
    id: number;
    user_id: number | null; 
    body: string | null; 
    location: string | null; 
    created_at: string; 
}

export interface User {
    id: number;
    handle: string;
    email: string;
}