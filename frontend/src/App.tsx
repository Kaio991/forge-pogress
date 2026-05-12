import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const resposta = await axios.post('http://localhost:3000/usuario/login', {
        email: email,
        senha: senha
      });
      
      localStorage.setItem('token', resposta.data.token);
      localStorage.setItem('nomeUsuario', resposta.data.nome);

      alert('Acesso autorizado! 🏋️');
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao entrar. Verifique o console.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans">
      {/* Luzes de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md z-10 p-[1px] rounded-3xl bg-gradient-to-b from-zinc-700 to-transparent">
        <div className="bg-zinc-950/80 backdrop-blur-xl p-10 rounded-[23px] shadow-2xl">

          <header className="text-center mb-10">
            <div className="inline-block px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 mb-4">
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">System v2.0</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Forge <span className="text-orange-600">Progress</span>
            </h1>
            <div className="h-1 w-12 bg-orange-600 mx-auto mt-2 rounded-full"></div>
          </header>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Identity</label>
              <input
                type="email"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all duration-300"
                placeholder="E-mail de acesso"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Security Key</label>
              <input
                type="password"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all duration-300"
                placeholder="Sua senha secreta"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full group relative bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] overflow-hidden"
            >
              <span className="relative z-10 uppercase italic tracking-wider">Iniciar Treinamento</span>
              <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 left-[-100%]"></div>
            </button>
          </form>

          {/* Seção de Cadastro */}
          <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-500 text-sm mb-4">Novo na equipe?</p>
            <button
              type="button"
              className="w-full bg-transparent border border-zinc-700 hover:border-orange-600 hover:text-orange-600 text-zinc-300 font-bold py-3 rounded-xl transition-all duration-300 uppercase text-xs tracking-widest"
            >
              Cadastre-se
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App