import type { Transaction } from "./wallet.types";
/**
 * Static wallet balance used to simulate the GET /wallet/balance response
 * during development. Matches the "45,25" shown in the wallet mockup.
 * Replace with the real API call once the endpoint is wired up.
 */

export const walletBalanceMock = 45.25;
/**
 * Static transaction history used to simulate the
 * GET /wallet/transactions response during development. Mirrors the four
 * entries shown in the wallet mockup, ordered most-recent first.
 * DEPOSIT = recarga, WITHDRAWAL = compra de passagem.
 * Replace with the real API call once the endpoint is wired up.
 */

export const walletTransactionsMock: Transaction[] = [
  {
    id: "a1f3c9e2-4b7d-4f2a-9c1e-3d5b8a0f6e21",
    type: "DEPOSIT",
    value: 40,
    createdAt: "2026-03-08T13:52:00-03:00",
  },
  {
    id: "b2e4d0f3-5c8e-4a3b-8d2f-4e6c9b1a7f32",
    type: "WITHDRAWAL",
    value: 7.95,
    createdAt: "2026-03-07T08:27:00-03:00",
  },
  {
    id: "c3f5e1a4-6d9f-4b4c-9e3a-5f7d0c2b8a43",
    type: "WITHDRAWAL",
    value: 6.8,
    createdAt: "2026-03-06T10:44:00-03:00",
  },
  {
    id: "d4a6f2b5-7e0a-4c5d-8f4b-6a8e1d3c9b54",
    type: "DEPOSIT",
    value: 20,
    createdAt: "2026-03-06T09:56:00-03:00",
  },
];