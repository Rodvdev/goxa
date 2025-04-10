import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    dashboardStats: DashboardStats!
    inventoryItems: [InventoryItem!]!
    topSellers: [TopSeller!]!
    lowStockProducts: [LowStockProduct!]!
    salesTrend: [SalesData!]!
    topCustomers: [TopCustomer!]!
  }

  type DashboardStats {
    totalSales: Float!
    totalProducts: Int!
    activeSellers: Int!
    newCustomers: Int!
    salesGrowth: Float!
    productGrowth: Float!
  }

  type InventoryItem {
    id: ID!
    nombre: String!
    stock: Int!
    stockMinimo: Int!
    precio: Float!
    ventasMes: Int!
    tendencia: Tendencia!
    marca: Marca!
    categoria: Categoria!
  }

  type TopSeller {
    id: ID!
    nombre: String!
    ventasMes: Float!
    comision: Float!
    tendencia: Tendencia!
  }

  type LowStockProduct {
    id: ID!
    nombre: String!
    stock: Int!
    stockMinimo: Int!
    precio: Float!
    marca: Marca!
    categoria: Categoria!
  }

  type SalesData {
    fecha: String!
    total: Float!
  }

  type TopCustomer {
    id: ID!
    nombre: String!
    comprasMes: Int!
    valorTotal: Float!
    tendencia: Tendencia!
  }

  type Marca {
    id: ID!
    nombre: String!
  }

  type Categoria {
    id: ID!
    nombre: String!
  }

  enum Tendencia {
    UP
    DOWN
    STABLE
  }

  type Mutation {
    updateStock(productId: ID!, newStock: Int!): InventoryItem!
    createInventoryAdjustment(
      productId: ID!
      cantidad: Int!
      tipo: AdjustmentType!
      motivo: String!
    ): InventoryAdjustment!
  }

  type InventoryAdjustment {
    id: ID!
    fecha: String!
    producto: InventoryItem!
    cantidad: Int!
    tipo: AdjustmentType!
    motivo: String!
  }

  enum AdjustmentType {
    INGRESO
    EGRESO
    AJUSTE
  }
`; 