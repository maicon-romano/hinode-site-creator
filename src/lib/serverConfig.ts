
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
