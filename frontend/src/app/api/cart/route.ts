import { NextResponse } from 'next/server';
import { addToMockCart, getMockCartState, getErrorMessage } from '@/data/mock';

function parseLocale(request: Request): 'zh' | 'en' {
  const lang = request.headers.get('Accept-Language') ?? '';
  return lang.startsWith('en') ? 'en' : 'zh';
}

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const state = getMockCartState();
  return NextResponse.json({ success: true, cartCount: state.count });
}

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const locale = parseLocale(request);

  try {
    const body = await request.json();
    const { productId, skuId, quantity } = body;

    if (!productId || !skuId || !quantity) {
      return NextResponse.json(
        { success: false, cartCount: 0, message: getErrorMessage('missingParams', locale) },
        { status: 400 },
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { success: false, cartCount: 0, message: getErrorMessage('invalidQuantity', locale) },
        { status: 400 },
      );
    }

    const result = addToMockCart(productId, skuId, quantity, locale);

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, cartCount: 0, message: getErrorMessage('badRequest', locale) },
      { status: 400 },
    );
  }
}
