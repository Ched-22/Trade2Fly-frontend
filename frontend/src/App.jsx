import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Categories from './components/Categories.jsx'
import Footer from './components/Footer.jsx'
import AppRoutes from './routes/index.jsx'
import { ShopProvider } from './context/ShopProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
      <ShopProvider>
      <div className="App">
        {/* Navbar no topo da página */}
        <Navbar />
        <Categories />
        
        
        {/* Conteúdo principal da sua aplicação */}
        <main>
          <AppRoutes />
          {/* Outros componentes aqui */}
          
        </main>
        {/* Footer no final da página */}
        <Footer />
      </div>
      </ShopProvider>
      </AuthProvider>
    </Router>
  );
}


export default App
