import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [exercicios, setExercicios] = useState<any[]>([]);
    const navigate = useNavigate();

    const carregarTreinos = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3000/treino/listar', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Esse log vai mostrar no console: id_do_treino: 150001
            console.log("Dados carregados:", res.data);
            setExercicios(res.data);
        } catch (err) {
            console.error("Erro ao carregar treinos:", err);
        }
    };

    useEffect(() => {
        carregarTreinos();
    }, []);

    const deletarTreino = async (id: number) => {
        if (!confirm("Remover este exercício da Forja?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/treino/deletar/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExercicios(exercicios.filter(t => t.id_do_treino !== id));
        } catch (err) {
            alert("Erro ao eliminar.");
        }
    };

    return (
        <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                <div>
                    <p style={{ color: '#FF4500', fontWeight: 'bold', margin: 0, fontSize: '14px', letterSpacing: '2px' }}>FORGE V2.0</p>
                    <h1 style={{ fontSize: '36px', fontStyle: 'italic', margin: 0, fontWeight: 900 }}>MEU <span style={{ color: '#FF4500' }}>PAINEL</span></h1>
                </div>
                <button
                    onClick={() => navigate('/criar-treino')}
                    style={{ backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '14px', padding: '14px 28px', fontWeight: '900', cursor: 'pointer' }}
                >
                    + NOVO EXERCÍCIO
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                {exercicios.map((item) => {
                    // AQUI ESTÁ O SEGREDO: Usar o nome exato do seu banco
                    const currentId = item.id_do_treino;

                    return (
                        <div key={currentId} style={{ backgroundColor: '#121212', borderRadius: '24px', padding: '30px', border: '1px solid #1f1f1f' }}>
                            <h3 style={{ margin: '0 0 20px 0', textTransform: 'uppercase', fontSize: '22px', fontWeight: 800 }}>{item.exercicio}</h3>

                            <div style={{ display: 'flex', gap: '30px', marginBottom: '25px' }}>
                                <div>
                                    <p style={{ color: '#666', fontSize: '11px', fontWeight: 'bold', margin: 0 }}>CARGA</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{item.carga} KG</p>
                                </div>
                                <div>
                                    <p style={{ color: '#666', fontSize: '11px', fontWeight: 'bold', margin: 0 }}>REPS</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{item.repeticoes}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => {
                                        if (!currentId) return alert("Erro: id_do_treino não encontrado!");
                                        // Isso vai gerar a URL /editar-treino/150001
                                        navigate(`/editar-treino/${currentId}`, { state: { treino: item } });
                                    }}
                                    style={{ flex: 2, backgroundColor: '#1c1c1c', color: '#fff', padding: '15px', border: '1px solid #333', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => deletarTreino(currentId)}
                                    style={{ flex: 1, backgroundColor: '#1c1c1c', border: '1px solid #333', borderRadius: '12px', cursor: 'pointer', color: '#ff4444' }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}