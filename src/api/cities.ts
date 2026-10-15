/**
 * Lista fixa de cidades usada nos selects da tela "Compre sua passagem".
 * Reflete as rotas cadastradas no banco (tabela Route).
 * Provisório: substituir por um endpoint do back-end que liste as cidades
 * disponíveis, para a lista se atualizar sozinha quando novas rotas forem criadas.
 */
export const ORIGIN_CITIES = [
  "São Paulo - Barra Funda",
  "São Paulo - Jabaquara",
  "São Paulo - Sacomã",
];

export const DESTINATION_CITIES = ["Diadema", "Santos", "São Bernardo do Campo"];
