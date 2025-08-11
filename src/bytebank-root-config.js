import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

// Importa o layout do microfrontend
import microfrontendLayout from "./microfrontend-layout.html";

// Cria as rotas a partir do HTML de layout
const routes = constructRoutes(microfrontendLayout);

// Cria as aplicações com base nas rotas
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    // Carrega usando SystemJS (ignora webpack)
    return System.import(name);
  },
});

// Cria o gerenciador de layout
const layoutEngine = constructLayoutEngine({ routes, applications });

// Registra todas as aplicações
applications.forEach(registerApplication);

// Ativa o layout engine
layoutEngine.activate();

// Inicia o single-spa
start();