import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Save,
    ArrowLeft,
    Dumbbell,
    Weight,
    Hash,
    RotateCcw
} from 'lucide-react';

export default function EditarTreino() {
    const { id } = useParams(); // Pega o ID da URL
    const { state } = useLocation(); // Tenta pegar os dados vindos do Dashboard
    const navigate = useNavigate();

    const [exercicio, setExercicio] = useState(state?.treino?.exercicio || '');
    const [carga, setCarga] = useState(state?.treino?.carga || '');
    const [repeticoes, setRepeticoes] = useState(state?.treino?.repeticoes || '');
    const [loading, setLoading] = useState(false);
    const [buscando, setBuscando] = useState(!state?.treino);

    // Caso o usuário dê F5, buscamos o treino específico pelo ID
    useEffect(() => {
        if (!state?.treino) {
            const buscarDados = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`https://forge-pogress.onrender.com/treino/listar`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // Filtra o exercício específico no array
                    const treinoEncontrado = res.data.find((t: any) => t.id_do_treino === Number(id));

                    if (treinoEncontrado) {
                        setExercicio(treinoEncontrado.exercicio);
                        setCarga(treinoEncontrado.carga);
                        setRepeticoes(treinoEncontrado.repeticoes);
                    }
                } catch (err) {
                    toast.error("Não foi possível carregar os dados do treino.");
                } finally {
                    setBuscando(false);
                }
            };
            buscarDados();
        }
    }, [id, state]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/treino/atualizar/${id}`,
                {
                    exercicio,
                    carga: Number(carga),
                    repeticoes: Number(repeticoes)
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Evolução registrada na Forja! 🔥");
            navigate('/dashboard');
        } catch (err: any) {
            const msg = err.response?.data?.mensagem || "Erro ao atualizar treino.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (buscando) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-orange-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden font-sans">
            {/* Luzes de fundo */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/5 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-md z-10 p-[1px] rounded-[32px] bg-gradient-to-b from-zinc-700 to-transparent">
                <div className="bg-zinc-950/90 backdrop-blur-xl p-10 rounded-[31px] shadow-2xl">

                    <header className="mb-10">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-6 transition-all group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Voltar ao Painel
                        </button>
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                            Ajustar <span className="text-orange-600">Treino</span>
                        </h2>
                        <div className="h-1 w-12 bg-orange-600 mt-3 rounded-full"></div>
                    </header>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        {/* Nome do Exercício */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                <Dumbbell size={12} className="text-orange-600" /> Nome do Exercício
                            </label>
                            <input
                                required
                                value={exercicio}
                                onChange={e => setExercicio(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="Ex: Leg Press 45°"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Carga */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Weight size={12} className="text-orange-600" /> Carga (kg)
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={carga}
                                    onChange={e => setCarga(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all"
                                />
                            </div>

                            {/* Repetições */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Hash size={12} className="text-orange-600" /> Reps
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={repeticoes}
                                    onChange={e => setRepeticoes(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group relative bg-orange-600 hover:bg-orange-500 py-5 rounded-2xl font-black text-white flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)] overflow-hidden"
                            >
                                <span className="relative z-10 uppercase italic tracking-wider flex items-center gap-2">
                                    {loading ? (
                                        "Salvando..."
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Salvar Alterações
                                        </>
                                    )}
                                </span>
                                {!loading && (
                                    <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 left-[-100%]"></div>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setExercicio(state?.treino?.exercicio || '');
                                    setCarga(state?.treino?.carga || '');
                                    setRepeticoes(state?.treino?.repeticoes || '');
                                    toast.info("Valores originais restaurados.");
                                }}
                                className="w-full mt-4 flex items-center justify-center gap-2 text-zinc-600 hover:text-zinc-400 text-[10px] font-black uppercase tracking-widest transition-colors"
                            >
                                <RotateCcw size={12} /> Descartar alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}