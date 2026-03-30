import VersionA from './components/versions/VersionA';
import VersionB from './components/versions/VersionB';

function App() {
  const pathname = window.location.pathname.toLowerCase();

  if (pathname === '/b' || pathname.startsWith('/b/')) {
    return <VersionB />;
  }

  return <VersionA />;
}

export default App;
