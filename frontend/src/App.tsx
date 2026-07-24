import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { PageTransitionLoader } from '@/components/ui/PageTransitionLoader';

// Pages
import HomePage from '@/pages/home/HomePage';
import AboutPage from '@/pages/about/AboutPage';
import ContactPage from '@/pages/contact/ContactPage';
import WorkPage from '@/pages/work/WorkPage';
import InsightsPage from '@/pages/insights/InsightsPage';
import InsightPostPage from '@/pages/insights/InsightPostPage';
import SolutionsPage from '@/pages/solutions/SolutionsPage';
import CloudPage from '@/pages/solutions/cloud/CloudPage';
import SeoOptimizationPage from '@/pages/services/SeoOptimizationPage';
import AiSolutionsPage from '@/pages/services/AiSolutionsPage';
import WebDevelopmentPage from '@/pages/services/WebDevelopmentPage';
import CloudDevopsPage from '@/pages/services/CloudDevopsPage';
import DataAnalyticsPage from '@/pages/services/DataAnalyticsPage';

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <BackgroundVideo />
        <PageTransitionLoader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightPostPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/cloud" element={<CloudPage />} />
          <Route path="/services/seo-optimization" element={<SeoOptimizationPage />} />
          <Route path="/services/ai-solutions" element={<AiSolutionsPage />} />
          <Route path="/services/web-development" element={<WebDevelopmentPage />} />
          <Route path="/services/cloud-devops" element={<CloudDevopsPage />} />
          <Route path="/services/data-analytics" element={<DataAnalyticsPage />} />
        </Routes>
      </ThemeProvider>
    </HashRouter>
  );
}
