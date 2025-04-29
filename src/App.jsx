import { HashRouter, Route, Routes } from 'react-router-dom'
import PriceList from './components/pages/PriceList'
import Terms from './components/pages/Terms'

function App() {

  return (
    // Using HashRouter here instead of BrowserRouter to avoid 404 errors on page refresh.
    // BrowserRouter tries to load routes from the server, which can fail in static hosting.
    <HashRouter> 
      <Routes>
        <Route path='/' element={<PriceList/>}/>
        <Route path='/terms' element={<Terms/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
