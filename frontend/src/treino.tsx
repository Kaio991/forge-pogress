import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CriarTreino() {
    // Estados para os campos do seu Model (image_45f1b3.png)
    const [exercicio, setExercicio] = useState('');
    const [carga, setCarga] = useState('');
    const [repeticoes, setRepeticoes] = useState('');
    const navigate = useNavigate();

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Enviando para a rota de criação
            // Importante: Number() garante que o Zod receba números e não strings
            await axios.post('http://localhost:3000/treino/criar',
                {
                    exercicio,
                    carga: Number(carga),
                    repeticoes: Number(repeticoes)
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Se deu certo, volta pro painel
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro ao salvar no banco:", err);
            alert("Erro ao forjar treino. Verifique o console do VS Code (Backend).");
        }
    };

    return (
        <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
            <div style={{ backgroundColor: '#121212', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '450px', border: '1px solid #1f1f1f', boxSizing: 'border-box' }}>

                <header style={{ marginBottom: '30px' }}>
                    <p style={{ color: '#FF4500', fontSize: '12px', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>FORGE V2.0</p>
                    <h2 style={{ fontSize: '32px', fontStyle: 'italic', fontWeight: '900', margin: '5px 0' }}>
                        NOVO <span style={{ color: '#FF4500' }}>EXERCÍCIO</span>
                    </h2>
                </header>

                <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>NOME DO EXERCÍCIO</label>
                        <input
                            required
                            placeholder="Ex: Supino inclinado"
                            value={exercicio}
                            onChange={(e) => setExercicio(e.target.value)}
                            style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
                        {/* Campo Carga - Flex 1 para não vazar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0 }}>
                            <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>CARGA (KG)</label>
                            <input
                                required
                                type="number"
                                placeholder="0"
                                value={carga}
                                onChange={(e) => setCarga(e.target.value)}
                                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                            />
                        </div>

                        {/* Campo Repetições - Flex 1 para não vazar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0 }}>
                            <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>REPS</label>
                            <input
                                required
                                type="number"
                                placeholder="0"
                                value={repeticoes}
                                onChange={(e) => setRepeticoes(e.target.value)}
                                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>

                    <button type="submit" style={{
                        backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '16px', padding: '20px',
                        fontWeight: '900', fontSize: '18px', cursor: 'pointer', textTransform: 'uppercase', marginTop: '10px'
                    }}>
                        FORJAR EXERCÍCIO
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        VOLTAR
                    </button>
                </form>
            </div>
        </div>
    );
}