import { createContext, useState } from 'react';

export const DataSourceContext = createContext()

export const DataSourceProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState('api')
  const toggleApiSource = () => {
    setDataSource('api')
  }
  const toggleMockSource = () => {
    setDataSource('mock')
  }

  return (
      <DataSourceContext.Provider value={{ dataSource, toggleApiSource, toggleMockSource }}>
          {children}
      </DataSourceContext.Provider>
  )
}