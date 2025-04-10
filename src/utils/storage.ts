
export const saveToSessionStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  
  export const loadFromSessionStorage = (key: string) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };
  