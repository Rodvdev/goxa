import { PrismaClient } from '@prisma/client';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    totalProducts: async () => {
      return await prisma.producto.count();
    },

    dashboardStats: async () => {
      const currentMonth = new Date();
      const lastMonth = subMonths(currentMonth, 1);

      // Obtener ventas del mes actual
      const currentMonthSales = await prisma.venta.findMany({
        where: {
          fecha: {
            gte: startOfMonth(currentMonth),
            lte: endOfMonth(currentMonth),
          },
        },
      });

      // Obtener ventas del mes anterior
      const lastMonthSales = await prisma.venta.findMany({
        where: {
          fecha: {
            gte: startOfMonth(lastMonth),
            lte: endOfMonth(lastMonth),
          },
        },
      });

      const totalCurrentSales = currentMonthSales.reduce((sum, sale) => sum + sale.precioTotal, 0);
      const totalLastSales = lastMonthSales.reduce((sum, sale) => sum + sale.precioTotal, 0);
      const salesGrowth = ((totalCurrentSales - totalLastSales) / totalLastSales) * 100;

      const totalProducts = await prisma.producto.count();
      const activeSellers = await prisma.vendedor.count();
      const newCustomers = await prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth(currentMonth),
          },
        },
      });

      return {
        totalSales: totalCurrentSales,
        totalProducts,
        activeSellers,
        newCustomers,
        salesGrowth,
        productGrowth: 5.0, // Este valor debería calcularse basado en datos reales
      };
    },

    inventoryItems: async () => {
      const products = await prisma.producto.findMany({
        include: {
          marca: true,
          categoria: true,
        },
      });

      return products.map(product => ({
        ...product,
        ventasMes: 0, // Este valor debería calcularse basado en ventas del mes
        tendencia: 'STABLE', // Este valor debería calcularse basado en tendencias
      }));
    },

    topSellers: async () => {
      const currentMonth = new Date();
      const sellers = await prisma.vendedor.findMany({
        include: {
          ventas: {
            where: {
              fecha: {
                gte: startOfMonth(currentMonth),
                lte: endOfMonth(currentMonth),
              },
            },
          },
        },
      });

      return sellers.map(seller => ({
        id: seller.id,
        nombre: seller.nombre,
        ventasMes: seller.ventas.reduce((sum, sale) => sum + sale.precioTotal, 0),
        comision: seller.ventas.reduce((sum, sale) => sum + sale.comision, 0),
        tendencia: 'UP', // Este valor debería calcularse basado en tendencias
      })).sort((a, b) => b.ventasMes - a.ventasMes);
    },

    lowStockProducts: async () => {
      const products = await prisma.producto.findMany({
        where: {
          stock: {
            lt: 10, // Ajustar según el stock mínimo deseado
          },
        },
        include: {
          marca: true,
          categoria: true,
        },
      });

      return products;
    },

    salesTrend: async () => {
      const currentMonth = new Date();
      const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate();

      const salesData = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        );
        
        const sales = await prisma.venta.findMany({
          where: {
            fecha: {
              gte: date,
              lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        });

        salesData.push({
          fecha: `${day}/${currentMonth.getMonth() + 1}`,
          total: sales.reduce((sum, sale) => sum + sale.precioTotal, 0),
        });
      }

      return salesData;
    },

    topCustomers: async () => {
      const customers = await prisma.user.findMany({
        where: {
          role: 'USER',
        },
      });

      return customers.map(customer => ({
        id: customer.id,
        nombre: customer.name || 'Cliente Anónimo',
        comprasMes: 0, // TODO: Implementar lógica real de compras
        valorTotal: 0,
        tendencia: 'STABLE',
      })).sort((a, b) => b.comprasMes - a.comprasMes);
    },

    recentSales: async () => {
      const sales = await prisma.venta.findMany({
        take: 5,
        orderBy: {
          fecha: 'desc',
        },
        include: {
          producto: true,
          vendedor: true,
        },
      });

      return sales.map(sale => ({
        customer: sale.vendedor.nombre,
        product: sale.producto?.nombre || 'Pack',
        status: 'COMPLETADA',
        total: sale.precioTotal,
      }));
    },

    lowStockItems: async () => {
      const products = await prisma.producto.findMany({
        where: {
          stock: {
            lt: 10, // Ajustar según el stock mínimo deseado
          },
        },
        include: {
          marca: true,
          categoria: true,
        },
      });

      return products.map(product => ({
        name: product.nombre,
        currentStock: product.stock,
        minimumStock: 10, // Este valor debería venir de la configuración
        status: product.stock < 5 ? 'Crítico' : 'Bajo',
      }));
    },
  },

  Mutation: {
    updateStock: async (_: unknown, { productId, newStock }: { productId: string, newStock: number }) => {
      const product = await prisma.producto.update({
        where: { id: parseInt(productId) },
        data: { stock: newStock },
        include: {
          marca: true,
          categoria: true,
        },
      });

      return {
        ...product,
        ventasMes: 0,
        tendencia: 'STABLE',
      };
    },

    createInventoryAdjustment: async (_: unknown, { productId, cantidad, tipo, motivo }: { 
      productId: string, 
      cantidad: number, 
      tipo: 'INGRESO' | 'EGRESO' | 'AJUSTE', 
      motivo: string 
    }) => {
      const product = await prisma.producto.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      const newStock = tipo === 'INGRESO' 
        ? product.stock + cantidad 
        : product.stock - cantidad;

      await prisma.producto.update({
        where: { id: parseInt(productId) },
        data: { stock: newStock },
      });

      return {
        id: Date.now().toString(),
        fecha: new Date().toISOString(),
        producto: {
          ...product,
          ventasMes: 0,
          tendencia: 'STABLE',
        },
        cantidad,
        tipo,
        motivo,
      };
    },
  },
}; 