import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './providers/ThemeProvider';
import PlaygroundPage from './pages/playground';
import CxDashboardPage from './pages/cx-dashboard';
import SharedPlayground from './pages/shared';

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlaygroundPage />} />
          <Route path="/cx-dashboard" element={<CxDashboardPage />} />
          <Route path="/:shareId" element={<SharedPlayground />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
