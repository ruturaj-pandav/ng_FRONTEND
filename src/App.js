import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import WebSitePrompts from "./components/WebSitePrompts";
import AddWebsite from "./components/AddWebsite";
import WebsiteSegments from "./components/WebsiteSegments";
import WebsiteDashboard from "./components/WebsiteDashboard";
import Notifications from "./components/Notifications";
import SegmentEdit from "./components/SegmentEdit";
import AddNotification from "./components/AddNotification";
import PromptEdit from "./components/PromptEdit";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import WebsiteIntegration from "./components/WebsiteIntegration";
import ABTestAnalytics from "./components/ABTestAnalytics";
import AddSegments from "./components/AddSegments";
import AddABTest from "./components/AddABTest";
import ABTest from "./components/ABTest";
import Profile from "./components/Profile";
import Analytics from "./components/Analytics";
import PromptAdd from "./components/PromptAdd";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" name="login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/websites/add" element={<AddWebsite />} />
          <Route path="/website/:website_id" element={<WebsiteDashboard />} />
          <Route
            path="/website/:website_id/prompts"
            element={<WebSitePrompts />}
          />
          <Route
            path="/website/:website_id/integration"
            element={<WebsiteIntegration />}
          />
          <Route
            path="/website/:website_id/segments/add"
            element={<AddSegments />}
          />
          <Route
            path="/website/:website_id/segments"
            element={<WebsiteSegments />}
          />
          <Route
            path="/website/:website_id/notifications"
            element={<Notifications />}
          />
          <Route
            path="/website/:website_id/ab"
            element={<ABTest />}
          />
          <Route
            path="/website/:website_id/ab/add"
            element={<AddABTest />}
          />
          <Route
            path="/website/:website_id/prompts/add"
            element={<PromptAdd />}
          />
          <Route
            path="/website/:website_id/notification/add"
            element={<AddNotification />}
          />
          <Route
            path="/website/:website_id/prompts/edit/:prompt_id"
            element={<PromptEdit />}
          />
          <Route
            path="/website/:website_id/segments/edit/:segment"
            element={<SegmentEdit />}
          />
          <Route
            path="/website/:website_id/notifications/:notification_id/view"
            element={<Analytics />}
          />
          <Route
            path="/website/:website_id/ab/:ab_id/view"
            element={<ABTestAnalytics />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
