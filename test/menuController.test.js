const request = require('supertest');
const app = require('../index')

describe('menuController', () => {
    
    //GET
    describe('GET /menu', () => {
    test('should get list of menu', async () => {
        const respone = await request(app).get('/menu');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('status', true);
    })
    })
})

    //POST
    describe('POST /menu', () => {
        test('should insert new menu', async () => {
            const response = await request(app)
            .post('/menu')
            .query({
                nama: 'Rendang',
                deskripsi: "Rendang adalah masakan Minangkabau berbahan daging sapi, dimasak lama dengan santan dan rempah, terkenal lezat di dunia",
                harga: '18000',
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', true);
        })
    })

    //PUT
    describe('Update Endpoint', () => {
        let insertId;

        //tambah data menu ke database untuk diubah
        beforeAll(async () => {
            const insertQuery = `INSERT INTO tbl_menu (nama, deskripsi, harga) VALUES ('Ayam bakar', 'Ayam bakar adalah hidangan khas Indonesia berupa ayam panggang yang dimarinasi dengan bumbu khas, menghasilkan rasa gurih dan lezat', 17000)`;
            const insertResult = await new Promise((resolve) => {
                conn.query(insertQuery, (err, result) => {
                    if(err) {
                        console.error('Insert error', err);
                    }
                    resolve(result);
                })
            })

            insertId = insertResult.insertId;
        })

        //hapus data siswa yang telah diubah
        afterAll(async () => {
            const deleteQuery = `DELETE FROM tb;_menu WHERE id = ${insertId}`;
            await new Promise((resolve) => {
                conn.query(deleteQuery, () => {
                    resolve();
                })
            })
            //conn.end(); // Tutup koneksi database setelah semua pengujian selesai
        })

        //pengujian untuk updateMenu
        it('should update a menu', async () => {
            const updateData = {
                nama: 'Ayam Goreng',
                deskripsi: 'Ayam goreng adalah hidangan populer Indonesia, ayam digoreng hingga renyah setelah dimarinasi dengan bumbu rempah khas',
                harga: '17000',
            };

            const response = await resuest(app)
            .put(`/menu${insertId}`)
            .send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', true);
            expect(response.body).toHaveProperty('msg', 'Succesfull Updated');

            //mengecek apakah data telah diubah di database
            const selectQuery = `SELECT * FROM tbl_menu WHERE id = ${insertId}`;
            const selectResult = await new Promise((resolve) => {
                conn.query(selectQuery, (err, result) => {
                    resolve(result);
                })
            })

            expect(selectResult.length).toBe(1);
            expect(Array.isArray(selectResult)).toBe(true);
            expect(selectResult.length).toBeGreaterThan(0);
            expect(selectResult[0].nama == updateData.nama);
            expect(selectResult[0].deskripsi == updateData.deskripsi);
            expect(selectResult[0].harga == updateData.harga);
        })
    })

    // DELETE
    describe('menuController - Delete', () => {
        let insertId;

        // sebelum pengujian, tambahkan data siswa ke database untuk dihapus
        beforeAll(async () => {
            const insertQuery = `INSERT INTO tbl_menu (nama, deskripsi, harga) VALUES ('Tes', 'tess', 20000)`;
            const insertResult = await new Promise((resolve) => {
                conn.query(insertQuery, (err, result) => {
                    if(err) {
                        console.error('Insert Error:', err);
                    }
                    insertId = result.insertId;
                    resolve();
                })
            })
        })

        //Pengujian untuk deleteMenu
        it('should delete a menu', async () => {
            const response = await request(app).delete(`/menu${insertId}`);

            //periksa respone body sesuai dengan response yang diharapkan
            if(response.body.status) {
                expect(response.body).toHaveProperty('status', true);
                expect(response.body).toHaveProperty('msg', 'Delete Succesfull')
            } else {
                expect(response.body).toHaveProperty('status', false);
                expect(response.body).toHaveProperty('msg', 'Delete Failed');
            }
            const selectQuery = `SELECT * FROM tbl_menu WHERE id = ${insertId}`;
            const selectResult = await new Promise((resolve) => {
                conn.query(selectQuery, (err,result) => {
                    resolve(result);
                })
            })
            expect(selectResult.length).toBe(0);
        })
        afterAll(() => {
            conn.end();
        })
    })