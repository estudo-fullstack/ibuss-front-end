/**
 * Represents a single bus line shown on the "Próximas partidas" screen.
 * Maps the fields documented in "Estrutura de dados exibidos nas telas":
 *   linha   -> line
 *   horario -> departureTime
 *   valor   -> price
 */
export interface Bus {
  id: number;
  line: string; 
  departureTime: string; 
  price: number; 
}