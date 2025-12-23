import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './Contexts/LanguageContext';
import Login from './Pages/Login';
import HomePage from './Pages/Agent/HomePage';
import JobList from './Pages/Agent/JobList';
import JobDetail from './Pages/Agent/JobDetail';
import CandidateProfile from './Pages/Agent/CandidateProfile';
import CandidateDetail from './Pages/Agent/CandidateDetail';
import CreateCV from './Pages/Agent/CreateCV';
import CreateCandidate from './Pages/Agent/CreateCandidate';
import ReferralList from './Pages/Agent/ReferralList';
import Messages from './Pages/Agent/Messages';
import Revenue from './Pages/Agent/Revenue';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Chatbot from './Components/Chatbot';
import './App.css';

const MainLayout = ({ children }) => (
  <div className="h-screen flex bg-gray-50 overflow-hidden">
    <div className="flex-shrink-0">
      <Sidebar />
    </div>
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
    <Chatbot />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/agent/home"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/agent/jobs"
            element={
              <MainLayout>
                <JobList />
              </MainLayout>
            }
          />
          <Route
            path="/agent/jobs/:id"
            element={
              <MainLayout>
                <JobDetail />
              </MainLayout>
            }
          />
          <Route
            path="/agent/candidates"
            element={
              <MainLayout>
                <CandidateProfile />
              </MainLayout>
            }
          />
          <Route
            path="/agent/candidates/create"
            element={
              <MainLayout>
                <CreateCandidate />
              </MainLayout>
            }
          />
          <Route
            path="/agent/candidates/:id"
            element={
              <MainLayout>
                <CandidateDetail />
              </MainLayout>
            }
          />
          <Route
            path="/agent/candidates/:id/create-cv"
            element={
              <MainLayout>
                <CreateCV />
              </MainLayout>
            }
          />
          <Route
            path="/agent/referrals"
            element={
              <MainLayout>
                <ReferralList />
              </MainLayout>
            }
          />
          <Route
            path="/agent/messages"
            element={
              <MainLayout>
                <Messages />
              </MainLayout>
            }
          />
          <Route
            path="/agent/revenue"
            element={
              <MainLayout>
                <Revenue />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
