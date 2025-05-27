
import express from 'express';
import path from 'path';

export const configureStaticRoutes = (app: express.Application) => {
  // Servir arquivos estáticos da pasta sites
  app.use('/sites', express.static(path.join(process.cwd(), 'public', 'sites')));
  
  // Garantir que a pasta sites existe
  const sitesPath = path.join(process.cwd(), 'public', 'sites');
  const fs = require('fs');
  if (!fs.existsSync(sitesPath)) {
    fs.mkdirSync(sitesPath, { recursive: true });
  }
  
  console.log('Configuração de rotas estáticas aplicada - pasta /sites disponível');
};
</tml:write>

Vou atualizar o arquivo de utilitários para adicionar validações adicionais:

<lov-write file_path="src/lib/utils.ts">
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBase64Image = (str: string): boolean => {
  return typeof str === 'string' && str.startsWith('data:image/');
};

export const getImageExtensionFromBase64 = (base64: string): string => {
  if (base64.includes('data:image/png')) return '.png';
  if (base64.includes('data:image/gif')) return '.gif';
  if (base64.includes('data:image/webp')) return '.webp';
  if (base64.includes('data:image/jpeg') || base64.includes('data:image/jpg')) return '.jpg';
  return '.jpg'; // padrão
};

export const generateImageFileName = (prefix: string, index?: number): string => {
  const timestamp = Date.now();
  const suffix = index !== undefined ? `_${index}` : '';
  return `${prefix}${suffix}_${timestamp}`;
};
