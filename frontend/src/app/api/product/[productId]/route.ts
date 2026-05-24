import { NextResponse } from 'next/server';
import { getMockProduct } from '@/data/mock';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;

  await new Promise((resolve) => setTimeout(resolve, 600));

  const product = getMockProduct(productId);

  if (!product) {
    return NextResponse.json(
      { success: false, data: null, message: '商品不存在' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: product });
}
