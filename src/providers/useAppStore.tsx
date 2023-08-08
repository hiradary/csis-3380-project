import { ReactNode, createContext, useState } from "react";

export type News = {
  _id?: string;
  title: string;
  highlights: string;
  sentiment: number;
  openQuestions: string[];
};

export type AppStoreValue = {
  currentNews: News | null;
  newsHistory: News[];
  setCurrentNews: (data: News) => void;
  setNewsHistory: (data: News[]) => void;
};

const defaultAppStoreValue: AppStoreValue = {
  currentNews: null,
  setCurrentNews: () => {},
  newsHistory: [],
  setNewsHistory: () => {},
};

const AppStoreContext = createContext<AppStoreValue>(defaultAppStoreValue);

const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const [currentNews, setCurrentNews] = useState<AppStoreValue["currentNews"]>(
    defaultAppStoreValue.currentNews
  );
  const [newsHistory, setNewsHistory] = useState<AppStoreValue["newsHistory"]>(
    defaultAppStoreValue.newsHistory
  );

  return (
    <AppStoreContext.Provider
      value={{
        currentNews,
        newsHistory,
        setCurrentNews,
        setNewsHistory,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
};

export { AppStoreContext, AppStoreProvider };
