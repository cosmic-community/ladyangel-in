import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getAll<T>(type: string, depth = 1): Promise<T[]> {
  try {
    const response = await cosmic.objects
      .find({ type })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(depth);
    return response.objects as T[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw error;
  }
}

export async function getOne<T>(type: string, slug: string, depth = 1): Promise<T | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type, slug })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(depth);
    return response.object as T;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw error;
  }
}

export async function getByRelation<T>(type: string, field: string, id: string, depth = 1): Promise<T[]> {
  try {
    const response = await cosmic.objects
      .find({ type, [`metadata.${field}`]: id })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(depth);
    return response.objects as T[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw error;
  }
}