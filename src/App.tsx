import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Goals } from './pages/Goals';
import { Settings } from './pages/Settings';
import { Calendar } from './Calender';
import { CalendarProvider } from './context/CalendarContext';
import { Settings1 } from './pages/Settings1';

function App() {
  return (
    <CalendarProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendar" element={<Settings1 />} />
          </Routes>
        </Layout>
      
      </Router>
    </CalendarProvider>
  );
}

export default App;
