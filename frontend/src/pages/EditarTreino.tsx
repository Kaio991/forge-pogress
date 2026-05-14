import { useState, useEffect } from 'react';
import api from '../service/api'; // Importante: usar a sua instância configurada
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Save,
    ArrowLeft,
    Dumbbell,
    Weight,
    Hash
} from 'lucide-react';

export default function EditarTreino() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    // Inicia com os dados vindos do state (se houver) ou vazio
    const [exercicio, setExercicio] = useState(state?.treino?.exercicio || '');
    const [carga, setCarga] = useState(state?.treino?.carga || '');
    const [repeticoes, setRepeticoes] = useState(state?.treino?.repeticoes || '');
    const [loading, setLoading] = useState(false);
    const [buscando, setBuscando] = useState(!state?.treino);

    useEffect(() => {
        // Se não veio dados pelo state, busca na API para preencher o formulário
        if (!state?.treino) {
            const buscarDados = async () => {
                try {
                    const res = await api.get(`/treino/listar`);
                    const treinoEncontrado = res.data.find((t: any) => Number(t.id_do_treino) === Number(id));

                    if (treinoEncontrado) {
                        setExercicio(treinoEncontrado.exercicio);
                        setCarga(treinoEncontrado.carga);
                        setRepeticoes(treinoEncontrado.repeticoes);
                    }
                } catch (err) {
                    toast.error("Erro ao carregar dados do treino.");
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
            // AQUI ESTÁ O PULO DO GATO: api.put usa a URL do Render automaticamente
            await api.put(`/treino/atualizar/${id}`, {
                exercicio,
                carga: Number(carga),
                repeticoes: Number(repeticoes)
            });

            toast.success("Treino atualizado com sucesso! 💪");

            setLoading(false);

            // Delay para evitar o erro de 'removeChild' no React
            setTimeout(() => {
                navigate('/dashboard');
            }, 600);

        } catch (err: any) {
            setLoading(false);
            const msg = err.response?.data?.mensagem || "Erro ao atualizar treino.";
            toast.error(msg);
            console.error("Erro na atualização:", err);
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
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 font-sans">
            <div className="w-full max-w-md p-[1px] rounded-[32px] bg-gradient-to-b from-zinc-700 to-transparent">
                <div className="bg-zinc-950 p-10 rounded-[31px] shadow-2xl">
                    <header className="mb-10">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-6 transition-all"
                        >
                            <ArrowLeft size={14} /> Voltar ao Painel
                        </button>
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                            Ajustar <span className="text-orange-600">Treino</span>
                        </h2>
                    </header>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                <Dumbbell size={12} className="text-orange-600" /> Nome do Exercício
                            </label>
                            <input
                                required
                                value={exercicio}
                                onChange={e => setExercicio(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-orange-600 outline-none transition-all"
                                placeholder="Ex: Rosca Direta"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Weight size={12} className="text-orange-600" /> Carga (kg)
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={carga}
                                    onChange={e => setCarga(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-orange-600 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1">
                                    <Hash size={12} className="text-orange-600" /> Reps
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={repeticoes}
                                    onChange={e => setRepeticoes(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-orange-600 outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-600 hover:bg-orange-500 py-5 rounded-2xl font-black text-white flex items-center justify-center gap-3 transition-all uppercase italic tracking-wider shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                            >
                                {loading ? "Sincronizando..." : (
                                    <>
                                        <Save size={20} />
                                        Salvar Alterações
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}