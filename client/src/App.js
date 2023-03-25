import { BrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import useRoutes from './pages/Routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from "./context/authContext"

function App () {
  const {  login, logout, isReady, token, userId } = useAuth()
  const isLogin = !!token 
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{login, logout, isReady, token, userId, isLogin}}>
    <div className='App'>
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
  )
}

export default App
