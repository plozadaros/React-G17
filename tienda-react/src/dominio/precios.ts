// Reglas de precio de la tienda. Pura: recibe un número y devuelve un número. Cómo se MUESTRA
// (S/ 1,180.00) es asunto de ui/formato.ts; cuánto vale con impuesto es asunto del dominio.
export const IGV = 0.18;

export function conIGV (precio : number) : number {
    return precio * (1 + IGV);
}
