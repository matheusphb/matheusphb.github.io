import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CV_DATA } from './constants';
import { ProfileData } from './types';
import HomePage from './pages/HomePage';
import PanelPage from './pages/PanelPage';
import { isProfileData } from './utils/validation';

const STORAGE_KEY = 'cv_profile_data_v1';

const loadProfileData = (): ProfileData => {
  if (typeof window === 'undefined') return CV_DATA;
  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (!rawData) return CV_DATA;
    const parsedData = JSON.parse(rawData);
    return isProfileData(parsedData) ? parsedData : CV_DATA;
  } catch {
    return CV_DATA;
  }
};

const App: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>(() => loadProfileData());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }, [profileData]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage profileData={profileData} onUpdate={setProfileData} />} />
        <Route path="/painel" element={<PanelPage profileData={profileData} onUpdate={setProfileData} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;