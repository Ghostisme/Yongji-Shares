import { NextResponse } from 'next/server';
import { getMockProduct, getErrorMessage } from '@/data/mock';

function parseLocale(request: Request): 'zh' | 'en' {
  const lang = request.headers.get('Accept-Language') ?? '';
  return lang.startsWith('en') ? 'en' : 'zh';
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  const locale = parseLocale(request);

  await new Promise((resolve) => setTimeout(resolve, 600));

  const product = getMockProduct(productId, locale);

  if (!product) {
    return NextResponse.json(
      { success: false, data: null, message: getErrorMessage('productNotFound', locale) },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: product });
}
