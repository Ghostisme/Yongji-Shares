import { NextResponse } from 'next/server';
import { addToMockCart, getMockCartState } from '@/data/mock';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const state = getMockCartState();
  return NextResponse.json({ success: true, cartCount: state.count });
}

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const body = await request.json();
    const { productId, skuId, quantity } = body;

    if (!productId || !skuId || !quantity) {
      return NextResponse.json(
        { success: false, cartCount: 0, message: '缺少必要参数' },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { success: false, cartCount: 0, message: '数量不能小于 1' },
        { status: 400 }
      );
    }

    const result = addToMockCart(productId, skuId, quantity);

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, cartCount: 0, message: '请求格式错误' },
      { status: 400 }
    );
  }
}
