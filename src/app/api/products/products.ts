// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '@/lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
//   const products = await prisma.product.findMany({
//     orderBy: { createdAt: 'desc' },
//   });
//   res.status(200).json(products);
// }
