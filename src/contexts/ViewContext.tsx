import { createContext, useState, ReactNode, useContext } from 'react';

interface ViewContextProps {
  currentView: string;
  changeView: (view: string) => void;
}

const ViewContext = createContext<ViewContextProps | undefined>(undefined);

const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<string>('main');

  const changeView = (view: string) => {
    setCurrentView(view);
  };

  return (
    <ViewContext.Provider value={{ currentView, changeView }}>{children}</ViewContext.Provider>
  );
};

const useViewContext = () => {
  const context = useContext(ViewContext);

  return context as ViewContextProps;
};

export { useViewContext };

export default ViewProvider;
