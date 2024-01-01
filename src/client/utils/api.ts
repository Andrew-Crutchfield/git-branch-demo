type FetchOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
  };
  
  const rootUrl = 'http://localhost:3000'; 
  
  export async function fetchWithRootUrl<T>(path: string, options?: FetchOptions): Promise<T> {
    const url = `${rootUrl}${path}`;
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
  
    return data;
  }

  export async function fetchUsers(): Promise<any[]> {
    try {
      const response = await fetchWithRootUrl('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  }
  
  export function transformChirpApiResponse(chirps: any[]): any[] {
    return chirps.map((chirp) => ({
      ...chirp,
      content: chirp.body,
      body: undefined,
    }));
  }