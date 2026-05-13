import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Plus,
    Pencil,
    Trash2,
    Dumbbell,
    Weight,
    Hash,
    LogOut,
    Search,
    BarChart3,
    AlertTriangle
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    CartesianGrid
} from 'recharts';

export default function Dashboard() {
    const [exercicios, setExercicios] = useState<any[]>([]);
    const [busca, setBusca] = useState('');
    const [loading, setLoading] = useState(true);

    // --- ESTADOS DO MODAL CUSTOMIZADO ---
    const [modalAberto, setModalAberto] = useState(false);
    const [idParaDeletar, setIdParaDeletar] = useState<number | null>(null);

    const navigate = useNavigate();

    const carregarTreinos = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3000/treino/listar', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExercicios(res.data);
        } catch (err) {
            console.error("Erro ao carregar:", err);
            toast.error("Erro ao sincronizar com a Forja.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarTreinos();
    }, []);

    const exerciciosFiltrados = exercicios.filter(ex =>
        ex.exercicio.toLowerCase().includes(busca.toLowerCase())
    );

    const dadosGrafico = exercicios.map(ex => ({
        name: ex.exercicio.length > 8 ? ex.exercicio.substring(0, 8) + '..' : ex.exercicio,
        fullName: ex.exercicio,
        volume: Number(ex.carga) * Number(ex.repeticoes)
    })).slice(0, 6);

    const abrirConfirmacao = (id: number) => {
        setIdParaDeletar(id);
        setModalAberto(true);
    };

    const deletarTreinoConfirmado = async () => {
        if (!idParaDeletar) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/treino/deletar/${idParaDeletar}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setExercicios(exercicios.filter(t => t.id_do_treino !== idParaDeletar));
            setModalAberto(false);

            toast.error("REGISTRO ELIMINADO!", {
                icon: () => "🗑️",
                style: {
                    borderRadius: '16px',
                    background: '#09090b',
                    color: '#fff',
                    border: '1px solid #451a03',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '11px',
                },
            });
        } catch (err) {
            toast.error("Falha ao tentar remover.");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        toast.info("Sessão encerrada.");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-10 relative overflow-x-hidden">

            {/* --- MODAL DE CONFIRMAÇÃO --- */}
            {modalAberto && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
                        onClick={() => setModalAberto(false)}
                    ></div>

                    <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-sm p-6 md:p-8 rounded-[32px] shadow-2xl scale-100 transition-transform">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-red-600/10 rounded-full text-red-500 mb-6">
                                <AlertTriangle size={32} />
                            </div>

                            <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Eliminar da Forja?</h3>
                            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                                Essa ação é permanente. Seu registro será removido para sempre.
                            </p>

                            <div className="flex flex-col w-full gap-3">
                                <button
                                    onClick={deletarTreinoConfirmado}
                                    className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={() => setModalAberto(false)}
                                    className="w-full bg-zinc-900 hover:bg-zinc-800 py-4 rounded-2xl font-black uppercase italic tracking-widest text-zinc-400 transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Efeitos de Fundo */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-orange-600/5 blur-[120px] rounded-full"></div>

            <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                <div>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Forge v2.0</p>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
                        Meu <span className="text-orange-600">Painel</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => navigate('/criar-treino')}
                        className="flex-1 sm:flex-none bg-orange-600 hover:bg-orange-500 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                    >
                        <Plus size={18} strokeWidth={3} />
                        <span className="uppercase italic tracking-wider text-[12px] md:text-sm">Novo Treino</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="p-4 bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/50 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">

                {/* GRÁFICO RESPONSIVO */}
                {!loading && exercicios.length > 0 && (
                    <section className="bg-zinc-950/40 border border-zinc-900 p-5 md:p-8 rounded-[32px] backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <BarChart3 size={18} className="text-orange-500" />
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Volume (Carga x Reps)</h2>
                        </div>

                        <div className="h-48 md:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dadosGrafico}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#52525b', fontSize: 10 }}
                                        dy={10}
                                        interval={0} // Garante que todos os nomes apareçam
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#18181b' }}
                                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '12px' }}
                                    />
                                    <Bar dataKey="volume" radius={[4, 4, 0, 0]} barSize={window.innerWidth < 640 ? 25 : 40}>
                                        {dadosGrafico.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ea580c' : '#9a3412'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                )}

                {/* BUSCA COM DESIGN REFINADO */}
                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar na forja..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="w-full bg-zinc-900/20 border border-zinc-800 rounded-2xl py-4 md:py-5 pl-14 pr-6 focus:outline-none focus:border-orange-600/40 focus:bg-zinc-900/40 transition-all text-white placeholder:text-zinc-700 text-sm md:text-base"
                    />
                </div>

                {/* LISTAGEM RESPONSIVA */}
                {loading ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest">Aguarde...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {exerciciosFiltrados.map((item) => (
                            <div key={item.id_do_treino} className="group bg-zinc-950/60 border border-zinc-900 p-6 md:p-8 rounded-[32px] hover:border-orange-600/40 transition-all duration-300">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-lg md:text-xl font-black uppercase italic group-hover:text-orange-500 transition-colors leading-tight">
                                        {item.exercicio}
                                    </h3>
                                    <Dumbbell size={18} className="text-zinc-800 group-hover:text-orange-600/30 shrink-0" />
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6 md:mb-8">
                                    <div className="bg-zinc-900/30 p-3 md:p-4 rounded-2xl border border-zinc-800/50 text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1 text-[9px] text-zinc-500 font-black uppercase">
                                            <Weight size={10} className="text-orange-600" /> Carga
                                        </div>
                                        <p className="text-xl md:text-2xl font-black">{item.carga}kg</p>
                                    </div>
                                    <div className="bg-zinc-900/30 p-3 md:p-4 rounded-2xl border border-zinc-800/50 text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1 text-[9px] text-zinc-500 font-black uppercase">
                                            <Hash size={10} className="text-orange-600" /> Reps
                                        </div>
                                        <p className="text-xl md:text-2xl font-black">{item.repeticoes}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/editar-treino/${item.id_do_treino}`, { state: { treino: item } })}
                                        className="flex-[2] bg-zinc-900 hover:bg-zinc-800 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-zinc-800 transition-all"
                                    >
                                        <Pencil size={14} className="text-orange-600" />
                                        <span className="text-[10px] uppercase tracking-widest">Editar</span>
                                    </button>
                                    <button
                                        onClick={() => abrirConfirmacao(item.id_do_treino)}
                                        className="flex-1 bg-zinc-900 hover:bg-red-600/10 border border-zinc-800 hover:border-red-500/30 text-zinc-700 hover:text-red-500 rounded-xl transition-all flex items-center justify-center"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}