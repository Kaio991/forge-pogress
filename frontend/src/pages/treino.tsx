import { useState } from 'react';
import api from '../service/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PlusCircle, ArrowLeft, Dumbbell, Hash, Weight } from 'lucide-react';

export default function CriarTreino() {
    const [exercicio, setExercicio] = useState('');
    const [carga, setCarga] = useState('');
    const [repeticoes, setRepeticoes] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/treino/criar', {
                exercicio,
                carga: Number(carga),
                repeticoes: Number(repeticoes)
            });

        
            toast.success("Exercício forjado com sucesso! 💪");

            
            setLoading(false);

            
             setTimeout(() => {
                navigate('/dashboard');
            }, 800); 

        } catch (err: any) {
            setLoading(false); 
            console.error("Erro ao salvar:", err);
            toast.error("Erro ao sincronizar com a Forja.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans p-4">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-md z-10 p-[1px] rounded-3xl bg-gradient-to-b from-zinc-700 to-transparent">
                <div className="bg-zinc-950/90 backdrop-blur-xl p-8 rounded-[23px] shadow-2xl">

                    <header className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Forge v2.0</span>
                        </div>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                            Novo <span className="text-orange-600">Exercício</span>
                        </h2>
                        <div className="h-1 w-12 bg-orange-600 mt-2 rounded-full"></div>
                    </header>

                    <form onSubmit={handleSalvar} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1 flex items-center gap-2">
                                <Dumbbell size={14} /> Nome do Exercício
                            </label>
                            <input
                                required
                                placeholder="Ex: Supino Inclinado"
                                value={exercicio}
                                onChange={(e) => setExercicio(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all duration-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase ml-1 flex items-center gap-2">
                                    <Weight size={14} /> Carga (kg)
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder="0"
                                    value={carga}
                                    onChange={(e) => setCarga(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all duration-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase ml-1 flex items-center gap-2">
                                    <Hash size={14} /> Repetições
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder="0"
                                    value={repeticoes}
                                    onChange={(e) => setRepeticoes(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full group relative bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.3)] overflow-hidden flex items-center justify-center gap-2"
                        >
                            <span className="relative z-10 uppercase italic tracking-wider flex items-center gap-2">
                                {loading ? "Forjando..." : (
                                    <>
                                        <PlusCircle size={20} />
                                        Forjar Exercício
                                    </>
                                )}
                            </span>
                            {!loading && (
                                <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 left-[-100%]"></div>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="w-full text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}