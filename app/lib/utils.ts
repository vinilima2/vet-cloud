import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function horaAtual() {
  const agora = new Date();

  const dia = agora.getDate().toString().padStart(2, '0');
  const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
  const ano = agora.getFullYear();

  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

export function converterDataString(data: string): string {
  const date = new Date(data);
  const day = String(date.getDate() + 1).padStart(2, '0'); // erro no display de data corrigido
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const ANIMAIS = [
  { label: 'Cachorro', value: 'cachorro' },
  { label: 'Gato', value: 'gato' },
  { label: 'Hamster', value: 'hamster' },
]

export const CORES = [
  { label: 'Bege', value: 'bege' },
  { label: 'Branco', value: 'branco' },
  { label: 'Caramelo', value: 'caramelo' },
  { label: 'Cinza', value: 'cinza' },
  { label: 'Dourado', value: 'dourado' },
  { label: 'Laranja', value: 'laranja' },
  { label: 'Marrom', value: 'marrom' },
  { label: 'Mesclado', value: 'mesclado' },
  { label: 'Pardo', value: 'pardo' },
  { label: 'Preto', value: 'preto' },
  { label: 'Rajado', value: 'rajado' },
  { label: 'Vermelho', value: 'vermelho' }
]

export const RACA_CAES = [
  { label: 'Beagle', value: 'beagle' },
  { label: 'Border Collie', value: 'border collie' },
  { label: 'Bulldog Francês', value: 'bulldog francês' },
  { label: 'Chihuahua', value: 'chihuahua' },
  { label: 'Golden Retriever', value: 'golden retriever' },
  { label: 'Labrador', value: 'labrador' },
  { label: 'Poodle', value: 'poodle' },
  { label: 'Pug', value: 'pug' },
  { label: 'Shih Tzu', value: 'shih tzu' },
  { label: 'Yorkshire Terrier', value: 'yorkshire terrier' },
  { label: 'Vira Lata', value: 'vira lata' }
]

export const RACA_GATOS = [
  { label: 'Abissínio', value: 'abissínio' },
  { label: 'Angorá', value: 'angorá' },
  { label: 'Azul Russo', value: 'azul russo' },
  { label: 'Bengal', value: 'bengal' },
  { label: 'Himalaio', value: 'himalaio' },
  { label: 'Maine Coon', value: 'maine coon' },
  { label: 'Persa', value: 'persa' },
  { label: 'Ragdoll', value: 'ragdoll' },
  { label: 'Siamês', value: 'siamês' },
  { label: 'Sphynx', value: 'sphynx' }
];

export const RACA_HAMSTERS = [
  { label: 'Anão Russo', value: 'anão russo' },
  { label: 'Chinês', value: 'chinês' },
  { label: 'Roborovski', value: 'roborovski' },
  { label: 'Sírio Albino', value: 'sírio albino' },
  { label: 'Sírio Dourado', value: 'sírio dourado' },
  { label: 'Sírio Longo', value: 'sírio longo' },
  { label: 'Sírio Pardo', value: 'sírio pardo' },
  { label: 'Winter White', value: 'winter white' }
];