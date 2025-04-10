export const typeDefs = `#graphql
  type Query {
    totalProducts: Int!
    recentSales: [RecentSale!]!
    lowStockItems: [LowStockItem!]!
    dashboardStats: DashboardStats!
    inventoryItems: [InventoryItem!]!
    topSellers: [TopSeller!]!
    lowStockProducts: [LowStockProduct!]!
    salesTrend: [SalesData!]!
    topCustomers: [TopCustomer!]!
  }

  type Mutation {
    updateStock(productId: String!, newStock: Int!): InventoryItem!
    createInventoryAdjustment(
      productId: String!
      cantidad: Int!
      tipo: String!
      motivo: String!
    ): InventoryAdjustment!
  }

  type InventoryAdjustment {
    id: String!
    fecha: String!
    producto: InventoryItem!
    cantidad: Int!
    tipo: String!
    motivo: String!
  }

  type DashboardStats {
    totalSales: Float!
    totalProducts: Int!
    activeSellers: Int!
    newCustomers: Int!
    salesGrowth: Float!
    productGrowth: Float!
  }

  type RecentSale {
    customer: String!
    product: String!
    status: String!
    total: Float!
  }

  type LowStockItem {
    name: String!
    currentStock: Int!
    minimumStock: Int!
    status: String!
  }

  type LowStockProduct {
    id: Int!
    nombre: String!
    stock: Int!
    stockMinimo: Int!
    marca: Marca!
    categoria: Categoria!
  }

  type SalesData {
    fecha: String!
    total: Float!
  }

  type TopCustomer {
    id: String!
    nombre: String!
    comprasMes: Int!
    valorTotal: Float!
    tendencia: String!
  }

  type InventoryItem {
    id: Int!
    sku: String!
    nombre: String!
    precio: Float!
    tipoProducto: String!
    unidadDeVenta: String!
    presentacion: String
    unidadMedida: String!
    contenido: Float
    stock: Int!
    imagen: String
    margenCommission: Float!
    ventasMes: Int!
    tendencia: String!
    marca: Marca!
    categoria: Categoria!
  }

  type TopSeller {
    id: Int!
    nombre: String!
    ventasMes: Float!
    comision: Float!
    tendencia: String!
  }

  type Marca {
    id: Int!
    nombre: String!
  }

  type Categoria {
    id: Int!
    nombre: String!
  }
`; 