import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let userId: string;

  it('POST /auth/register cria um novo usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Novo Usuário',
        email: 'novo@teste.com',
        password: 'senha123',
      })
      .expect(201);

    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('email', 'novo@teste.com');

    userId = res.body.user.id;
  });

  it('POST /auth/login retorna um token JWT', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'novo@teste.com',
        password: 'senha123',
      })
      .expect(201);

    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
    expect(res.body.user).toHaveProperty('email', 'novo@teste.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
