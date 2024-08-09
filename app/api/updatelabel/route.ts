import { NextResponse } from 'next/server';
import { updateUserLabels } from '@/lib/sdk'; // Justera sökvägen till din sdk-fil om det behövs

export async function POST(request: Request) {
    const { userId, labels } = await request.json();

    try {
        await updateUserLabels(userId, labels);
        return NextResponse.json({ message: 'Labels updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Failed to update labels:', error);
        return NextResponse.json({ message: 'Failed to update labels' }, { status: 500 });
    }
}
