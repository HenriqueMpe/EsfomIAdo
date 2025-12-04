'use client';

import { useState, useEffect } from 'react';

export interface Patient {
    id: number;
    name: string;
    age: number;
    weight: number;
    height: number;
    goal: string;
    restrictions?: string;
    history: { date: string; weight: number }[];
    createdAt: string;
}

const STORAGE_KEY = 'esfomiado_patients';

export function usePatients() {
    const [patients, setPatients] = useState<Patient[]>([]);

    // Load patients from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setPatients(JSON.parse(stored));
        } else {
            // Initialize with mock data if empty
            const initialPatients: Patient[] = [
                {
                    id: 1,
                    name: 'Joao Silva',
                    age: 28,
                    weight: 75,
                    height: 175,
                    goal: 'Hipertrofia',
                    history: [
                        { date: '2024-03-01', weight: 78 },
                        { date: '2024-04-01', weight: 77.5 },
                        { date: '2024-05-01', weight: 77 },
                        { date: '2024-06-01', weight: 76.5 },
                        { date: '2024-07-01', weight: 76 },
                        { date: '2024-08-01', weight: 75.8 },
                        { date: '2024-09-01', weight: 75.5 },
                        { date: '2024-10-01', weight: 75.2 },
                        { date: '2024-11-01', weight: 75 }
                    ],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Maria Oliveira',
                    age: 32,
                    weight: 65,
                    height: 165,
                    goal: 'Emagrecimento',
                    history: [
                        { date: '2024-01-01', weight: 75 },
                        { date: '2024-02-01', weight: 73.5 },
                        { date: '2024-03-01', weight: 72 },
                        { date: '2024-04-01', weight: 71 },
                        { date: '2024-05-01', weight: 70 },
                        { date: '2024-06-01', weight: 69 },
                        { date: '2024-07-01', weight: 68 },
                        { date: '2024-08-01', weight: 67 },
                        { date: '2024-09-01', weight: 66.5 },
                        { date: '2024-10-01', weight: 66 },
                        { date: '2024-11-01', weight: 65.5 },
                        { date: '2024-12-01', weight: 65 }
                    ],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'Carlos Pereira',
                    age: 45,
                    weight: 82,
                    height: 180,
                    goal: 'Manutencao',
                    history: [
                        { date: '2024-06-01', weight: 82.5 },
                        { date: '2024-07-01', weight: 82.3 },
                        { date: '2024-08-01', weight: 82 },
                        { date: '2024-09-01', weight: 82.2 },
                        { date: '2024-10-01', weight: 82 },
                        { date: '2024-11-01', weight: 82 }
                    ],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    name: 'Ana Santos',
                    age: 26,
                    weight: 58,
                    height: 160,
                    goal: 'Ganho de Massa',
                    history: [
                        { date: '2024-02-01', weight: 52 },
                        { date: '2024-03-01', weight: 53 },
                        { date: '2024-04-01', weight: 53.5 },
                        { date: '2024-05-01', weight: 54 },
                        { date: '2024-06-01', weight: 54.8 },
                        { date: '2024-07-01', weight: 55.5 },
                        { date: '2024-08-01', weight: 56 },
                        { date: '2024-09-01', weight: 56.5 },
                        { date: '2024-10-01', weight: 57 },
                        { date: '2024-11-01', weight: 57.5 },
                        { date: '2024-12-01', weight: 58 }
                    ],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    name: 'Pedro Costa',
                    age: 35,
                    weight: 88,
                    height: 178,
                    goal: 'Definicao Muscular',
                    history: [
                        { date: '2024-04-01', weight: 95 },
                        { date: '2024-05-01', weight: 93.5 },
                        { date: '2024-06-01', weight: 92 },
                        { date: '2024-07-01', weight: 91 },
                        { date: '2024-08-01', weight: 90 },
                        { date: '2024-09-01', weight: 89.5 },
                        { date: '2024-10-01', weight: 89 },
                        { date: '2024-11-01', weight: 88.5 },
                        { date: '2024-12-01', weight: 88 }
                    ],
                    createdAt: new Date().toISOString()
                }
            ];
            setPatients(initialPatients);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPatients));
        }
    }, []);

    const addPatient = (patient: Omit<Patient, 'id' | 'createdAt'>) => {
        const newPatient: Patient = {
            ...patient,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        const updated = [...patients, newPatient];
        setPatients(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return newPatient;
    };

    const updatePatient = (id: number, updates: Partial<Patient>) => {
        const updated = patients.map(p => {
            if (p.id === id) {
                // If weight changed, add to history
                if (updates.weight && updates.weight !== p.weight) {
                    const newHistory = [
                        ...p.history,
                        { date: new Date().toISOString().split('T')[0], weight: updates.weight }
                    ];
                    return { ...p, ...updates, history: newHistory };
                }
                return { ...p, ...updates };
            }
            return p;
        });
        setPatients(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deletePatient = (id: number) => {
        const updated = patients.filter(p => p.id !== id);
        setPatients(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const getPatient = (id: number) => {
        return patients.find(p => p.id === id);
    };

    return {
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        getPatient
    };
}
