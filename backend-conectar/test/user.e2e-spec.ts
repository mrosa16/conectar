import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Criar e logar como admin
    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Admin Teste',
      email: 'admin@teste.com',
      password: 'admin123',
      role: 'admin',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@teste.com', password: 'admin123' });

    token = loginRes.body.token;
  });

  it('GET /user?role=admin retorna lista de admins', async () => {
    const res = await request(app.getHttpServer())
      .get('/user?role=admin')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((u) => expect(u.role).toBe('admin'));
  });

  it('PUT /user/:id atualiza como admin', async () => {
    const newUser = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'User Editável',
        email: 'editavel@teste.com',
        password: '123456',
      });

    userId = newUser.body.user.id;

    const res = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Novo Nome Admin', role: 'user' })
      .expect(200);

    expect(res.body.name).toBe('Novo Nome Admin');
  });

  it('DELETE /user/:id exclui como admin', async () => {
    await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
