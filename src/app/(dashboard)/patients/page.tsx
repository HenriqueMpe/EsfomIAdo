'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle, X } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { Modal } from '@/components/Modal';
import { Toast } from '@/components/Toast';

export default function PatientsPage() {
    const { patients, addPatient, updatePatient, deletePatient } = usePatients();
    const [showForm, setShowForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState<number | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [editingHistoryIndex, setEditingHistoryIndex] = useState<number | null>(null);
    const [historyEditData, setHistoryEditData] = useState({ date: '', weight: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        goal: 'Hipertrofia',
        restrictions: ''
    });

    const handleSavePatient = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPatient) {
            updatePatient(editingPatient, {
                name: formData.name,
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight),
                height: parseInt(formData.height),
                goal: formData.goal,
                restrictions: formData.restrictions
            });
            setToastMessage(`Paciente ${formData.name} atualizado com sucesso!`);
            setEditingPatient(null);
        } else {
            const newPatient = addPatient({
                name: formData.name,
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight),
                height: parseInt(formData.height),
                goal: formData.goal,
                restrictions: formData.restrictions,
                history: [
                    { date: new Date().toISOString().split('T')[0], weight: parseFloat(formData.weight) }
                ]
            });
            setToastMessage(`Paciente ${newPatient.name} cadastrado com sucesso!`);
        }

        setShowForm(false);
        setFormData({ name: '', age: '', weight: '', height: '', goal: 'Hipertrofia', restrictions: '' });
        setShowToast(true);
    };

    const handleEditPatient = (patient: any) => {
        setFormData({
            name: patient.name,
            age: patient.age.toString(),
            weight: patient.weight.toString(),
            height: patient.height.toString(),
            goal: patient.goal,
            restrictions: patient.restrictions || ''
        });
        setEditingPatient(patient.id);
        setShowForm(true);
    };

    const handleDeletePatient = (id: number, name: string) => {
        if (confirm(`Tem certeza que deseja excluir ${name}?`)) {
            deletePatient(id);
            setToastMessage(`Paciente ${name} excluido com sucesso!`);
            setShowToast(true);
        }
    };

    const handleEditHistory = (index: number, entry: any) => {
        setEditingHistoryIndex(index);
        setHistoryEditData({ date: entry.date, weight: entry.weight.toString() });
    };

    const handleSaveHistoryEdit = () => {
        if (!selectedPatient || editingHistoryIndex === null) return;

        const updatedHistory = [...selectedPatient.history];
        updatedHistory[editingHistoryIndex] = {
            date: historyEditData.date,
            weight: parseFloat(historyEditData.weight)
        };

        updatePatient(selectedPatient.id, { history: updatedHistory });
        setSelectedPatient({ ...selectedPatient, history: updatedHistory });
        setEditingHistoryIndex(null);
        setToastMessage('Historico atualizado!');
        setShowToast(true);
    };

    const handleDeleteHistory = (index: number) => {
        if (!selectedPatient) return;
        if (confirm('Excluir esta entrada do historico?')) {
            const updatedHistory = selectedPatient.history.filter((_: any, i: number) => i !== index);
            updatePatient(selectedPatient.id, { history: updatedHistory });
            setSelectedPatient({ ...selectedPatient, history: updatedHistory });
            setToastMessage('Entrada removida!');
            setShowToast(true);
        }
    };

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Pacientes</h1>
                    <p className="text-slate-500 mt-2">Gerencie seus pacientes e historicos.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if (confirm('Isso vai resetar todos os pacientes para os dados iniciais. Continuar?')) {
                                localStorage.removeItem('esfomiado_patients');
                                window.location.reload();
                            }
                        }}
                        className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                        Resetar Dados
                    </button>
                    <button
                        onClick={() => {
                            setEditingPatient(null);
                            setFormData({ name: '', age: '', weight: '', height: '', goal: 'Hipertrofia', restrictions: '' });
                            setShowForm(!showForm);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Novo Paciente
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">
                        {editingPatient ? 'Editar Paciente' : 'Cadastro de Paciente'}
                    </h2>
                    <form onSubmit={handleSavePatient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                            <input
                                placeholder="Ex: Joao Silva"
                                className="w-full p-3 border rounded-lg"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Idade (anos)</label>
                            <input
                                placeholder="Ex: 28"
                                type="number"
                                className="w-full p-3 border rounded-lg"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Peso (kg)</label>
                            <input
                                placeholder="Ex: 75.5"
                                type="number"
                                step="0.1"
                                className="w-full p-3 border rounded-lg"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Altura (cm)</label>
                            <input
                                placeholder="Ex: 175"
                                type="number"
                                className="w-full p-3 border rounded-lg"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Objetivo</label>
                            <select
                                className="w-full p-3 border rounded-lg"
                                value={formData.goal}
                                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                            >
                                <option>Hipertrofia</option>
                                <option>Emagrecimento</option>
                                <option>Manutencao</option>
                                <option>Ganho de Massa</option>
                                <option>Definicao Muscular</option>
                                <option>Saude Geral</option>
                                <option>Performance Esportiva</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Restricoes Alimentares</label>
                            <input
                                placeholder="Ex: Sem lactose, Vegano"
                                className="w-full p-3 border rounded-lg"
                                value={formData.restrictions}
                                onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingPatient(null);
                                    setFormData({ name: '', age: '', weight: '', height: '', goal: 'Hipertrofia', restrictions: '' });
                                }}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                {editingPatient ? 'Atualizar Paciente' : 'Salvar Paciente'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            placeholder="Buscar paciente..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="text-sm text-slate-500">{filteredPatients.length} pacientes</span>
                </div>

                <div className="divide-y divide-slate-100">
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                                    {patient.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">{patient.name}</h3>
                                    <p className="text-sm text-slate-500">{patient.age} anos - {patient.goal}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-sm text-slate-600">
                                    <span className="block text-xs text-slate-400">Peso</span>
                                    {patient.weight}kg
                                </div>
                                <div className="text-sm text-slate-600">
                                    <span className="block text-xs text-slate-400">Altura</span>
                                    {patient.height}cm
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditPatient(patient)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedPatient(patient)}
                                        className="text-green-600 hover:underline font-medium px-3"
                                    >
                                        Ver Detalhes
                                    </button>
                                    <button
                                        onClick={() => handleDeletePatient(patient.id, patient.name)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={selectedPatient !== null}
                onClose={() => setSelectedPatient(null)}
                title={`Detalhes de ${selectedPatient?.name}`}
            >
                {selectedPatient && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm text-slate-500">Idade</p>
                                <p className="text-2xl font-bold text-slate-800">{selectedPatient.age} anos</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm text-slate-500">Peso Atual</p>
                                <p className="text-2xl font-bold text-slate-800">{selectedPatient.weight} kg</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm text-slate-500">Altura</p>
                                <p className="text-2xl font-bold text-slate-800">{selectedPatient.height} cm</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm text-slate-500">IMC</p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {(selectedPatient.weight / ((selectedPatient.height / 100) ** 2)).toFixed(1)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 font-semibold mb-2">Objetivo</p>
                            <p className="text-lg text-slate-800">{selectedPatient.goal}</p>
                        </div>

                        {selectedPatient.restrictions && (
                            <div>
                                <p className="text-sm text-slate-500 font-semibold mb-2">Restricoes</p>
                                <p className="text-lg text-slate-800">{selectedPatient.restrictions}</p>
                            </div>
                        )}

                        <div>
                            <p className="text-sm text-slate-500 font-semibold mb-3">Historico de Peso</p>
                            <div className="space-y-2">
                                {selectedPatient.history.map((entry: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                        {editingHistoryIndex === i ? (
                                            <>
                                                <input
                                                    type="date"
                                                    value={historyEditData.date}
                                                    onChange={(e) => setHistoryEditData({ ...historyEditData, date: e.target.value })}
                                                    className="px-2 py-1 border rounded text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={historyEditData.weight}
                                                    onChange={(e) => setHistoryEditData({ ...historyEditData, weight: e.target.value })}
                                                    className="w-20 px-2 py-1 border rounded text-sm"
                                                />
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={handleSaveHistoryEdit}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                        title="Salvar"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingHistoryIndex(null)}
                                                        className="p-1 text-slate-600 hover:bg-slate-200 rounded"
                                                        title="Cancelar"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-slate-600">{entry.date}</span>
                                                <span className="font-bold text-slate-800">{entry.weight} kg</span>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => handleEditHistory(i, entry)}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteHistory(i)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
