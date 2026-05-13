import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus, Mail, Lock, User, ArrowRight, Calendar, Scale, Ruler } from 'lucide-react';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://forge-pogress.onrender.com/usuario/cadastro', {
                nome,
                email,
                senha,
                idade: Number(idade),
                peso: Number(peso),
                altura: Number(altura)
            });

            toast.success("Perfil forjado! Faça seu login.");
            navigate('/');
        } catch (err: any) {
            const msg = err.response?.data?.mensagem || "Erro ao criar conta.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden font-sans text-white">
            <div className="absolute inset-0 bg-orange-600/5 blur-[120px] rounded-full scale-50"></div>

            <div className="w-full max-w-lg z-10 p-[1px] rounded-[32px] bg-gradient-to-b from-zinc-700 to-transparent">
                <div className="bg-zinc-950/90 backdrop-blur-xl p-8 md:p-10 rounded-[31px] shadow-2xl">

                    <header className="text-center mb-8">
                        <div className="inline-flex p-3 bg-orange-600/10 rounded-2xl text-orange-600 mb-4">
                            <UserPlus size={32} />
                        </div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                            Nova <span className="text-orange-600">Forja</span>
                        </h2>
                    </header>

                    <form onSubmit={handleCadastro} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <User size={12} className="text-orange-600" /> Nome
                                </label>
                                <input required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-3 focus:border-orange-600 outline-none transition-all" placeholder="Seu nome" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Mail size={12} className="text-orange-600" /> E-mail
                                </label>
                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-3 focus:border-orange-600 outline-none transition-all" placeholder="email@exemplo.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Calendar size={12} className="text-orange-600" /> Idade
                                </label>
                                <input required type="number" value={idade} onChange={e => setIdade(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-3 focus:border-orange-600 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Scale size={12} className="text-orange-600" /> Peso (kg)
                                </label>
                                <input required type="number" step="0.1" value={peso} onChange={e => setPeso(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-3 focus:border-orange-600 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Ruler size={12} className="text-orange-600" /> Altura (m)
                                </label>
                                <input required type="number" step="0.01" value={altura} onChange={e => setAltura(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-3 focus:border-orange-600 outline-none transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                <Lock size={12} className="text-orange-600" /> Senha
                            </label>
                            <input required type="password" value={senha} onChange={e => setSenha(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-3 focus:border-orange-600 outline-none transition-all" placeholder="••••••••" />
                        </div>

                        <button disabled={loading} className="w-full group bg-orange-600 hover:bg-orange-500 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)] mt-6 uppercase italic">
                            {loading ? "Criando Perfil..." : (
                                <>
                                    <span>Finalizar Cadastro</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <footer className="mt-8 text-center">
                        <button onClick={() => navigate('/')} className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                            Já treina conosco? <span className="text-orange-600">Login</span>
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}