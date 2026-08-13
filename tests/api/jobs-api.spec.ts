import { test, expect } from '@playwright/test';

test.describe('jobs API', () => {
  // I keep the health check small so a failure points to availability rather
  // than mixing availability with filtering or response-contract behavior.
  test('@smoke health endpoint returns an operational status', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('remote filter excludes onsite positions and preserves the contract', async ({ request }) => {
    const response = await request.get('/api/jobs?remote=true');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.count).toBe(2);
    expect(body.jobs).toHaveLength(2);
    expect(body.jobs.every((job: { remote: boolean }) => job.remote)).toBe(true);
    expect(body.jobs[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      company: expect.any(String),
      skills: expect.any(Array)
    }));
  });

  test('unknown API routes return a structured 404 response', async ({ request }) => {
    const response = await request.get('/api/missing');
    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({ error: 'Not found' });
  });
});
