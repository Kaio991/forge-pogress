import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditarTreino() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const treinoParaEditar = location.state?.treino;

    const [exercicio, setExercicio] = useState(treinoParaEditar?.exercicio || '');
    const [carga, setCarga] = useState(treinoParaEditar?.carga || '');
    const [repeticoes, setRepeticoes] = useState(treinoParaEditar?.repeticoes || '');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id || id === 'undefined') {
            return alert("Erro: ID do treino não encontrado na URL.");
        }

        try {
            const token = localStorage.getItem('token');

            // Converte para Number para evitar Erro 400 no Zod
            const payload = {
                exercicio: exercicio,
                carga: Number(carga),
                repeticoes: Number(repeticoes)
            };

            await axios.put(`http://localhost:3000/treino/atualizar/${id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Treino atualizado na Forja!");
            navigate('/dashboard');
        } catch (err: any) {
            console.error("Erro no Update:", err.response?.data);
            alert(err.response?.data?.message || "Erro ao atualizar treino.");
        }
    };

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
            <form onSubmit={handleUpdate} style={{ backgroundColor: '#121212', padding: '40px', borderRadius: '30px', width: '100%', maxWidth: '400px', border: '1px solid #1f1f1f' }}>
                <h2 style={{ color: '#fff', fontStyle: 'italic', fontWeight: 900, marginBottom: '30px', fontSize: '28px' }}>
                    EDITAR <span style={{ color: '#FF4500' }}>TREINO</span>
                </h2>

                <label style={{ color: '#666', fontSize: '11px', fontWeight: 'bold' }}>NOME DO EXERCÍCIO</label>
                <input
                    value={exercicio}
                    onChange={(e) => setExercicio(e.target.value)}
                    style={{ width: '100%', padding: '15px', margin: '8px 0 20px 0', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }}
                />

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#666', fontSize: '11px', fontWeight: 'bold' }}>CARGA (KG)</label>
                        <input
                            type="number"
                            value={carga}
                            onChange={(e) => setCarga(e.target.value)}
                            style={{ width: '100%', padding: '15px', margin: '8px 0', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#666', fontSize: '11px', fontWeight: 'bold' }}>REPETIÇÕES</label>
                        <input
                            type="number"
                            value={repeticoes}
                            onChange={(e) => setRepeticoes(e.target.value)}
                            style={{ width: '100%', padding: '15px', margin: '8px 0', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }}
                        />
                    </div>
                </div>

                <button type="submit" style={{ width: '100%', backgroundColor: '#FF4500', color: '#fff', padding: '18px', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '30px' }}>
                    ATUALIZAR FORJA
                </button>
                <button type="button" onClick={() => navigate('/dashboard')} style={{ width: '100%', background: 'none', color: '#444', border: 'none', marginTop: '15px', cursor: 'pointer' }}>
                    CANCELAR
                </button>
            </form>
        </div>
    );
}