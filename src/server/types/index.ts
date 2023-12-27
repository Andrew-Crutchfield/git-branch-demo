
export interface Chirp {
    id: number;
    user_id: number | null; 
    body: string | null; 
    location: string | null; 
    created_at: string; 
}