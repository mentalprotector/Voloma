import VersionA from './components/versions/VersionA';
import VersionB from './components/versions/VersionB';
import VersionBConfigurator from './components/versions/VersionBConfigurator';

function App() {
  const pathname = window.location.pathname.toLowerCase();

  if (pathname === '/b/configurator' || pathname === '/b/configurator/') {
    return <VersionBConfigurator />;
  }

  if (pathname === '/b' || pathname.startsWith('/b/')) {
    return <VersionB />;
  }

  return <VersionA />;
}

export default App;
