class LocalStorageManager {
  getItem = (key: string): string | null => {
    try {
      const data = localStorage.getItem(key);

      return JSON.parse(data as string) ?? null;
    } catch (e) {
      console.error(e);

      return null;
    }
  };

  setItem = <T,>(key: string, value: T extends infer A ? A : unknown) => {
    try {
      const castedToString = JSON.stringify(value);
      castedToString && localStorage.setItem(key, castedToString);
    } catch (e) {
      console.error(e);
    }
  };

  removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}

export const localStorageManager = new LocalStorageManager();
